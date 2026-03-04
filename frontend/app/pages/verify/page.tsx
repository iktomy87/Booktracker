import { VerifyForm } from "@/components/register/verify-form"
import { RegisterHero } from "@/components/register/register-hero"
import { Suspense } from "react"

export default function VerifyPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <Suspense fallback={<div>Cargando...</div>}>
        <VerifyForm />
      </Suspense>
      <div className="hidden lg:block">
        <RegisterHero />
      </div>
    </div>
  )
}