"use client";

import { DocsPageHeader } from "@/components/page-header";
import { Product } from "@/db/schema";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function DashboardPage() {
  const { publicKey } = useWallet();

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

        console.log(purchaseData);

        const porductHashes = purchaseData.map(
          (prd: Product) => prd.productHash
        );

        const productDetail = await fetch(
          `/api/product/${porductHashes[0]}`
        );
        const prodcutData = await productDetail.json();

        setProducts(prodcutData.product);
      }
    };

    fetchData();
  }, []);

  console.log(products);

  return (
    <div className="container">
      <DocsPageHeader heading="Your Purchases" />

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
                href={`products/${product.productHash}?bought=true`}
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
          <p>Go buy your first Product!</p>
        </>
      )}
    </div>
  );
}