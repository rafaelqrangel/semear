'use client'

import { OnboardingData } from '@/types'
import { calcularIndicadores, formatarReais } from '@/lib/calculations'
import { Button } from '@/components/ui/button'
import { ListaDespesas } from './ListaDespesas'
import { MoneyInput } from './MoneyInput'

const SUGESTOES_VIDA = ['Mercado', 'Restaurantes', 'Lazer', 'Roupas', 'Passeios', 'Farmácia', 'Transporte', 'Streaming']
const SUGESTOES_DESPERDICIO = ['Juros de cartão', 'Assinaturas esquecidas', 'Compras por impulso', 'Multas', 'Conveniências']

interface Props {
  dados: OnboardingData
  onChange: (parcial: Partial<OnboardingData>) => void
  onAvancar: () => void
  onVoltar: () => void
}

export function Bloco5DespesasVariaveis({ dados, onChange, onAvancar, onVoltar }: Props) {
  const indicadores = calcularIndicadores(dados)

  const saldoPositivo = indicadores.saldo > 0
  const saldoNegativo = indicadores.saldo < 0

  return (
    <div className="animate-in-up space-y-10">
      {/* Título */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          Como você<br />
          <span className="font-serif-italic">escolhe gastar.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Gastos variáveis — o que muda todo mês, por escolha sua.
        </p>
      </div>

      {/* Vida (V) */}
      <div className="space-y-3">
        <div>
          <h3 className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">Vida</h3>
          <p className="text-[#8b6f5c] text-xs mt-0.5">O que você gasta conscientemente para viver bem.</p>
        </div>
        <ListaDespesas
          itens={dados.despesas_variaveis}
          onChange={itens => onChange({ despesas_variaveis: itens })}
          placeholder="Ex: Mercado, lazer..."
          sugestoes={SUGESTOES_VIDA}
        />
      </div>

      {/* Desperdício (D) */}
      <div className="space-y-3">
        <div>
          <h3 className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">Desperdício</h3>
          <p className="text-[#8b6f5c] text-xs mt-0.5">O que você mesmo reconhece como desnecessário. Sem julgamento — só honestidade.</p>
        </div>
        <ListaDespesas
          itens={dados.desperdicio}
          onChange={itens => onChange({ desperdicio: itens })}
          placeholder="Ex: Juros, assinatura esquecida..."
          sugestoes={SUGESTOES_DESPERDICIO}
        />
      </div>

      {/* Investimento (I) */}
      <MoneyInput
        label="Quanto você guarda ou investe por mês?"
        value={dados.investimento_mensal}
        onChange={val => onChange({ investimento_mensal: val })}
        hint="Aportes, previdência, reserva de emergência. Opcional."
      />

      {/* Renda passiva */}
      <MoneyInput
        label="Tem renda passiva? Quanto por mês?"
        value={dados.renda_passiva}
        onChange={val => onChange({ renda_passiva: val })}
        hint="Aluguel, dividendos, rendimentos de investimentos. Opcional."
      />

      {/* Saldo preview */}
      {indicadores.rl > 0 && (
        <div className={`
          p-4 rounded-xl border space-y-1
          ${saldoNegativo
            ? 'bg-[#f5e0de] border-[#a32d2d]'
            : saldoPositivo
              ? 'bg-[#e8f4eb] border-[#6fa572]'
              : 'bg-white border-[#e8d8ce]'
          }
        `}>
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            Saldo do mês
          </p>
          <p className={`
            font-serif text-2xl font-bold
            ${saldoNegativo ? 'text-[#a32d2d]' : saldoPositivo ? 'text-[#2d7a4a]' : 'text-[#2d2620]'}
          `}>
            {indicadores.saldo >= 0 ? '+' : ''}{formatarReais(indicadores.saldo)}
          </p>
          <p className={`text-sm ${saldoNegativo ? 'text-[#a32d2d]' : 'text-[#8b6f5c]'}`}>
            {saldoNegativo
              ? 'Você está gastando mais do que ganha.'
              : saldoPositivo
                ? `Sobram ${formatarReais(indicadores.saldo)} sem destino definido.`
                : 'Tudo alocado.'
            }
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
          className="flex-1 h-14 text-base font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl"
        >
          Ver meu diagnóstico →
        </Button>
      </div>
    </div>
  )
}
