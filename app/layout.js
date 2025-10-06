import { Orbitron } from "next/font/google";
import "./globals.css";
import { AppKitProvider } from "./context";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "TipBase - Tip Your Community on Base with USDC",
  description: "Send USDC tips to your followers and following on Base network. Beautiful glassmorphism design for seamless crypto tipping.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} antialiased`}
      >
        <AppKitProvider>{children}</AppKitProvider>
      </body>
    </html>
  );
}
