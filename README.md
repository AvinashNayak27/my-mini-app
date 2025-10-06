# 🎯 TipBase - Farcaster Tipping Mini-App

**TipBase** is a beautiful Farcaster mini-app that enables seamless USDC tipping within the Farcaster ecosystem. Built with modern Web3 technologies and powered by the **Reown SDK** (formerly WalletConnect), TipBase provides a smooth, mobile-first experience for sending crypto tips to your followers and following.

![TipBase Preview](https://img.shields.io/badge/Network-Base-blue) ![USDC](https://img.shields.io/badge/Token-USDC-green) ![Farcaster](https://img.shields.io/badge/Platform-Farcaster-purple)

## ✨ Features

- 🎨 **Beautiful Glassmorphism UI** - Modern, mobile-first design with smooth animations
- 💰 **USDC Tipping** - Send USDC tips directly to Farcaster users on Base network
- 🔗 **Farcaster Integration** - Native integration with Farcaster protocol and user data
- 🌐 **Reown SDK Powered** - Seamless wallet connectivity using Reown's industry-leading Web3 infrastructure
- 📱 **Mobile Optimized** - Responsive design perfect for mobile Farcaster clients
- ⚡ **Base Network** - Fast and cheap transactions on Coinbase's L2
- 👥 **Social Features** - View and tip your followers and following
- 📊 **Activity Tracking** - Monitor your tipping history and statistics

## 🛠 Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React with concurrent features
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework

### Web3 & Wallet Integration
- **[Reown SDK](https://reown.com)** 🌟 - Advanced Web3 wallet connectivity and account management
- **[Wagmi](https://wagmi.sh)** - React hooks for Ethereum interactions
- **[Viem](https://viem.sh)** - TypeScript interface for Ethereum
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization

### Farcaster Integration
- **[Farcaster Mini-App SDK](https://docs.farcaster.xyz/developers/frames/miniapps)** - Native Farcaster protocol integration
- **Farcaster API** - User data, followers, and social graph access

### Blockchain
- **[Base Network](https://base.org)** - Coinbase's Ethereum L2 for fast, cheap transactions
- **USDC Contract** - Circle's USD Coin for stable value transfers

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- A Reown Project ID (get one at [cloud.reown.com](https://cloud.reown.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure Reown SDK**
   
   Update the `projectId` in `app/context/index.js`:
   ```javascript
   const projectId = "your-reown-project-id-here";
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Farcaster Mini-App Setup

To run as a Farcaster mini-app:

1. Deploy your app to a public URL (Vercel recommended)
2. Register your mini-app in the Farcaster developer portal
3. Configure the manifest and permissions
4. Test within Farcaster clients (Warpcast, etc.)

## 🔧 Configuration

### Reown SDK Configuration

The Reown SDK is configured in `app/context/index.js` with:

```javascript
// Reown AppKit configuration
createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],           // Base network support
  projectId,                  // Your Reown project ID
  metadata: {
    name: "TipBase",
    description: "Tip your community on Base with USDC",
  },
  features: {
    analytics: true,          // Enable Reown analytics
  },
});
```

### Network Configuration

TipBase is configured for Base network:
- **Network**: Base (Chain ID: 8453)
- **Token**: USDC (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- **RPC**: Provided by Reown's infrastructure

## 📱 Usage

1. **Connect Wallet** - Use Reown's wallet connection modal
2. **View Social Graph** - Browse your Farcaster followers and following
3. **Send Tips** - Select users and send USDC tips with custom amounts
4. **Track Activity** - Monitor your tipping history and statistics

## 🏗 Project Structure

```
app/
├── api/                    # Next.js API routes
│   ├── followers/         # Farcaster followers endpoint
│   ├── following/         # Farcaster following endpoint
│   └── address/           # User address resolution
├── context/               # React context providers
│   └── index.js          # Reown SDK & Farcaster setup
├── globals.css           # Global styles & animations
├── layout.js             # Root layout with providers
└── page.js               # Main application component
```

## 🌟 Key Integrations

### Reown SDK Features Used

- **AppKit Modal** - Seamless wallet connection UI
- **Wagmi Adapter** - React hooks for blockchain interactions
- **Multi-wallet Support** - Support for 100+ wallets
- **Network Management** - Automatic network switching to Base
- **Account Management** - User account state and balance tracking

### Farcaster Integration

- **User Authentication** - Farcaster user context and profiles
- **Social Graph** - Followers and following data
- **Address Resolution** - Ethereum address lookup for users
- **Mini-App SDK** - Native Farcaster app integration

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Configure Environment**
   - Set up your Reown project ID
   - Configure any additional environment variables

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

TipBase can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **[Reown Documentation](https://docs.reown.com)** - Learn more about Reown SDK
- **[Farcaster Docs](https://docs.farcaster.xyz)** - Farcaster protocol documentation
- **[Base Network](https://base.org)** - Learn about Base L2
- **[Next.js Docs](https://nextjs.org/docs)** - Next.js framework documentation

---

Built with ❤️ using **Reown SDK** for seamless Web3 connectivity
