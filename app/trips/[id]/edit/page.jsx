'use client';

import { useState, useEffect } from 'react';
import { MapPin, Users, Calendar, Wallet, Search, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import Link from 'next/link';

export default function EditTripPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    travelers: '',
    budget: '',
    days: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData(res.data.tripDetails);
      } catch (err) {
        console.error("Error fetching trip for edit:", err);
        setError("Failed to load trip details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${id}`,
        { tripDetails: formData }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Trip updated successfully!');
      router.push('/trips');
      
    } catch (err) {
      console.error("Update Trip Error:", err);
      alert("Failed to update trip.");
    } finally {
      setUpdating(false);
    }
  };

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
             <main className="flex-grow container mx-auto px-4 py-8 pt-24 text-center">
                 <p className="text-red-600">{error}</p>
                 <Link href="/trips" className="text-blue-600 mt-4 inline-block">Back to Trips</Link>
             </main>
        </div>
     );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 pt-24">
             <div className="max-w-3xl mx-auto">
                 <Link href="/trips" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Cancel Edit
                 </Link>

                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
                     <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Edit Trip</h2>
                     
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                            From (Source)
                          </label>
                          <input
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                            placeholder="e.g. New York, London"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-red-500" />
                            To (Destination)
                          </label>
                          <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                            placeholder="e.g. Paris, Tokyo, Bali"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                              <Users className="h-4 w-4 mr-2 text-green-500" />
                              Travelers
                            </label>
                            <input
                              type="number"
                              name="travelers"
                              value={formData.travelers}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                              placeholder="e.g. 2"
                              min="1"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                              <Wallet className="h-4 w-4 mr-2 text-purple-500" />
                              Budget
                            </label>
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                              required
                            >
                              <option value="" disabled>Select</option>
                              <option value="Cheap">Cheap</option>
                              <option value="Moderate">Moderate</option>
                              <option value="Luxury">Luxury</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                              Days
                            </label>
                            <input
                              type="number"
                              name="days"
                              value={formData.days}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 hover:bg-white"
                              placeholder="e.g. 5"
                              min="1"
                              required
                            />
                          </div>
                        </div>

                        <div className="pt-6 border-t flex justify-end space-x-4">
                           <button
                             type="button"
                             onClick={() => router.push('/trips')}
                             className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                           >
                             Cancel
                           </button>
                           <button
                              type="submit"
                              disabled={updating}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              {updating ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                     </form>
                 </div>
             </div>
          </main>
          <Footer />
      </div>
    </ProtectedRoute>
  );
}
