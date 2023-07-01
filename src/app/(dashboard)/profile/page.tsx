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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users } from "lucide-react";

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
    <div className="mx-auto flex flex-col w-full gap-4 text-center container">
      <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-6xl">
        Connect your wallet to get Starterd
      </h2>
      <WalletMultiButton />
    </div>
  ) : (
    <div className="py-6">
      <section className="container flex flex-col gap-6 py-8">
        <div className="mx-auto flex w-full gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Welcome {getShortAddress(wallet.publicKey, 3)}
          </h2>
          <WalletDisconnectButton />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRevenue.toFixed(7)} SOL
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {numberSold}
              </div>
              {/* <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p> */}
            </CardContent>
          </Card>
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
