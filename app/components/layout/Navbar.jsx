"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plane, Calendar, Wallet, Map, Check, MapPin, Menu, X, Sparkles, TrendingUp, Users, Globe } from 'lucide-react';


export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Trips", href: "/trips" },
    { name: "Expenses", href: "/expenses" },
  ];

  return (
    <div className="flex flex-col">
      {/* Navbar with Red Theme */}
      <nav className="absolute top-0 left-0 w-full z-50 bg-transparent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 p-1.5 rounded-lg">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">TripMate</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
              {/* My Trips removed to avoid duplication */}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-all duration-200 text-sm"
                >
                  Sign Out
                </button>
              ) : (
                <a
                  href="/login"
                  className="ml-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-all duration-200 text-sm"
                >
                  Sign In
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}