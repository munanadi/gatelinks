"use client";

import Link from "next/link";
import { DocsPageHeader } from "@/components/page-header";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppState } from "@/store/app-state";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@/components/multi-wallet-btn";
import { getShortAddress } from "@/helpers/stuff";

export default function GuidesPage() {
  const { connected, publicKey } = useWallet();

  // const products = [
  //   {
  //     _id: "1",
  //     title: "Hello World!",
  //     description: "This is the first post",
  //     slug: "/",
  //   },
  // ];
  const products: any[] = [];

  return !publicKey ? (
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
            Welcome {getShortAddress(publicKey, 3)}
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

      <DocsPageHeader
        heading="Your Products"
        buttonText="Create Product"
        buttonLink="create-product"
      />
      {products?.length ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {products.map((guide) => (
            <article
              key={guide._id}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {guide.title}
                  </h2>
                  {guide.description && (
                    <p className="text-muted-foreground">
                      {guide.description}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href={guide.slug}
                className="absolute inset-0"
              >
                <span className="sr-only">View</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <>
          <p>
            No products published. Craete a product first!
          </p>
        </>
      )}
    </div>
  );
}
