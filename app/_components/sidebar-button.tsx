"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

interface SidebarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SidebarButton = async ({ href, children }: SidebarButtonProps) => {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname === `${href}` ? "destructive" : "ghost"}
      className="justify-start gap-1 [&_svg]:size-auto"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
