"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia } from "wagmi/chains";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { ToastContainer } from "react-toastify";

import { getConfig } from "./wagmi";

export function Providers(props: { children: ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
        >
          {props.children}
          <ToastContainer />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
