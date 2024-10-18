import type { Metadata } from "next";
import localFont from "next/font/local";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import { Providers } from "@/context/Provider";

export const metadata: Metadata = {
  title: "Vox",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
