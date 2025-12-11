"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import EmptyBox from "./EmptyBox";
import FinalUi from "./FinalUi";
import GroupSize from "./GroupSize";
import Budget from "./Budget";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetails, setTripDetails] = useState({});

  const onSend = useCallback(async () => {
    if (!userInput.trim()) return;

    setUserInput("");
    setLoading(true);

    const newMsg = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newMsg]);

    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        "http://localhost:5001/api/ai",
        {
          messages: [...messages, newMsg],
          isFinal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send JWT
          },
        }
      );
      console.log("🤖 AI Response:", result.data);

      if (!isFinal) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: result?.data?.resp,
            ui: result?.data?.ui,
          },
        ]);
      } else {
        setTripDetails(result?.data?.trip_plan);
      }
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setLoading(false);
    }
  }, [userInput, messages, isFinal]);

  const handleInputChange = useCallback(
    (e) => setUserInput(e.target.value),
    []
  );

  const RenderGenerativeUi = useCallback(
    (ui) => {
      switch (ui) {
        case "budget":
          return (
            <Budget
              onSelectedOption={(v) => {
                setUserInput(v);
                onSend();
              }}
            />
          );
        case "groupSize":
          return (
            <GroupSize
              onSelectedOption={(v) => {
                setUserInput(v);
                onSend();
              }}
            />
          );
        case "Final":
          return (
            <FinalUi viewTrip={() => console.log()} disable={!tripDetails} />
          );
        default:
          return null;
      }
    },
    [tripDetails, onSend]
  );

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "final") {
      setIsFinal(true);
      setUserInput("Ok, Great");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput) onSend();
  }, [isFinal, userInput, onSend]);

  const renderedMessages = useMemo(
    () =>
      messages.map((msg, index) => (
        <div
          key={index}
          className={`flex mt-2 ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-lg px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "bg-primary text-white"
                : "bg-gray-600 text-white"
            }`}
          >
            {msg.content}
            {msg.role !== "user" && RenderGenerativeUi(msg.ui ?? "")}
          </div>
        </div>
      )),
    [messages, RenderGenerativeUi]
  );

  return (
    <div className="h-[85vh] flex flex-col">
      {messages.length === 0 && (
        <EmptyBox
          onSelectOption={(value) => {
            setUserInput(value);
            onSend();
          }}
        />
      )}

      <section className="flex-1 overflow-y-auto p-4">
        {renderedMessages}
        {loading && (
          <div className="flex justify-start mt-2 ">
            <div className="max-w-lg px-4 py-2 bg-gray-600 text-white rounded-lg">
              <Loader className="animate-spin h-5 w-5" />
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus:visible:ring-0 shadow-none resize-none"
            value={userInput}
            onChange={handleInputChange}
          />
          <Button
            size="icon"
            className="absolute bottom-6 right-6"
            onClick={onSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Chatbox;
