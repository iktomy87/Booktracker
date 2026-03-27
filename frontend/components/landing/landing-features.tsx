import { BookOpen, NotebookPen, Search } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: <BookOpen></BookOpen>,
      title: "Registra cada página",
      desc: "Mide tus avances como prefieras. Con la línea de tiempo automática de Quill, retoma exactamente donde lo dejaste, siempre.",
      highlight: false
    },
    {
      icon: <NotebookPen className="text-white"></NotebookPen>,
      title: "Construye nuevos hábitos",
      desc: "Rachas diarias, metas anuales, y recordatorios que te ayuden a leer un poco más cada día. Pequeños hábitos, grandes resultados.",
      highlight: true
    },
    {
      icon: <Search></Search>,
      title: "Descubre nuevas historias",
      desc: "Recomendaciones personalizadas basadas en tus gustos. Busca por géneros, sentimientos, o lo que tus amigos se encuentran leyendo",
      highlight: false
    }
  ]

  return (
    <section className="py-32 px-8 max-w-[1300px] mx-auto md:px-16 lg:px-20">
      <div className="text-[11px] uppercase tracking-[0.15em] text-landing-red font-medium mb-4">
        Por qué elegir Quill
      </div>
      <h2 className="font-playfair text-[clamp(2rem,3.5vw,3rem)] font-medium text-landing-dark max-w-[500px] leading-tight mb-16">
        Diseñado para tu forma real de leer.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`rounded-[20px] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(42,31,20,0.09)] border ${
              feature.highlight
                ? "bg-landing-dark border-landing-dark"
                : "bg-landing-warm-white border-landing-sand"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 ${
                feature.highlight
                  ? "bg-white/10"
                  : "bg-landing-sand"
              }`}
            >
              {feature.icon}
            </div>
            <h3
              className={`font-playfair text-lg font-medium mb-2.5 ${
                feature.highlight ? "text-landing-warm-white" : "text-landing-dark"
              }`}
            >
              {feature.title}
            </h3>
            <p
              className={`text-sm leading-relaxed font-light ${
                feature.highlight ? "text-landing-warm-white/65" : "text-landing-text-muted"
              }`}
            >
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
