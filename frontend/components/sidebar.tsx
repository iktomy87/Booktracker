"use client"

import { Home, BookOpen, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Inicio", active: true },
  { icon: BookOpen, label: "Biblioteca", active: false },
  { icon: Settings, label: "Ajustes", active: false },
]

export function Sidebar() {
  return (
    <aside className="hidden w-24 flex-col items-center border-r-0 bg-background pt-6 lg:flex">
      <div className="mb-8">
        <svg
          className="h-12 w-14 text-foreground"
          viewBox="0 0 56 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left lens */}
          <circle cx="14" cy="28" r="10" />
          {/* Right lens */}
          <circle cx="42" cy="28" r="10" />
          {/* Bridge */}
          <path d="M24 28h8" />
          {/* Left temple curl */}
          <path d="M4 28c0-4 2-10 10-10" />
          <path d="M4 28c-2-6 0-12 4-16" />
          {/* Right temple curl */}
          <path d="M52 28c0-4-2-10-10-10" />
          <path d="M52 28c2-6 0-12-4-16" />
        </svg>
      </div>
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
