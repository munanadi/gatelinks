import { profileConfig } from "@/config/profile";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

interface DiscoverLayout {
  children: React.ReactNode;
}

export default async function DiscoerLayout({
  children,
}: DiscoverLayout) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={profileConfig.mainNav} />
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
