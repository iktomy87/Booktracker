import { RegisterHero } from "@/components/register/register-hero"
import { RegisterForm } from "@/components/register/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[52%_48%] font-dm-sans bg-landing-warm-white selection:bg-landing-red/20 overflow-x-hidden">
      <RegisterHero />
      <RegisterForm />
    </div>
  )
}
