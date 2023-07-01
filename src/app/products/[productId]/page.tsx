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
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const { push } = useRouter();
  const { publicKey } = useWallet();

  const [productDetails, setProductDetails] =
    useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [validPurchase, setValidPurchase] =
    useState<boolean>(false);

  // Using the hash, fetch the prodcut details
  useEffect(() => {
    const fetchData = async () => {
      if (params.productId && publicKey) {
        setLoading(true);
        const result = await fetch(
          `/api/product/${params.productId}`
        );
        const data = await result.json();

        const purchaseResult = await fetch(
          `/api/check-purchase`,
          {
            method: "POST",
            body: JSON.stringify({
              wallet: publicKey?.toString(),
              productHash: params.productId,
            }),
          }
        );
        const purchaseData = (await purchaseResult.json())
          .product as Array<any>;

        if (
          purchaseData.length !== 0 ||
          (data.product[0] as Product).creatorWallet ===
            publicKey.toString()
        ) {
          setValidPurchase(true);
        }

        setProductDetails(data.product[0]);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.productId, publicKey]);

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

        // console.log({ error, userResult, candyPayresult });

        if (error) {
          console.log(error);
          setLoading(false);
          return;
        }

        setLoading(false);
        push(candyPayresult?.payment_url);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // PDFs can't be preview so a small hack
  const isPdf =
    productDetails?.productLink
      .split("/")[4]
      ?.split(".")[1] === "pdf";

  const productOwnedByCreator =
    productDetails?.creatorWallet === publicKey?.toString();

  return productDetails ? (
    <section className="container flex flex-col gap-6 py-8 ">
      {validPurchase ? (
        <embed
          src={productDetails.productLink}
          className="h-[350px]"
        ></embed>
      ) : !isPdf ? (
        <Image
          alt="Image describing the product"
          src={
            encodeURI(
              productDetails.productLink
            ).toString() ??
            "https://shdw-drive.genesysgo.net/F3CMo1VEiLtpohhWceZ7mpdmZJvTvVW8drMwrQugD1oE/dp.png"
          }
          className="block blur-lg animate-pulse"
          width={250}
          height={330}
        />
      ) : (
        <div
          role="status"
          className="max-w-sm animate-pulse realtive"
        >
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className=" mb-2.5 ">
            Buy to unlock content
          </div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div className="mx-auto flex w-full flex-col gap-4">
        <h2 className="font-heading text-6xl leading-[1.1] ">
          {productDetails.name ?? "Default Name"}
        </h2>
        <p className="max-w-[85%] text-muted-foreground text-lg ">
          {productDetails.description ??
            "This is the default description"}
        </p>
        {!productOwnedByCreator && (
          <div className="gap-10 rounded-lg border p-10 ">
            <div className="flex flex-col gap-4 text-center">
              <div>
                {!validPurchase ? (
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
              {!validPurchase && (
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
        )}
      </div>
    </section>
  ) : (
    <h1> Failed to fetch Product Details</h1>
  );
}
