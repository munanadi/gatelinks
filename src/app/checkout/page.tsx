"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createSession = async () => {
    setIsLoading(true);

    const response = await fetch("/api/create-sessions", {
      method: "POST",
    });
    const data = await response.json();

    router.push(data.payment_url);
    setIsLoading(false);
  };

  return (
    <main>
      <button
        onClick={createSession}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "Loading..." : "Checkout"}
      </button>
    </main>
  );
}
