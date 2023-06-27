"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";

interface DocsPageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function DocsPageHeader({
  heading,
  text,
  className,
  buttonText,
  buttonLink,
  ...props
}: DocsPageHeaderProps) {
  const { push } = useRouter();

  return (
    <>
      <div className="flex justify-between items-baseline">
        <div
          className={cn("space-y-4", className)}
          {...props}
        >
          <h1 className="inline-block font-heading text-4xl lg:text-5xl">
            {heading}
          </h1>
          {text && (
            <p className="text-xl text-muted-foreground">
              {text}
            </p>
          )}
        </div>
        {buttonText && (
          <button
            className={cn(buttonVariants())}
            onClick={() => push(`/${buttonLink}`)}
          >
            {buttonText}
          </button>
        )}
      </div>
      <hr className="my-4" />
    </>
  );
}
