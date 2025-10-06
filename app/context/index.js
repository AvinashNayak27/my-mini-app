"use client";

import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { base } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sdk } from "@farcaster/miniapp-sdk";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

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
  followers: [],
  following: [],
  followersLoading: false,
  followingLoading: false,
  followersError: null,
  followingError: null,
  fetchFollowers: null,
  fetchFollowing: null,
});

export function useFarcaster() {
  return useContext(FarcasterContext);
}

function FarcasterProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersLoading, setFollowersLoading] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);
  const [followersError, setFollowersError] = useState(null);
  const [followingError, setFollowingError] = useState(null);
  const [followersLoaded, setFollowersLoaded] = useState(false);
  const [followingLoaded, setFollowingLoaded] = useState(false);

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

  const fetchFollowers = useCallback(async (fid) => {
    if (!fid || followersLoaded) return;
    
    setFollowersLoading(true);
    setFollowersError(null);
    
    try {
      const response = await fetch(`/api/followers?fid=${fid}&limit=15`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFollowers(data.result?.users || []);
      setFollowersLoaded(true);
    } catch (err) {
      console.error('Error fetching followers:', err);
      setFollowersError(err.message);
      setFollowers([]);
    } finally {
      setFollowersLoading(false);
    }
  }, [followersLoaded]);

  const fetchFollowing = useCallback(async (fid) => {
    if (!fid || followingLoaded) return;
    
    setFollowingLoading(true);
    setFollowingError(null);
    
    try {
      const response = await fetch(`/api/following?fid=${fid}&limit=15`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFollowing(data.result?.users || []);
      setFollowingLoaded(true);
    } catch (err) {
      console.error('Error fetching following:', err);
      setFollowingError(err.message);
      setFollowing([]);
    } finally {
      setFollowingLoading(false);
    }
  }, [followingLoaded]);

  return (
    <FarcasterContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      getToken,
      followers,
      following,
      followersLoading,
      followingLoading,
      followersError,
      followingError,
      fetchFollowers,
      fetchFollowing
    }}>
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
