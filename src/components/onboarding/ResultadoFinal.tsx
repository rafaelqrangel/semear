'use client'

import { OnboardingData } from '@/types'
import {
  calcularIndicadores,
  formatarReais,
  formatarHoras,
  formatarPorcentagem,
  fraseSaldo,
  fraseVh,
  fraseTr,
  fraseRl,
  fraseGif,
  zonaFinanceira,
} from '@/lib/calculations'
import { Button } from '@/components/ui/button'
import { salvarEconomia } from '@/lib/mapa'
import Link from 'next/link'
import { useEffect } from 'react'

interface Props {
  dados: OnboardingData
  onVoltar: () => void
}

const ZONA_CONFIG = {
  vermelho: { cor: '#a32d2d', bg: '#f5e0de', label: 'Estancar a sangria', emoji: '🔴' },
  amarelo:  { cor: '#8b6f1a', bg: '#fef9e7', label: 'Construir base', emoji: '🟡' },
  azul:     { cor: '#1a4a8b', bg: '#e8f0fe', label: 'Ativar patrimônio', emoji: '🔵' },
  verde:    { cor: '#2d7a4a', bg: '#e8f4eb', label: 'Independência financeira', emoji: '🟢' },
}

export function ResultadoFinal({ dados, onVoltar }: Props) {
  const ind = calcularIndicadores(dados)
  const nome = dados.apelido || dados.nome || 'você'
  const zona = zonaFinanceira(ind.saldo, ind.gif)
  const config = ZONA_CONFIG[zona]

  // Ponte entre as duas frentes: grava a economia doméstica para
  // alimentar a esfera Prosperar no mapa da vida.
  useEffect(() => {
    salvarEconomia({
      vh: ind.vh,
      saldo: ind.saldo,
      gif: ind.gif,
      rl: ind.rl,
      tr: ind.tr,
      m: ind.m,
      v: ind.v,
      d: ind.d,
      i: ind.i,
      atualizadoEm: new Date().toISOString(),
    })
  }, [ind.vh, ind.saldo, ind.gif, ind.rl, ind.tr, ind.m, ind.v, ind.d, ind.i])

  const indicadoresCards = [
    {
      label: 'Receita real',
      valor: formatarReais(ind.rl),
      sub: 'por mês, de verdade',
      detalhe: fraseRl(dados.r, ind.rl),
      visivel: dados.r > 0,
    },
    {
      label: 'Valor da hora',
      valor: formatarReais(ind.vh),
      sub: 'por hora de trabalho',
      detalhe: fraseVh(ind.vh),
      visivel: ind.vh > 0,
    },
    {
      label: 'Tempo livre',
      valor: formatarHoras(ind.tr),
      sub: 'por semana',
      detalhe: fraseTr(ind.tr),
      visivel: dados.tt > 0,
    },
    {
      label: 'Saldo mensal',
      valor: (ind.saldo >= 0 ? '+' : '') + formatarReais(ind.saldo),
      sub: 'por mês',
      detalhe: fraseSaldo(ind.saldo, ind.rl),
      visivel: ind.rl > 0,
      destaque: true,
    },
    {
      label: 'Independência financeira',
      valor: formatarPorcentagem(ind.gif),
      sub: 'das contas cobertas por renda passiva',
      detalhe: fraseGif(ind.gif),
      visivel: true,
    },
  ]

  return (
    <div className="animate-in-up space-y-8">
      {/* Saudação */}
      <div className="space-y-2">
        <p className="text-[#8b6f5c] text-sm font-medium uppercase tracking-widest">Seu diagnóstico</p>
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          {nome.charAt(0).toUpperCase() + nome.slice(1)}, aqui está<br />
          <span className="font-serif-italic">onde você está hoje.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Nenhum julgamento. Apenas a verdade — para que você possa decidir o que muda.
        </p>
      </div>

      {/* Zona financeira */}
      <div
        className="p-4 rounded-xl border flex items-center gap-3"
        style={{ background: config.bg, borderColor: config.cor + '50' }}
      >
        <span className="text-2xl">{config.emoji}</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: config.cor }}>
            Fase atual
          </p>
          <p className="font-semibold text-[#2d2620]">{config.label}</p>
        </div>
      </div>

      {/* Cards de indicadores */}
      <div className="space-y-3">
        {indicadoresCards
          .filter(c => c.visivel)
          .map(card => (
            <div
              key={card.label}
              className={`p-4 rounded-xl border bg-white border-[#e8d8ce] ${card.destaque ? 'shadow-sm' : ''}`}
            >
              <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest mb-1">
                {card.label}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#2d2620]">{card.valor}</span>
                <span className="text-[#8b6f5c] text-sm">{card.sub}</span>
              </div>
              {card.detalhe && (
                <p className="text-[#8b6f5c] text-sm mt-1 leading-relaxed">{card.detalhe}</p>
              )}
            </div>
          ))
        }
      </div>

      {/* Detalhe das 4 caixas */}
      {(ind.m > 0 || ind.v > 0 || ind.d > 0 || ind.i > 0) && (
        <div className="bg-white border border-[#e8d8ce] rounded-xl p-4 space-y-3">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            Para onde vai seu dinheiro
          </p>
          <div className="space-y-2">
            {[
              { label: 'Manutenção', valor: ind.m, sub: 'gastos fixos' },
              { label: 'Vida', valor: ind.v, sub: 'gastos variáveis' },
              { label: 'Desperdício', valor: ind.d, sub: 'para eliminar' },
              { label: 'Investimento', valor: ind.i, sub: 'guardado' },
            ].map(caixa => caixa.valor > 0 && (
              <div key={caixa.label} className="flex justify-between items-center">
                <div>
                  <span className="text-[#2d2620] text-sm font-medium">{caixa.label}</span>
                  <span className="text-[#8b6f5c] text-xs ml-2">{caixa.sub}</span>
                </div>
                <span className="text-[#2d2620] text-sm font-semibold">{formatarReais(caixa.valor)}</span>
              </div>
            ))}
          </div>
          {ind.c > 0 && (
            <div className="flex justify-between items-center pt-2 border-t border-[#e8d8ce]">
              <span className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-wide">Consumo total</span>
              <span className="text-[#2d2620] text-sm font-bold">{formatarReais(ind.c)}</span>
            </div>
          )}
        </div>
      )}

      {/* CTAs */}
      <div className="space-y-3 pt-2">
        <Link href="/mapa">
          <Button className="w-full h-14 text-base font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl">
            Ir para o mapa da minha vida →
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={onVoltar}
          className="w-full h-12 text-[#8b6f5c] hover:text-[#2d2620] hover:bg-[#f5d9c8] rounded-xl"
        >
          ← Revisar respostas
        </Button>
      </div>

      {/* Nota de rodapé */}
      <p className="text-center text-[#8b6f5c] text-xs leading-relaxed pb-4">
        Seus dados ficam salvos localmente por enquanto.<br />
        Em breve: conta, histórico e acompanhamento mensal.
      </p>
    </div>
  )
}
