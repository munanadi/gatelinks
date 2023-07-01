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
  return (
    <div className="mx-auto">
      <WalletMultiButtonDynamic />;
    </div>
  );
}

export function WalletDisconnectButton() {
  return (
    <div className="mx-auto">
      <WalletDisconnectButtonDynamic />
    </div>
  );
}
