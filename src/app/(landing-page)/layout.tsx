import { marketingConfig } from "@/config/marketing";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import WalletButton from "@/components/multi-wallet-btn";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            {/* <Link
              href="/login"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                }),
                "px-4 cursor-pointer text-white text-lg"
              )}
            >
              Get Started!
            </Link> */}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
