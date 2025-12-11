'use client';

import { useState } from 'react';
import { MapPin, Users, Calendar, Wallet, Search, Plane } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateTripForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    travelers: '',
    budget: '',
    days: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to create a trip.");
        router.push('/login');
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trips/create`,
        { tripDetails: formData }, // Backend expects { tripDetails: { ... } }
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("✅ Trip Created:", res.data);
      alert('Trip created successfully!');
      // Optionally redirect or clear form
      setFormData({ source: '', destination: '', travelers: '', budget: '', days: '' });
      
    } catch (err) {
      console.error("❌ Create Trip Error:", err);
      alert(err.response?.data?.message || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
      <div className="flex items-center justify-center mb-8 space-x-3">
        <div className="p-3 bg-blue-50 rounded-full">
            <Plane className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 text-center">
            Plan Your Next Adventure
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Source */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">From</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
                placeholder="New York, USA"
                required
              />
            </div>
          </div>

          {/* Destination */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">To</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
                placeholder="Paris, France"
                required
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Travelers</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                min="1"
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
                placeholder="2 People"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Budget ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Wallet className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="100"
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
                placeholder="5000"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div className="relative group md:col-span-2 lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Duration (Days)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                min="1"
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
                placeholder="7 Days"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/30 transform transition hover:scale-[1.01] active:scale-[0.99] duration-200 flex items-center justify-center space-x-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Generating...</span>
            ) : (
              <>
                <Search className="h-6 w-6" />
                <span>Generate Custom Itinerary</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
