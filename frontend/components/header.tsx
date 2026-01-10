"use client"

import { Search, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="flex items-center justify-between bg-background px-6 py-4">
      <div className="flex items-center gap-3 lg:hidden">
        <svg
          className="h-10 w-12 text-foreground"
          viewBox="0 0 56 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="14" cy="28" r="10" />
          <circle cx="42" cy="28" r="10" />
          <path d="M24 28h8" />
          <path d="M4 28c0-4 2-10 10-10" />
          <path d="M4 28c-2-6 0-12 4-16" />
          <path d="M52 28c0-4-2-10-10-10" />
          <path d="M52 28c2-6 0-12-4-16" />
        </svg>
      </div>

      <div className="flex flex-1 justify-start px-4 lg:pl-0 lg:pr-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar por título, autor, editorial ..."
            className="w-full rounded-full border-0 bg-transparent py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michelle Yeoh" />
            <AvatarFallback className="bg-[#d4c8b4] text-foreground">MY</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-foreground md:block">Michelle Yeoh</span>
        </div>
        <button
          className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Notificaciones"
        >
          <Bell className="size-5" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
