"use client";

import { DocsPageHeader } from "@/components/page-header";
import { Product } from "@/db/schema";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function ProductDetail() {
  const { publicKey } = useWallet();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (publicKey) {
        const res = await fetch(
          `/api/products?walletAddress=${publicKey.toString()}`
        );
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
        <>
          <p>
            No products published. Craete a product first!
          </p>
        </>
      )}
    </div>
  );
}
