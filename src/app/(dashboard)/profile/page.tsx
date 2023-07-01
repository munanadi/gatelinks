"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@/components/multi-wallet-btn";
import { getShortAddress } from "@/helpers/stuff";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProfilePage() {
  const wallet = useWallet();

  const [numberSold, setNumberSold] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] =
    useState<number>(0.0);

  useEffect(() => {
    const fetchData = async () => {
      if (wallet?.publicKey) {
        // Fetch the total amount of money made and number of products sold.
        const res = await fetch("/api/product-stats", {
          method: "POST",
          body: JSON.stringify({
            wallet: wallet.publicKey.toString(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.error) {
          return;
        }

        setNumberSold(data.result.numberSold);
        setTotalRevenue(data.result.totalRevenue);
      }
    };
    fetchData();
  }, [wallet?.publicKey]);

  return !wallet.publicKey ? (
    <div className="flex justify-between">
      <h2 className="font-heading text-3xl leading-[1.1]">
        Connect your wallet to get started!
      </h2>
      <WalletMultiButton />
    </div>
  ) : (
    <div className="py-6">
      <section className="container flex flex-col gap-6 py-8">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Welcome {getShortAddress(wallet.publicKey, 3)}
          </h2>
          <WalletDisconnectButton />
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 ">
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">
                {totalRevenue.toFixed(6)} SOL
              </h4>
              <p className="text-sm font-medium text-muted-foreground">
                Revenue
              </p>
            </div>
          </div>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 ">
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">
                {numberSold}
              </h4>
              <p className="text-sm font-medium text-muted-foreground">
                Number Sold
              </p>
            </div>
          </div>
        </div>
        <Link
          href="/products"
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "sm",
            }),
            "px-4 cursor-pointer text-white text-lg"
          )}
        >
          Create a Product
        </Link>
      </section>
    </div>
  );
}
