import { DocsPageHeader } from "@/components/page-header";
import { getAllProducts } from "@/db/helpers";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { use } from "react";

export default async function TrialPage() {
  const rows = await getAllProducts();

  return (
    <div className="container">
      <DocsPageHeader
        heading="Your Products"
        buttonText="Create Product"
        buttonLink="create-product"
      />

      {rows?.length ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {rows.map((product: any) => (
            <article
              key={JSON.stringify(product).slice(4, 5)}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {JSON.stringify(product).slice(0, 10)}
                  </h2>
                  {product && (
                    <p className="text-muted-foreground">
                      {product}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href={product.slice(-5, -1)}
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
