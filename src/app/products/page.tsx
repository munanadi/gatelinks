"use client";

import { DocsPageHeader } from "@/components/page-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Product } from "@/db/schema";
import { getShortAddress } from "@/helpers/stuff";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { PublicKey } from "@solana/web3.js";
import { Link, Wallet } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function ProductDetail() {
  const { publicKey } = useWallet();
  const { push } = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (publicKey) {
        const res = await fetch(`/api/products`, {
          method: "POST",
          body: JSON.stringify({
            wallet: publicKey.toString(),
          }),
        });
        const data = await res.json();
        setProducts(data.product);
      }
    };

    fetchData();
  }, [publicKey]);

  return (
    <div className="container">
      <DocsPageHeader
        heading="Your Products"
        buttonText="Create Product"
        buttonLink="create-product"
      />

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
                <CardFooter className="space-x-2">
                  <Button
                    onClick={() => {
                      window.open(
                        product.productLink,
                        "_blank"
                      );
                    }}
                  >
                    <Link className="mr-1 h-3 w-3" />
                    Get Shadow link
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </>
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
