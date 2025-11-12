"use client";
import Link from "next/link";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link href="/" className="text-xl font-bold tracking-wide">
            TripMate
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition duration-300"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
