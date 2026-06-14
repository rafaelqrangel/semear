'use client'

import { OnboardingData } from '@/types'
import { calcularIndicadores, formatarReais, fraseRl, fraseVh } from '@/lib/calculations'
import { Button } from '@/components/ui/button'
import { MoneyInput } from './MoneyInput'

interface Props {
  dados: OnboardingData
  onChange: (parcial: Partial<OnboardingData>) => void
  onAvancar: () => void
  onVoltar: () => void
}

export function Bloco3Recursos({ dados, onChange, onAvancar, onVoltar }: Props) {
  const indicadores = calcularIndicadores(dados)
  const podeAvancar = dados.r > 0

  const mostrarChoque = dados.r > 0 && dados.ra > 0
  const mostrarVh = dados.tt > 0 && dados.r > 0

  return (
    <div className="animate-in-up space-y-8">
      {/* Título */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          O que entra<br />
          <span className="font-serif-italic">de verdade.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Quanto você ganha — e quanto fica com você de fato.
        </p>
      </div>

      {/* Receita bruta */}
      <MoneyInput
        label="Receita bruta mensal"
        value={dados.r}
        onChange={val => onChange({ r: val })}
        hint="Salário, freelas, qualquer fonte de renda. Tudo que entra."
      />

      {/* Atrito */}
      <MoneyInput
        label="Impostos e custos para trabalhar"
        value={dados.ra}
        onChange={val => onChange({ ra: val })}
        hint="IR, INSS, transporte obrigatório, plano de saúde coorporativo. O que sai antes de chegar a você."
        highlight={dados.ra > 0}
      />

      {/* Choque de realidade */}
      {mostrarChoque && (
        <div className="p-4 rounded-xl bg-[#f5e0de] border border-[#d4807a] space-y-1">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            Sua receita real
          </p>
          <p className="text-[#2d2620] font-medium text-base">
            {fraseRl(dados.r, indicadores.rl)}
          </p>
          <p className="text-[#a32d2d] font-bold text-2xl font-serif">
            {formatarReais(indicadores.rl)}<span className="text-base font-normal text-[#8b6f5c]">/mês</span>
          </p>
        </div>
      )}

      {/* Valor da hora */}
      {mostrarVh && (
        <div className="p-4 rounded-xl bg-white border border-[#e8d8ce]">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest mb-1">
            Valor da hora
          </p>
          <p className="text-[#2d2620] text-base">
            {fraseVh(indicadores.vh)}
          </p>
          <p className="text-[#d4807a] font-bold text-2xl font-serif mt-1">
            {formatarReais(indicadores.vh)}<span className="text-base font-normal text-[#8b6f5c]">/hora</span>
          </p>
        </div>
      )}

      {/* Navegação */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onVoltar}
          className="h-14 px-6 border-[#e8d8ce] text-[#8b6f5c] rounded-xl hover:bg-[#f5d9c8]"
        >
          ←
        </Button>
        <Button
          onClick={onAvancar}
          disabled={!podeAvancar}
          className="flex-1 h-14 text-base font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl disabled:opacity-40"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}
