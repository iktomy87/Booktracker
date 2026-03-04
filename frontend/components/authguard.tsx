"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Revisamos si el token existe en el almacenamiento del navegador
    const token = localStorage.getItem("token");

    if (!token) {
      // Si no hay token, lo redirigimos al login
      router.push("/pages/login");
    } else {
      // Si hay token, le damos acceso
      setIsAuthorized(true);
    }
  }, [router]);

  // Mientras verifica, mostramos una pantalla de carga para evitar parpadeos
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0ebe3]">
        <div className="text-landing-text-muted font-dm-sans animate-pulse">
          Verificando sesión...
        </div>
      </div>
    );
  }

  // Si está autorizado, renderizamos la página (los 'children')
  return <>{children}</>;
}