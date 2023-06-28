"use client";

import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui"))
      .WalletMultiButton,
  { ssr: false }
);

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui"))
      .WalletDisconnectButton,
  { ssr: false }
);

export function WalletMultiButton() {
  return <WalletMultiButtonDynamic />;
}

export function WalletDisconnectButton() {
  return <WalletDisconnectButtonDynamic />;
}
