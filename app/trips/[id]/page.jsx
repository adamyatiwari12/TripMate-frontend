'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { MapPin, Calendar, Wallet, Users, ArrowLeft } from 'lucide-react';

export default function TripDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrip(res.data);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        if (err.response && err.response.status === 403) {
           setError("You are not authorized to view this trip.");
        } else if (err.response && err.response.status === 404) {
           setError("Trip not found.");
        } else {
           setError("Failed to load trip details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
           </div>
           <Link href="/trips" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
             &larr; Back to My Trips
           </Link>
        </main>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Hero / Header Section */}
          <div className="bg-gray-900 text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
               <Link href="/trips" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition py-2 px-3 -ml-3 rounded-lg hover:bg-gray-800">
                 <ArrowLeft className="h-4 w-4 mr-2" />
                 Back to My Trips
               </Link>
               <h1 className="text-4xl font-bold mb-4">{trip.tripDetails?.destination}</h1>
               <div className="flex flex-wrap gap-6 text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                    From: {trip.tripDetails?.source}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                    {trip.tripDetails?.days} Days
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-400" />
                    {trip.tripDetails?.travelers} Travelers
                  </div>
                   <div className="flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-blue-400" />
                    {trip.tripDetails?.budget}
                  </div>
               </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            {/* Itinerary Section will go here */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="block text-sm text-gray-500 font-medium uppercase tracking-wide">Destination</span>
                    <span className="text-lg font-semibold text-gray-900">{trip.tripDetails?.destination}</span>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="block text-sm text-gray-500 font-medium uppercase tracking-wide">Starting Point</span>
                    <span className="text-lg font-semibold text-gray-900">{trip.tripDetails?.source}</span>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="block text-sm text-gray-500 font-medium uppercase tracking-wide">Duration</span>
                    <span className="text-lg font-semibold text-gray-900">{trip.tripDetails?.days} Days</span>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="block text-sm text-gray-500 font-medium uppercase tracking-wide">Travelers</span>
                    <span className="text-lg font-semibold text-gray-900">{trip.tripDetails?.travelers} Person(s)</span>
                 </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="block text-sm text-gray-500 font-medium uppercase tracking-wide">Budget</span>
                    <span className="text-lg font-semibold text-gray-900">{trip.tripDetails?.budget}</span>
                 </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
