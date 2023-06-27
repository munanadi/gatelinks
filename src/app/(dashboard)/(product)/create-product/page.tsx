"use client";

import { useWallet } from "@solana/wallet-adapter-react";

export default function CreateProduct() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="mx-auto container">
      <h2 className="font-heading text-3xl leading-[1.1]">
        Create product page
      </h2>
    </div>
  );
}
