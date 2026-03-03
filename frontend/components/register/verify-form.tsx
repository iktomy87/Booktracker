"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function VerifyForm() {
  const router = useRouter()
  
  // Estados para los inputs
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  
  // Estados de interfaz
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  // Función para verificar el código
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (!email || !verificationCode) {
      setError("Por favor, ingresa tu email y el código de verificación.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8080/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          verificationCode: verificationCode
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(errorData || "Código incorrecto o expirado.")
      }

      // Si es exitoso, redirigimos al login para que entre con su cuenta verificada
      router.push("/pages/login?verified=true")

    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para reenviar el correo
  const handleResendCode = async () => {
    if (!email) {
      setError("Ingresa tu email primero para poder reenviarte el código.")
      return
    }
    
    setError("")
    setMessage("")
    setIsResending(true)

    try {
      // Nota: El backend espera un RequestParam, por lo que lo pasamos en la URL
      const response = await fetch(`http://localhost:8080/auth/resend?email=${encodeURIComponent(email)}`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("No se pudo reenviar el código. Verifica que el correo sea correcto.")
      }

      setMessage("¡Un nuevo código ha sido enviado a tu correo!")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="bg-landing-warm-white flex items-center justify-center p-12 md:p-16 lg:p-20 overflow-y-auto animate-slide-in h-full">
      <div className="w-full max-w-[400px]">
        <h1 className="font-playfair text-[2.6rem] font-normal text-landing-red leading-tight mb-2">
          Verifica tu cuenta
        </h1>
        <div className="relative h-px bg-linear-to-r from-landing-tan to-transparent mb-6 after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-1.5 after:h-1.5 after:bg-landing-red after:rounded-full"></div>
        
        <p className="text-landing-text-muted text-sm mb-8 font-light leading-relaxed">
          Hemos enviado un código de verificación a tu correo electrónico. Ingrésalo a continuación para activar tu cuenta.
        </p>

        {/* Alertas */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleVerify}>
          <div>
            <label className="block text-[0.8rem] text-landing-text-muted mb-1.5 tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full p-3 bg-landing-cream border border-landing-sand rounded-lg font-dm-sans text-[0.9rem] text-landing-text outline-none focus:border-landing-red focus:ring-3 focus:ring-landing-red/8 transition-all"
            />
          </div>

          <div>
            <label className="block text-[0.8rem] text-landing-text-muted mb-1.5 tracking-wide">
              Código de verificación
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Ej: 123456"
              maxLength={6} // Asumiendo que es un código numérico estándar
              className="w-full p-3 bg-landing-cream border border-landing-sand rounded-lg font-dm-sans text-[1.2rem] tracking-[0.5em] text-center text-landing-text outline-none focus:border-landing-red focus:ring-3 focus:ring-landing-red/8 transition-all uppercase"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`py-3.5 px-9 rounded-lg font-dm-sans text-[0.92rem] font-medium tracking-wide transition-all relative overflow-hidden ${
                isLoading 
                  ? "bg-landing-tan text-white cursor-not-allowed" 
                  : "bg-landing-red text-white cursor-pointer hover:bg-landing-red-light hover:-translate-y-0.5 active:translate-y-0 after:content-[''] after:absolute after:inset-0 after:bg-linear-to-br after:from-white/15 after:to-transparent"
              }`}
            >
              {isLoading ? "Verificando..." : "Validar código"}
            </button>
            
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-landing-text-muted text-[0.85rem] hover:text-landing-red transition-colors w-fit mx-auto"
            >
              {isResending ? "Enviando..." : "¿No recibiste el código? Reenviar"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link href="/pages/login" className="text-landing-red text-[0.88rem] flex items-center justify-center gap-1.5 transition-all hover:gap-2.5">
            &larr; Volver a Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}