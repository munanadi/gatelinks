"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Product } from "@/db/schema";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const router = useRouter();
  const { publicKey } = useWallet();

  const [productDetails, setProductDetails] =
    useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Using the hash, fetch the prodcut details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch(
        `/api/product/${params.productId}`
      );
      const data = await result.json();

      setProductDetails(data.product[0]);
      setLoading(false);
    };

    if (params.productId) {
      fetchData();
    }
  }, [params.productId]);

  const createSession = async () => {
    setLoading(true);

    const response = await fetch("/api/create-sessions", {
      method: "POST",
    });
    const data = await response.json();

    router.push(data.payment_url);
    setLoading(false);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : productDetails ? (
    <section className="container flex flex-col gap-6 py-8 ">
      <Image
        alt="Image describing the product"
        src={
          encodeURI(
            productDetails.productLink
          ).toString() ??
          "https://shdw-drive.genesysgo.net/F3CMo1VEiLtpohhWceZ7mpdmZJvTvVW8drMwrQugD1oE/dp.png"
        }
        className="block"
        width={250}
        height={330}
      />

      <div className="mx-auto flex w-full flex-col gap-4">
        <h2 className="font-heading text-6xl leading-[1.1] ">
          {productDetails.name ?? "Default Name"}
        </h2>
        <p className="max-w-[85%] text-muted-foreground text-lg ">
          {productDetails.description ??
            "This is the default description"}
        </p>
        <div className="gap-10 rounded-lg border p-10 ">
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">
                {productDetails.price ?? 0.01} SOL
              </h4>
            </div>
            {productDetails.creatorWallet !==
              publicKey?.toString() && (
              <Button
                onClick={createSession}
                className={cn(
                  buttonVariants({ size: "lg" })
                )}
              >
                {!loading ? "Buy!" : "Loading"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <h1> Failed to fetch Product Details</h1>
  );
}
