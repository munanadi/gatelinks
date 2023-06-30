// "use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  // const { push } = useRouter();

  const productHash = params.productId;

  return (
    <section className="container flex flex-col gap-6 py-8 ">
      <Image
        alt="Image describing the product"
        src="https://shdw-drive.genesysgo.net/F3CMo1VEiLtpohhWceZ7mpdmZJvTvVW8drMwrQugD1oE/dp.png"
        className="w-[250px] block"
        width={250}
        height={330}
      />
      <div className="mx-auto flex w-full flex-col gap-4">
        <h2 className="font-heading text-6xl leading-[1.1] ">
          Product Name: {productHash}
        </h2>
        <p className="max-w-[85%] text-muted-foreground text-lg ">
          This will describe {productHash} here.
        </p>
        <div className="gap-10 rounded-lg border p-10 ">
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">
                0.01 SOL
              </h4>
            </div>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Buy!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
