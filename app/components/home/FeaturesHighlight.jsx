'use client';

import { Plane, Calendar, Wallet, Map, ArrowRight } from 'lucide-react';

export default function FeaturesHighlight() {
  const features = [
    {
      icon: <Plane className="h-8 w-8" />,
      title: "AI Trip Suggestions",
      description: "AI-generated itineraries tailored to your destination",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Smart Itinerary",
      description: "Plan and track your trips effortlessly",
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Expense Splitter",
      description: "Split costs automatically among friends",
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: "Live Dashboard",
      description: "Beautiful map-based trip overview",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-red-50/30 to-white dark:from-gray-900 dark:via-red-950/10 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
              All-in-One
            </span>
            <span className="text-gray-900 dark:text-white"> Travel Platform</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            AI planning • Expense tracking • Real-time sync
          </p>
        </div>

        {/* Compact Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Minimal CTA */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-red-600 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative py-12 px-8 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Start Your Journey Today
            </h3>
            <p className="text-lg text-red-50 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers planning smarter with TripMate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}