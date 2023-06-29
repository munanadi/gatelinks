"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@/components/multi-wallet-btn";
import { getShortAddress } from "@/helpers/stuff";

export default function ProfilePage() {
  const wallet = useWallet();

  return !wallet.publicKey ? (
    <div className="flex justify-between">
      <h2 className="font-heading text-3xl leading-[1.1]">
        Connect your wallet to get started!
      </h2>
      <WalletMultiButton />
    </div>
  ) : (
    <div className="py-6">
      <section className="container flex gap-6 py-8">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Welcome {getShortAddress(wallet.publicKey, 3)}
          </h2>
          <WalletDisconnectButton />
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 ">
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$19</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Revenue
              </p>
            </div>
          </div>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 ">
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">21</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Number Sold
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
