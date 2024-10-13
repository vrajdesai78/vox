import { Navbar } from "@/components/navbar/navbar";
import FooterWithBanner from "@/components/footer/footer";
import Hero from "@/components/landing/hero";
import CityCards from "@/components/cards/city-card";
import SellGrid from "@/components/sell/sell-grid";

export default function Explore() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className='w-full flex-grow'>
        <div className='max-w-6xl mx-auto w-full relative'>
          <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-6xl'>
            <Navbar />
          </div>
          <div className='pt-16 border-x-black/10 border-x-2 overflow-hidden'>
            <Hero />
          </div>
        </div>
      </main>
      <FooterWithBanner />
    </div>
  );
}