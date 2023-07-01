import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletWrapper } from "@/context/walletContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
        suppressHydrationWarning
      >
        <WalletWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}

            <Toaster />
          </ThemeProvider>
        </WalletWrapper>
      </body>
    </html>
  );
}
