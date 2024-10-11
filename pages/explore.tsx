import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { Navbar } from "../components/navbar/navbar";
import ExploreHero from "../components/explore/explore-hero";
import FooterWithBanner from "../components/footer/footer";

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
        <title>🎤 Vox - Explore</title>
      </Head>

      <main className="w-full min-h-screen flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
            <Navbar />
          </div>
          <div className="pt-32 border-x-black/10 border-x-2 h-full">
            <ExploreHero />
          </div>
        </div>
      </main>
      <FooterWithBanner />
    </>
  );
}