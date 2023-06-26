import * as React from "react";
import Link from "next/link";

import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({
  items,
  children,
}: MobileNavProps) {
  return;
}
