import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Hero from "../components/landing/hero";
import { Navbar } from "../components/navbar/navbar";
import FooterWithBanner from "../components/footer/footer";

export default function HomePage() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const { login } = useLogin({
    onComplete: () => router.push("/explore"),
  });

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/explore");
    }
  }, [ready, authenticated, router]);

  if (!ready) {
    return null;
  }

  if (authenticated) {
    return null; 
  }

  return (
    <>
      <Head>
        <title>🎤 Vox - Home</title>
      </Head>

      <main className="w-full min-h-screen flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
            <Navbar />
          </div>
          <div className="pt-32 border-x-black/10 border-x-2 h-full">
            <Hero onLogin={login} />
          </div>
        </div>
      </main>
      <FooterWithBanner />
    </>
  );
}