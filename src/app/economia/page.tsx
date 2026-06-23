'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/BottomNav'
import {
  carregarEconomia,
  type EconomiaSnapshot,
} from '@/lib/mapa'
import {
  formatarReais,
  formatarHoras,
  formatarPorcentagem,
  fraseSaldo,
  fraseVh,
  fraseTr,
  fraseGif,
  zonaFinanceira,
} from '@/lib/calculations'

const ZONA = {
  vermelho: { cor: '#a32d2d', bg: '#f5e0de', label: 'Estancar a sangria' },
  amarelo: { cor: '#8b6f1a', bg: '#fef9e7', label: 'Construir base' },
  azul: { cor: '#1a4a8b', bg: '#e8f0fe', label: 'Ativar patrimônio' },
  verde: { cor: '#2d7a4a', bg: '#e8f4eb', label: 'Independência' },
}

export default function EconomiaPage() {
  const [eco, setEco] = useState<EconomiaSnapshot | null>(null)
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    setEco(carregarEconomia())
    setPronto(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#fdeee4] flex flex-col pb-24">
      <header className="px-6 pt-8 pb-2 max-w-lg mx-auto w-full">
        <span className="font-serif text-[#2d2620] text-xl tracking-wide">
          semear
        </span>
      </header>

      <main className="flex-1 px-6 pt-2 max-w-lg mx-auto w-full">
        <div className="pb-4">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            Sua economia
          </p>
          <h1 className="font-serif text-3xl text-[#2d2620] leading-tight mt-1">
            Onde você<br />
            <span className="font-serif-italic">está hoje.</span>
          </h1>
        </div>

        {!pronto ? null : !eco ? (
          <Vazio />
        ) : (
          <Diagnostico eco={eco} />
        )}
      </main>

      <BottomNav />
    </div>
  )
}

function Vazio() {
  return (
    <div className="bg-white border border-[#e8d8ce] rounded-2xl p-6 text-center space-y-3">
      <p className="text-[#2d2620] font-serif text-xl">Falta o diagnóstico.</p>
      <p className="text-[#8b6f5c] text-sm leading-relaxed">
        Conte sua renda, seu tempo e seus gastos para o Semear revelar o valor
        da sua hora e para onde sua vida está apontada.
      </p>
      <Link href="/onboarding">
        <Button className="w-full h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl mt-1">
          Fazer meu diagnóstico
        </Button>
      </Link>
    </div>
  )
}

function Diagnostico({ eco }: { eco: EconomiaSnapshot }) {
  const zona = ZONA[zonaFinanceira(eco.saldo, eco.gif)]
  const c = eco.m + eco.v + eco.d

  const cards = [
    {
      label: 'Valor da hora',
      valor: formatarReais(eco.vh),
      detalhe: fraseVh(eco.vh),
      visivel: eco.vh > 0,
    },
    {
      label: 'Tempo livre',
      valor: formatarHoras(eco.tr) + '/sem',
      detalhe: fraseTr(eco.tr),
      visivel: true,
      destaque: true,
    },
    {
      label: 'Saldo mensal',
      valor: (eco.saldo >= 0 ? '+' : '') + formatarReais(eco.saldo),
      detalhe: fraseSaldo(eco.saldo, eco.rl),
      visivel: eco.rl > 0,
    },
    {
      label: 'Independência',
      valor: formatarPorcentagem(eco.gif),
      detalhe: fraseGif(eco.gif),
      visivel: true,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Zona */}
      <div
        className="p-4 rounded-xl border"
        style={{ background: zona.bg, borderColor: zona.cor + '50' }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: zona.cor }}
        >
          Fase atual
        </p>
        <p className="font-semibold text-[#2d2620]">{zona.label}</p>
      </div>

      {/* Cards */}
      {cards
        .filter((card) => card.visivel)
        .map((card) => (
          <div
            key={card.label}
            className={`p-4 rounded-xl border bg-white ${card.destaque ? 'border-[#d4807a] shadow-sm' : 'border-[#e8d8ce]'}`}
          >
            <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest mb-1">
              {card.label}
            </p>
            <p className="font-serif text-2xl font-bold text-[#2d2620]">
              {card.valor}
            </p>
            {card.detalhe && (
              <p className="text-[#8b6f5c] text-sm mt-1 leading-relaxed">
                {card.detalhe}
              </p>
            )}
          </div>
        ))}

      {/* 4 caixas */}
      {c > 0 && (
        <div className="bg-white border border-[#e8d8ce] rounded-xl p-4 space-y-2">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            Para onde vai seu dinheiro
          </p>
          {[
            { label: 'Manutenção', valor: eco.m },
            { label: 'Vida', valor: eco.v },
            { label: 'Desperdício', valor: eco.d },
            { label: 'Investimento', valor: eco.i },
          ].map(
            (caixa) =>
              caixa.valor > 0 && (
                <div
                  key={caixa.label}
                  className="flex justify-between items-center"
                >
                  <span className="text-[#2d2620] text-sm">{caixa.label}</span>
                  <span className="text-[#2d2620] text-sm font-semibold">
                    {formatarReais(caixa.valor)}
                  </span>
                </div>
              ),
          )}
        </div>
      )}

      <Link href="/onboarding">
        <Button
          variant="ghost"
          className="w-full h-12 text-[#8b6f5c] hover:text-[#2d2620] hover:bg-[#f5d9c8] rounded-xl"
        >
          Refazer meu diagnóstico
        </Button>
      </Link>
    </div>
  )
}
