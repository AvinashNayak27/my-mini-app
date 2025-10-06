"use client";
import { AppKitButton } from "@reown/appkit/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-900">TipNow</h1>
        <AppKitButton className="px-6 py-2 text-base font-medium rounded-lg" />
      </div>
    </main>
  );
}
