import Link from 'next/link';

export default function HeroSection() {

  return (
    <section className="bg-cover bg-center bg-no-repeat text-white py-16 h-150 " 
    style={{ backgroundImage: "url('/images/dashboard-bg.webp')" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plan Smarter, Travel Better with TripMate
            </h1>
            <p className="text-xl mb-8">
              Create AI-powered itineraries, manage expenses, and split trip costs — all in one seamless platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
              >
                Start Planning
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
