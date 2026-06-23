'use client'

import { OnboardingData } from '@/types'
import { calcularIndicadores, formatarReais } from '@/lib/calculations'
import { Button } from '@/components/ui/button'
import { ListaDespesas } from './ListaDespesas'

const SUGESTOES = ['Moradia', 'Luz', 'Água', 'Gás', 'Internet', 'Escola', 'Plano de saúde', 'Condomínio', 'Financiamento', 'IPTU']

interface Props {
  dados: OnboardingData
  onChange: (parcial: Partial<OnboardingData>) => void
  onAvancar: () => void
  onVoltar: () => void
}

export function Bloco4DespesasFixas({ dados, onChange, onAvancar, onVoltar }: Props) {
  const indicadores = calcularIndicadores(dados)
  const m = indicadores.m
  const rl = indicadores.rl

  // Alerta se M > 70% de Rl
  const proporcao = rl > 0 ? (m / rl) * 100 : 0
  const alertaAlto = proporcao > 70 && m > 0

  return (
    <div className="animate-in-up space-y-8">
      {/* Título */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          O que mantém<br />
          <span className="font-serif-italic">sua vida de pé.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Manutenção: as contas que sustentam a sua casa e a sua estrutura —
          moradia, luz, água, escola, planos. Mesmo as que variam (luz, gás)
          entram aqui: o que importa é o propósito, manter a vida funcionando.
        </p>
      </div>

      {/* Orientação: guarda-chuva, não meio de pagamento */}
      <div className="bg-white border border-[#e8d8ce] rounded-xl p-3">
        <p className="text-[#8b6f5c] text-sm leading-relaxed">
          Some por <strong className="text-[#2d2620]">categoria</strong> (a
          conta), não pelo meio de pagamento. Tanto faz se você paga no cartão,
          no pix ou no débito — o que conta é o destino.
        </p>
      </div>

      {/* Lista de despesas fixas */}
      <ListaDespesas
        itens={dados.despesas_fixas}
        onChange={itens => onChange({ despesas_fixas: itens })}
        placeholder="Ex: Moradia, luz, escola..."
        sugestoes={SUGESTOES}
      />

      {/* Insight */}
      {m > 0 && rl > 0 && (
        <div className={`
          p-4 rounded-xl border space-y-1
          ${alertaAlto ? 'bg-[#f5e0de] border-[#d4807a]' : 'bg-white border-[#e8d8ce]'}
        `}>
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            Manutenção
          </p>
          <p className={`text-base font-medium ${alertaAlto ? 'text-[#a32d2d]' : 'text-[#2d2620]'}`}>
            {alertaAlto
              ? `A sua manutenção consome ${Math.round(proporcao)}% da sua receita real. Pouco espaço para respirar.`
              : `${Math.round(proporcao)}% da sua receita real vai para a manutenção.`
            }
          </p>
          <p className="font-serif text-2xl font-bold text-[#2d2620]">
            {formatarReais(m)}<span className="text-base font-sans font-normal text-[#8b6f5c]">/mês</span>
          </p>
        </div>
      )}

      {/* Pular */}
      {dados.despesas_fixas.length === 0 && (
        <p className="text-center text-[#8b6f5c] text-sm">
          Sem contas de manutenção por enquanto? Tudo bem — dá para adicionar depois.
        </p>
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
          className="flex-1 h-14 text-base font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}
