"use client";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useState } from "react";

// Mock data for followers/following
const mockUsers = [
  { id: 1, name: "Alice Chen", username: "@alicechen", avatar: "AC", balance: "1,234", followers: "2.3k" },
  { id: 2, name: "Bob Martinez", username: "@bobmart", avatar: "BM", balance: "856", followers: "1.8k" },
  { id: 3, name: "Carol Davis", username: "@carold", avatar: "CD", balance: "3,421", followers: "5.1k" },
  { id: 4, name: "David Kim", username: "@davidk", avatar: "DK", balance: "672", followers: "890" },
  { id: 5, name: "Emma Wilson", username: "@emmaw", avatar: "EW", balance: "2,109", followers: "3.4k" },
  { id: 6, name: "Frank Lee", username: "@franklee", avatar: "FL", balance: "1,567", followers: "2.1k" },
];

export default function Home() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  
  const [activeView, setActiveView] = useState("home");
  const [selectedTab, setSelectedTab] = useState("followers");
  const [tipAmount, setTipAmount] = useState("1");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTipPopup, setShowTipPopup] = useState(false);

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleTip = (user) => {
    setSelectedUser(user);
    setTipAmount("1");
    setShowTipPopup(true);
  };

  const sendTip = () => {
    if (tipAmount && selectedUser) {
      alert(`Sending ${tipAmount} USDC to ${selectedUser.name}`);
      setTipAmount("1");
      setSelectedUser(null);
      setShowTipPopup(false);
    }
  };

  const closeTipPopup = () => {
    setShowTipPopup(false);
    setSelectedUser(null);
    setTipAmount("1");
  };

  return (
    <main className="min-h-screen relative overflow-hidden pb-20">
      {/* Background decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#93827f] opacity-20 rounded-full blur-3xl liquid-blob"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-[#92b4a7] opacity-20 rounded-full blur-3xl liquid-blob" style={{ animationDelay: '2s' }}></div>

      {/* Mobile-First Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="glass-strong p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#2f2f2f] tracking-wide">TIPBASE</h1>
              <p className="text-[#93827f] text-xs font-medium">Base • USDC</p>
            </div>
            <button
              onClick={() => open({ view: isConnected ? "Account" : "Connect" })}
              className="px-4 py-2.5 bg-gradient-to-r from-[#2f2f2f] to-[#93827f] text-[#f3f9d2] rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-md"
            >
              {isConnected ? formatAddress(address) : "CONNECT"}
            </button>
          </div>
        </header>

        {/* Home View */}
        {activeView === "home" && (
          <div className="px-4 space-y-4">
            {/* Tabs */}
            <div className="glass-strong rounded-2xl p-1 flex gap-1">
              <button
                onClick={() => setSelectedTab("followers")}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedTab === "followers"
                    ? "bg-white/30 text-[#2f2f2f] shadow-md"
                    : "text-[#93827f]"
                }`}
              >
                FOLLOWERS
              </button>
              <button
                onClick={() => setSelectedTab("following")}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedTab === "following"
                    ? "bg-white/30 text-[#2f2f2f] shadow-md"
                    : "text-[#93827f]"
                }`}
              >
                FOLLOWING
              </button>
            </div>

            {/* User List */}
            <div className="space-y-3">
              {mockUsers.map((user) => (
                <div key={user.id} className="glass-card rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2f2f2f] to-[#93827f] flex items-center justify-center text-white font-bold text-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2f2f2f] text-base">{user.name}</h3>
                      <p className="text-[#93827f] text-xs">{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTip(user)}
                    className="px-6 py-2.5 bg-[#2f2f2f] text-[#f3f9d2] rounded-xl font-bold text-sm hover:bg-[#2f2f2f]/90 transition-all active:scale-95"
                  >
                    TIP NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats View */}
        {activeView === "stats" && (
          <div className="px-4 space-y-4">
            <h2 className="text-2xl font-bold text-[#2f2f2f] mb-4">YOUR STATS</h2>
            
            <div className="glass-strong rounded-2xl p-6">
              <p className="text-[#93827f] text-xs mb-2 font-semibold tracking-wide">TOTAL TIPPED</p>
              <p className="text-4xl font-bold text-[#2f2f2f] mb-1">1,234</p>
              <p className="text-[#93827f] text-sm">USDC</p>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <p className="text-[#93827f] text-xs mb-2 font-semibold tracking-wide">TOTAL RECEIVED</p>
              <p className="text-4xl font-bold text-[#2f2f2f] mb-1">856</p>
              <p className="text-[#93827f] text-sm">USDC</p>
            </div>

            <div className="glass-strong rounded-2xl p-6">
              <p className="text-[#93827f] text-xs mb-2 font-semibold tracking-wide">TRANSACTIONS</p>
              <p className="text-4xl font-bold text-[#2f2f2f]">47</p>
            </div>
          </div>
        )}

        {/* Activity View */}
        {activeView === "activity" && (
          <div className="px-4 space-y-4">
            <h2 className="text-2xl font-bold text-[#2f2f2f] mb-4">RECENT ACTIVITY</h2>
            
            <div className="glass-card rounded-2xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-[#2f2f2f] text-sm">Sent to @alicechen</p>
                  <p className="text-xs text-[#93827f] mt-1">2 hours ago</p>
                </div>
                <p className="font-bold text-[#2f2f2f] text-lg">-10</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#93827f]">USDC</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-[#2f2f2f] text-sm">Received from @davidk</p>
                  <p className="text-xs text-[#93827f] mt-1">5 hours ago</p>
                </div>
                <p className="font-bold text-[#92b4a7] text-lg">+25</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#93827f]">USDC</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-[#2f2f2f] text-sm">Sent to @emmaw</p>
                  <p className="text-xs text-[#93827f] mt-1">1 day ago</p>
                </div>
                <p className="font-bold text-[#2f2f2f] text-lg">-15</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#93827f]">USDC</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Popup Modal for Tipping */}
      {showTipPopup && selectedUser && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] animate-slide-up">
          {/* Background shade matching gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#bdc4a7]/95 via-[#92b4a7]/90 to-transparent -z-10"
            onClick={closeTipPopup}
          ></div>
          
          {/* Popup */}
          <div className="bg-gradient-to-b from-[#f3f9d2] to-[#bdc4a7] rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto relative shadow-2xl">
            {/* Close button */}
            <div className="w-12 h-1.5 bg-[#93827f]/30 rounded-full mx-auto mb-6"></div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-[#93827f] text-xs font-semibold tracking-wide">TIPPING TO</p>
              <button
                onClick={closeTipPopup}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 text-[#2f2f2f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Handle bar */}
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2f2f2f] to-[#93827f] flex items-center justify-center text-white font-bold text-xl">
                {selectedUser.avatar}
              </div>
              <div>
                <p className="font-bold text-[#2f2f2f] text-xl">{selectedUser.name}</p>
                <p className="text-sm text-[#93827f]">{selectedUser.username}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[#93827f] text-xs mb-2 block font-semibold tracking-wide">AMOUNT (USDC)</label>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="1.00"
                className="w-full px-4 py-4 rounded-2xl glass-card text-[#2f2f2f] text-2xl font-bold placeholder-[#93827f] outline-none focus:ring-2 focus:ring-[#2f2f2f] bg-transparent"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              <button
                onClick={() => setTipAmount("1")}
                className="py-3 glass-card rounded-xl text-[#2f2f2f] font-bold hover:bg-white/30 transition-all active:scale-95"
              >
                $1
              </button>
              <button
                onClick={() => setTipAmount("5")}
                className="py-3 glass-card rounded-xl text-[#2f2f2f] font-bold hover:bg-white/30 transition-all active:scale-95"
              >
                $5
              </button>
              <button
                onClick={() => setTipAmount("10")}
                className="py-3 glass-card rounded-xl text-[#2f2f2f] font-bold hover:bg-white/30 transition-all active:scale-95"
              >
                $10
              </button>
              <button
                onClick={() => setTipAmount("20")}
                className="py-3 glass-card rounded-xl text-[#2f2f2f] font-bold hover:bg-white/30 transition-all active:scale-95"
              >
                $20
              </button>
            </div>

            <button
              onClick={sendTip}
              disabled={!tipAmount}
              className="w-full py-4 bg-[#2f2f2f] text-[#f3f9d2] rounded-2xl font-bold text-lg hover:bg-[#2f2f2f]/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              SEND TIP
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-navbar z-50">
        <div className="flex justify-around items-center py-4 px-2">
          <button
            onClick={() => setActiveView("home")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeView === "home" ? "text-[#2f2f2f]" : "text-[#93827f]"
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-bold">HOME</span>
          </button>

          <button
            onClick={() => setActiveView("stats")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeView === "stats" ? "text-[#2f2f2f]" : "text-[#93827f]"
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span className="text-xs font-bold">STATS</span>
          </button>

          <button
            onClick={() => setActiveView("activity")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeView === "activity" ? "text-[#2f2f2f]" : "text-[#93827f]"
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold">ACTIVITY</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
