import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturesHighlight from '../components/home/FeaturesHighlight';
import { PopularCityList } from '../components/home/PopularCityList';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import CreateTripForm from '../components/dashboard/CreateTripForm';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Navbar />
      <main>
        {/* Hero Area */}
        <div 
          className="relative h-150 flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/dashboard-bg.webp')" }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="relative z-10 text-center text-white px-4">
             <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Where to next?
            </h1>
            <p className="text-xl opacity-90">Start planning your dream trip today.</p>
          </div>
        </div>

        {/* Form Container with Overlap */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 mb-16">
          <CreateTripForm />
        </div>
        
        <PopularCityList />
      </main>
      <Footer />
    </ProtectedRoute>
  );
}