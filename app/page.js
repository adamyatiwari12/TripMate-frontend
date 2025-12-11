import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import FeaturesHighlight from './components/home/FeaturesHighlight';
import { PopularCityList } from './components/home/PopularCityList';

export default function Home() {;
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesHighlight />
        <PopularCityList />
      </main>
      <Footer />
    </>
  );
}