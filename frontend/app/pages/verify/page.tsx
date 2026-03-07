import { VerifyForm } from "@/components/register/verify-form"
import { RegisterHero } from "@/components/register/register-hero"
import { Suspense } from "react"

export default function VerifyPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[52%_48%] font-dm-sans bg-landing-warm-white selection:bg-landing-red/20 overflow-x-hidden">
        <RegisterHero />
        <Suspense fallback={<div>Cargando...</div>}>
          <VerifyForm />
        </Suspense>
    </div>
  )
}


