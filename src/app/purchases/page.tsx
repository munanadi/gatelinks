"use client";

import { DocsPageHeader } from "@/components/page-header";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Product } from "@/db/schema";
import { getShortAddress } from "@/helpers/stuff";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function DashboardPage() {
  const { publicKey } = useWallet();
  const { push } = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (publicKey) {
        const purchaseResult = await fetch(
          `/api/purchases`,
          {
            method: "POST",
            body: JSON.stringify({
              wallet: publicKey.toString(),
            }),
          }
        );
        const purchaseData = (await purchaseResult.json())
          .product;

        const porductHashes = purchaseData.map(
          (prd: Product) => prd.productHash
        );

        if (porductHashes.length !== 0) {
          // products bought.

          // TODO: Fetching just one product for now. fetch all products that are purchased.
          const productDetail = await fetch(
            `/api/product`,
            {
              method: "POST",
              body: JSON.stringify(porductHashes),
            }
          );
          const prodcutData = await productDetail.json();

          setProducts(prodcutData.result.productDetails);
        }
      }
    };

    fetchData();
  }, [publicKey]);

  return (
    <div className="container">
      <DocsPageHeader heading="Your Purchases" />

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
          <p>Discover new products!</p>
          <Button
            onClick={() => {
              push(`discover`);
            }}
            className={cn(buttonVariants({ size: "lg" }))}
            variant="outline"
          >
            <span>Take me there!</span>
          </Button>
        </div>
      )}
    </div>
  );
}
