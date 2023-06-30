import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";

const Cancel: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Link
        href="/products"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <h1>
        Forgot to add something to your cart? Shop around
        then come back to pay!
      </h1>
    </div>
  );
};

export default Cancel;
