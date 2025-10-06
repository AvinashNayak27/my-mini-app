"use client";

import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { base } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sdk } from "@farcaster/miniapp-sdk";
import { createContext, useContext, useEffect, useState } from "react";

// 0. Setup queryClient
const queryClient = new QueryClient();

const projectId = "b0c99c09c190fffec9a27bc2678a0c12";

// 2. Create a metadata object
const metadata = {
  name: "TipBase",
  description: "Tip your community on Base with USDC",
};

// 3. Set the networks
const networks = [base];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

// Create Farcaster context
const FarcasterContext = createContext({
  user: null,
  isLoading: true,
  error: null,
  getToken: null,
});

export function useFarcaster() {
  return useContext(FarcasterContext);
}

function FarcasterProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initializeFarcaster() {
      try {
        // Get Quick Auth token to authenticate user
        const ctx = await sdk.context;
        
        if (ctx.user) {

            setUser({
              fid: ctx.user.fid,
              username: ctx.user.username,
              displayName: ctx.user.displayName,
              pfpUrl: ctx.user.pfpUrl
            });
        }
        
        // Signal that the app is ready
        await sdk.actions.ready();
        setIsLoading(false);
      } catch (err) {
        console.error('Farcaster initialization error:', err);
        setError(err.message);
        setIsLoading(false);
        // Still call ready even if there's an error
        try {
          await sdk.actions.ready();
        } catch (readyErr) {
          console.error('Error calling sdk.actions.ready():', readyErr);
        }
      }
    }

    initializeFarcaster();
  }, []);

  const getToken = async () => {
    try {
      const { token } = await sdk.quickAuth.getToken();
      return token;
    } catch (err) {
      console.error('Error getting token:', err);
      return null;
    }
  };

  return (
    <FarcasterContext.Provider value={{ user, isLoading, error, getToken }}>
      {children}
    </FarcasterContext.Provider>
  );
}

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <FarcasterProvider>
          {children}
        </FarcasterProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
