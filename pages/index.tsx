import { useLogin } from "@privy-io/react-auth";
import { PrivyClient } from "@privy-io/server-auth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Hero from "../components/landing/hero";
import { Navbar } from "../components/navbar/navbar";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieAuthToken = req.cookies["privy-token"];

  if (!cookieAuthToken) return { props: {} };

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
  const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

  try {
    const claims = await client.verifyAuthToken(cookieAuthToken);
    console.log({ claims });

    return {
      props: {},
      redirect: { destination: "/explore", permanent: false },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLogin({
    onComplete: () => router.push("/dashboard"),
  });

  return (
    <>
      <Head>
        <title>🎤 Vox</title>
      </Head>
      <div className="flex justify-center">
        <button
          className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
          onClick={login}
        >
          Log in
        </button>
      </div>
      <main className="w-full h-screen flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
            <Navbar />
          </div>
          <div className="pt-16  border-x-black/10 border-x-2 h-full">
            <Hero />
          </div>
        </div>
      </main>
    </>
  );
}
