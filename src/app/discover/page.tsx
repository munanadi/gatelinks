"use client";

import { DocsPageHeader } from "@/components/page-header";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/db/schema";
import { getShortAddress } from "@/helpers/stuff";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "lucide-react";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function DiscoverPage() {
  const { publicKey } = useWallet();
  const { push } = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (publicKey) {
        const discoverResult = await fetch(
          `/api/products?discover=true`,
          {
            method: "POST",
            body: JSON.stringify({
              wallet: publicKey.toString(),
            }),
          }
        );
        const discoverData = await discoverResult.json();

        setProducts(discoverData.product);
      }
    };

    fetchData();
  }, [publicKey]);

  return (
    <div className="container">
      <DocsPageHeader heading="Discover" />

      {products?.length ? (
        <>
          {products.map((product: Product) => (
            <div
              key={product.productHash}
              className="cursor-pointer"
            >
              <Card
                onClick={() =>
                  push(`/products/${product.productHash}`)
                }
              >
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                  <div className="space-y-1">
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>
                      {product.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Wallet className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                      {getShortAddress(
                        new PublicKey(product.creatorWallet)
                      )}
                    </div>
                    <div>
                      {new Date(
                        product.createdDate
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center flex-col gap-3">
          <p>
            Tell your friends about gatelinks and make them
            create products!
          </p>
          <Button
            onClick={() => {
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURI(
                  "Yooo! Check this out! \n\nGatelinks is a crypto-native alternative to Gumroad built with @candypayfun and @GenesysGo \n\ngatelinks-ten.vercel.app/ \n\nIt is also Open source https://github.com/munanadi/gatelinks"
                )}`,
                "_blank"
              );
            }}
            className={cn(buttonVariants({ size: "lg" }))}
            variant="outline"
          >
            <span>Tweet about it!</span>
          </Button>
        </div>
      )}
    </div>
  );
}
