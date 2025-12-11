'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { MapPin, Calendar, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search, Sort, Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortBy, setSortBy] = useState('Newest');

  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/trips`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to load your trips. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (e, tripId) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this trip?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrips(trips.filter(t => t.id !== tripId));
    } catch (err) {
      console.error("Error deleting trip:", err);
      alert("Failed to delete trip.");
    }
  };

  // Filter and Sort Logic
  const filteredTrips = trips.filter(trip => {
    const matchesSearch = 
      trip.tripDetails?.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.tripDetails?.source?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const tripBudget = parseFloat(trip.tripDetails?.budget) || 0;
    const matchesBudget = !maxBudget || tripBudget <= parseFloat(maxBudget);

    return matchesSearch && matchesBudget;
  }).sort((a, b) => {
    if (sortBy === 'Newest') return b.id - a.id; 
    if (sortBy === 'Oldest') return a.id - b.id;
    if (sortBy === 'Shortest') return (parseInt(a.tripDetails?.days) || 0) - (parseInt(b.tripDetails?.days) || 0);
    if (sortBy === 'Longest') return (parseInt(b.tripDetails?.days) || 0) - (parseInt(a.tripDetails?.days) || 0);
    return 0;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 pt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               {/* Search */}
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Search trips..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
                 />
               </div>

               {/* Filter Budget */}
               <div className="relative">
                  <input
                    type="number"
                    placeholder="Max Budget ($)"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-40"
                  />
               </div>

               {/* Sort By */}
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white cursor-pointer"
               >
                 <option value="Newest">Newest First</option>
                 <option value="Oldest">Oldest First</option>
                 <option value="Shortest">Shortest Trip</option>
                 <option value="Longest">Longest Trip</option>
               </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {searchTerm || maxBudget ? 'No trips match your filters' : 'No trips yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                 {searchTerm || maxBudget ? 'Try adjusting your search or filters.' : 'Start planning your next adventure!'}
              </p>
              <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                Create a Trip
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="group relative block bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                  <Link href={`/trips/${trip.id}`} className="block h-full">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {/* Placeholder for trip image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <h3 className="text-white text-xl font-bold truncate">{trip.tripDetails?.destination || "Unknown Destination"}</h3>
                      </div>
                      
                       <div className="absolute top-2 right-2 flex space-x-2">
                         <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              router.push(`/trips/${trip.id}/edit`);
                            }}
                            className="bg-white/90 p-2 rounded-full text-blue-600 hover:text-blue-800 hover:bg-white transition"
                            title="Edit Trip"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, trip.id)}
                            className="bg-white/90 p-2 rounded-full text-red-600 hover:text-red-800 hover:bg-white transition"
                            title="Delete Trip"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                       </div>
                    </div>
                    <div className="p-5 flex-grow">
                      <div className="flex items-center text-gray-500 mb-2">
                         <MapPin className="h-4 w-4 mr-1" />
                         <span className="text-sm">From: {trip.tripDetails?.source || "Unknown"}</span>
                      </div>
                       <div className="flex items-center text-gray-500 mb-4">
                         <Calendar className="h-4 w-4 mr-1" />
                         <span className="text-sm">{trip.tripDetails?.days} Days</span>
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-blue-600 font-medium group-hover:text-blue-700">
                        View Details
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
