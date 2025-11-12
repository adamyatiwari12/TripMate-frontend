'use client';

import { Plane, Calendar, Wallet, Map, Users, Sparkles, BarChart4, Check } from 'lucide-react';

export default function FeaturesHighlight() {
  const features = [
    {
      icon: <Plane className="h-12 w-12 text-blue-600" />,
      title: "AI Trip Suggestions",
      description: "Get AI-generated itineraries with attractions, activities, and restaurants tailored to your destination.",
    },
    {
      icon: <Calendar className="h-12 w-12 text-blue-600" />,
      title: "Smart Itinerary Builder",
      description: "Plan day-by-day itineraries, track ongoing trips, and manage your travel schedule with ease.",
    },
    {
      icon: <Wallet className="h-12 w-12 text-blue-600" />,
      title: "Expense Tracker & Splitter",
      description: "Record, categorize, and split expenses among friends with automated settlement suggestions.",
    },
    {
      icon: <Map className="h-12 w-12 text-blue-600" />,
      title: "Interactive Dashboard",
      description: "View all your upcoming, ongoing, and past trips in a beautiful, map-based dashboard.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Smarter Travel
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TripMate simplifies your travel planning experience with AI, intuitive expense management, and real-time organization tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Start Planning Your Next Adventure</h3>
              <p className="mb-6">
                Create trips, build itineraries, and track every expense — TripMate has all the tools you need for effortless travel planning.
              </p>
              <a
                href="/dashboard"
                className="inline-block bg-white text-blue-600 font-medium py-2 px-6 rounded-lg shadow hover:bg-gray-100 transition duration-300"
              >
                Get Started
              </a>
            </div>
            <div className="md:w-1/2 bg-blue-700 p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Why TripMate?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-blue-300" />
                  <span>AI-powered destination planning</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-blue-300" />
                  <span>Expense tracking and automated splitting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-blue-300" />
                  <span>Interactive trip dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 mr-2 text-blue-300" />
                  <span>Seamless UI with real-time updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
