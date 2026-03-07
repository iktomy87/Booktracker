"use client"

import { cn } from "@/lib/utils";
import { BookOpen, Home, Settings } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: "Inicio", href: "/pages/homepage" },
  { icon: BookOpen, label: "Biblioteca", href: "/pages/library" }, 
  { icon: Settings, label: "Ajustes", href: "/pages/ajustes" },
]

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-24 flex-col items-center border-r-0 bg-background pt-6 lg:flex">
    <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div className="relative h-9 md:h-17 w-10">
            <Image
              src="/gafas.png" 
              alt="Quill Logo"
              fill 
              className="object-contain object-top"
              priority 
            />
          </div>
      </Link>
      <nav className="flex flex-1 flex-col items-center gap-3">
        {navItems.map((item) => {
          // Comprobamos si la ruta actual coincide con el href de este botón
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href} // Le decimos a dónde navegar
              className={cn(
                "flex size-14 items-center justify-center rounded-full transition-colors",
                isActive
                  ? "bg-[#e8e0d0] text-foreground"
                  : "bg-transparent text-muted-foreground hover:bg-[#e8e0d0]/50 hover:text-foreground",
              )}
              aria-label={item.label}
            >
              <item.icon className="size-6" strokeWidth={1.5} />
            </Link>
          );
        })}
      </nav>
    </aside>
  )
}
