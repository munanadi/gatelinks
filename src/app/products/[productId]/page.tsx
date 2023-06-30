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
import { Product, User } from "@/db/schema";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { push } = useRouter();
  const { get } = useSearchParams();
  const { publicKey } = useWallet();

  // TODO: Very shitty way of checking ownership
  const bought = get("bought");

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
    if (productDetails && publicKey) {
      setLoading(true);

      const userData: User = {
        date: new Date().toISOString(),
        productHash: params.productId,
        sold: false,
        wallet: publicKey?.toString(),
      };

      let response;

      try {
        response = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify({
            product: {
              name: productDetails.name,
              image: productDetails.productLink,
              quantity: 1,
              price: parseFloat(productDetails.price),
            },
            user: userData,
          }),
        });

        const data = await response.json();

        const error = data.error;
        const userResult = data.user;
        const candyPayresult = data.candypay;

        console.log({ error, userResult, candyPayresult });

        toast({
          title: `Purchased!`,
          description: `${productDetails.name} bought!`,
        });
        setLoading(false);
        push("/purchases");
      } catch (e) {
        console.log(e);
      }
    }
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
              {!bought ? (
                <h4 className="text-7xl font-bold">
                  {productDetails.price ?? 0.01} SOL
                </h4>
              ) : (
                <Button
                  onClick={() => {
                    window.open(
                      productDetails.productLink,
                      "_blank"
                    );
                  }}
                  className={cn(
                    buttonVariants({ size: "lg" })
                  )}
                >
                  Get {productDetails.name} here
                </Button>
              )}
            </div>
            {!bought &&
              productDetails.creatorWallet !==
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
