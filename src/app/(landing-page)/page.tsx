import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            A crypto native alternative to Gumroad.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Everything you Control. Literally.
          </p>
          <div className="space-x-4">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Connect Wallet
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {/* TODO: Explain the features here. */}
            Describe what can be done by the project here
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[100px] flex-col justify-between rounded-md p-6">
              <div className="flex gap-2">
                <Icons.logo />
                <h3 className="font-bold">Some feature.</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Explain that feature.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[100px] flex-col justify-between rounded-md p-6">
              <div className="flex gap-2">
                <Icons.logo />
                <h3 className="font-bold">Some feature.</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Explain that feature.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[100px] flex-col justify-between rounded-md p-6">
              <div className="flex gap-2">
                <Icons.logo />
                <h3 className="font-bold">Some feature.</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Explain that feature.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="open-source"
        className="container py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Gatelinks is open source and powered by open
            source software. <br /> The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section>
    </>
  );
}
