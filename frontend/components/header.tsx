"use client"

import { Search, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react"
import { fetchCurrentUser } from "@/lib/api"

export function Header() {
  const [username, setUsername] = useState("Cargando...");
  const [initials, setInitials] = useState("");
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await fetchCurrentUser(token);
          
          if (user && user.displayName) {
            setUsername(user.displayName);
            setInitials(user.displayName.substring(0, 2).toUpperCase());
          } else if (user && user.username) {
            // Fallback por si acaso
            setUsername(user.username);
            setInitials(user.username.substring(0, 2).toUpperCase());
          }
        } else {
          setUsername("Usuario Invitado");
        }
      } catch (error) {
        console.error("No se pudo cargar la información del usuario", error);
        setUsername("Usuario");
      }
    };

    loadUser();
  }, []);
  return (
    <header className="flex items-center justify-between bg-background px-6 py-4">
      <div className="flex items-center gap-3 lg:hidden">
        <div className="relative h-9 md:h-17 w-10">
            <Image
              src="/gafas.png" 
              alt="Quill Logo"
              fill 
              className="object-contain object-top"
              priority 
            />
          </div>
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
            <AvatarImage src="" alt={username} />
            <AvatarFallback className="bg-[#d4c8b4] text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-foreground md:block">
            {username}
          </span>
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
