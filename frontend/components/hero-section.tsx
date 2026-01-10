export function HeroSection() {
  const currentPage = 120
  const totalPages = 471
  const progressPercentage = Math.round((currentPage / totalPages) * 100)

  return (
    <div className="overflow-hidden rounded-3xl bg-[#d4c8b4]">
      <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:gap-10 md:p-10">
        <div className="mx-auto flex-shrink-0 md:mx-0">
          <img
            src="/placeholder.svg?height=260&width=170"
            alt="Cien Años de Soledad"
            className="h-[260px] w-[170px] rounded-lg object-cover shadow-xl"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center space-y-6">
          <div>
            <h2 className="font-serif text-3xl font-medium text-[#4a4035] md:text-4xl">Continúa tu lectura</h2>
            <p className="mt-3 text-lg text-[#6b5d4d]">¡Vas por buen camino! Ya estás casi a la mitad.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6b5d4d]">
                Página {currentPage} de {totalPages}
              </span>
              <span className="text-lg font-medium text-[#4a4035]">{progressPercentage}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#e8b4a8]">
              <div
                className="h-full rounded-full bg-[#c45c4c] transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
