"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destinations to Visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p
              className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, cafés & museums",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2608&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Skylines, Central Park & Broadway nights",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: <DummyContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Neon streets, shrines & cherry blossoms",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Walk through history – Colosseum, piazzas & gelato",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: <DummyContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury escapes – Skylines, desert safaris & malls",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: <DummyContent />,
  },
  {
    category: "Agra, India",
    title: "Marvel at the Taj Mahal – Sunrise views & Mughal heritage",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: <DummyContent />,
  },
  {
    category: "Bali, Indonesia",
    title: "Tropical escape – Rice terraces, beaches & serene temples",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1470&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "London, UK",
    title: "Classic & modern – Landmarks, markets & river walks",
    src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1470&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Istanbul, Turkey",
    title: "East meets West – Old bazaars, mosques & Bosphorus views",
    src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1470&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Bangkok, Thailand",
    title: "Street life – Markets, temples & night food stalls",
    src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1470&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Swiss Alps, Switzerland",
    title: "Alpine escapes – Snowy peaks, lakes & scenic trails",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop",
    content: <DummyContent />,
  },
];



