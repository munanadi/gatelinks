"use client";

import { DocsPageHeader } from "@/components/page-header";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import { Product } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
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
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {products.map((product: Product) => (
            <article
              key={product.productHash}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {product.name}
                  </h2>
                  {product && (
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href={`products/${product.productHash}`}
                className="absolute inset-0"
              >
                <span className="sr-only">View</span>
              </Link>
              <div className="space-y-2">
                {new Date(
                  product.createdDate
                ).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
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
