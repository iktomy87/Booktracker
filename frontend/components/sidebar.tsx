"use client"

import { cn } from "@/lib/utils";
import { BookOpen, Home, Settings } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { icon: Home, label: "Inicio", active: true },
  { icon: BookOpen, label: "Biblioteca", active: false },
  { icon: Settings, label: "Ajustes", active: false },
]

export function Sidebar() {
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
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex size-14 items-center justify-center rounded-full transition-colors",
              item.active
                ? "bg-[#e8e0d0] text-foreground"
                : "bg-transparent text-muted-foreground hover:bg-[#e8e0d0]/50 hover:text-foreground",
            )}
            aria-label={item.label}
          >
            <item.icon className="size-6" strokeWidth={1.5} />
          </button>
        ))}
      </nav>
    </aside>
  )
}
