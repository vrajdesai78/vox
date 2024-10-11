import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { Navbar } from "../components/navbar/navbar";
import FooterWithBanner from "../components/footer/footer";
import SellHero from "../components/sell/sell-hero";

export default function Explore() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) {
    return null; 
  }

  return (
    <>
      <Head>
        <title>🎤 Vox - Sell</title>
      </Head>

      <main className="w-full min-h-screen flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
            <Navbar />
          </div>
          <div className="pt-32 border-x-black/10 border-x-2 h-full">
            <SellHero />
          </div>
        </div>
      </main>
      <FooterWithBanner />
    </>
  );
}