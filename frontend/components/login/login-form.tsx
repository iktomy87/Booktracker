"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" 
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  
  // 1. Estados para los inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // 2. Estados para el proceso de carga y errores
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // 3. Inicializar el enrutador de Next.js
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica en el cliente
    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.text() // Leemos la respuesta de Spring Boot
        
        // Comprobamos si el error es porque falta verificar
        if (errorData.includes("Account not verified")) {
          // Si no está verificado, lo mandamos directo a la página de verificación
          router.push("/pages/verify")
          return 
        }
        
        throw new Error("Credenciales incorrectas.")
      }

      // El resto sigue igual...
      const data = await response.json()
      localStorage.setItem("token", data.token)
      router.push("/pages/homepage") 

    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-landing-warm-white flex items-center justify-center p-12 md:p-16 lg:p-20 overflow-y-auto animate-slide-in h-full">
      <div className="w-full max-w-[400px]">
        <h1 className="font-playfair text-[2.6rem] font-normal text-landing-red leading-tight mb-2">
          Bienvenido de vuelta
        </h1>
        <div className="relative h-px bg-linear-to-r from-landing-tan to-transparent mb-9 after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-1.5 after:h-1.5 after:bg-landing-red after:rounded-full"></div>

        {/* Alerta de Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[0.8rem] text-landing-text-muted mb-1.5 tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-landing-cream border border-landing-sand rounded-lg font-dm-sans text-[0.9rem] text-landing-text outline-none focus:border-landing-red focus:ring-3 focus:ring-landing-red/8 transition-all"
              autoComplete="email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[0.8rem] text-landing-text-muted tracking-wide">
                Contraseña
              </label>
              <Link href="#" className="text-[0.75rem] text-landing-red hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-landing-cream border border-landing-sand rounded-lg font-dm-sans text-[0.9rem] text-landing-text outline-none focus:border-landing-red focus:ring-3 focus:ring-landing-red/8 transition-all pr-11"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-landing-text-muted hover:text-landing-text transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`py-3.5 px-9 rounded-lg font-dm-sans text-[0.92rem] font-medium tracking-wide transition-all relative overflow-hidden ${
                isLoading 
                  ? "bg-landing-tan text-white cursor-not-allowed" 
                  : "bg-landing-red text-white cursor-pointer hover:bg-landing-red-light hover:-translate-y-0.5 active:translate-y-0 after:content-[''] after:absolute after:inset-0 after:bg-linear-to-br after:from-white/15 after:to-transparent"
              }`}
            >
              {isLoading ? "Ingresando..." : "Iniciar sesión"}
            </button>
            <Link href="/pages/register" className="text-landing-red text-[0.88rem] flex items-center gap-1.5 transition-all hover:gap-2.5">
              Crear cuenta &rarr;
            </Link>
          </div>
        </form>

        {/* Botones de Google / Facebook */}
        <div className="flex items-center gap-4 my-7">
          <hr className="flex-1 border-t border-landing-sand" />
          <span className="text-[0.72rem] text-landing-text-muted tracking-widest uppercase">
            o continúa con
          </span>
          <hr className="flex-1 border-t border-landing-sand" />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {/* Mismos botones sociales que en tu register-form */}
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-landing-sand rounded-lg bg-transparent font-dm-sans text-[0.8rem] text-landing-text-muted cursor-pointer transition-all hover:border-landing-tan hover:bg-landing-cream hover:text-landing-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-landing-sand rounded-lg bg-transparent font-dm-sans text-[0.8rem] text-landing-text-muted cursor-pointer transition-all hover:border-landing-tan hover:bg-landing-cream hover:text-landing-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  )
}