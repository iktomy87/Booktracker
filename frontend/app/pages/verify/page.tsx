import { VerifyForm } from "@/components/register/verify-form"
import { RegisterHero } from "@/components/register/register-hero"

export default function VerifyPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <VerifyForm />
      <div className="hidden lg:block">
        <RegisterHero />
      </div>
    </div>
  )
}