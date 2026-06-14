export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fdeee4] flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-sm">
        <span className="font-serif text-[#2d2620] text-2xl">samear</span>
        <h1 className="font-serif text-3xl text-[#2d2620]">
          Dashboard em<br />
          <span className="font-serif-italic">construção.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base">
          O diagnóstico foi gerado. O painel completo vem na próxima sprint.
        </p>
        <a
          href="/onboarding"
          className="inline-block mt-4 text-[#d4807a] text-sm font-semibold hover:underline"
        >
          ← Voltar ao onboarding
        </a>
      </div>
    </div>
  )
}
