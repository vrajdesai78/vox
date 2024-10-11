import Head from "next/head";
import { Navbar } from "@/components/navbar/navbar";
import ExploreHero from "@/components/explore/explore-hero";
import FooterWithBanner from "@/components/footer/footer";

export default function Explore() {
  return (
    <>
      <main className='w-full min-h-screen flex justify-center'>
        <div className='max-w-6xl w-full'>
          <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-20'>
            <Navbar />
          </div>
          <div className='pt-32 border-x-black/10 border-x-2 h-full'>
            <ExploreHero />
          </div>
        </div>
      </main>
      <FooterWithBanner />
    </>
  );
}
