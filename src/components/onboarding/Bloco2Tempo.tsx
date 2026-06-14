'use client'

import { OnboardingData } from '@/types'
import { calcularIndicadores, formatarHoras } from '@/lib/calculations'
import { Button } from '@/components/ui/button'
import { SliderInput } from './SliderInput'

interface Props {
  dados: OnboardingData
  onChange: (parcial: Partial<OnboardingData>) => void
  onAvancar: () => void
  onVoltar: () => void
}

export function Bloco2Tempo({ dados, onChange, onAvancar, onVoltar }: Props) {
  const indicadores = calcularIndicadores(dados)
  const nome = dados.apelido || dados.nome || 'você'
  const podeAvancar = dados.tt > 0

  const tr = indicadores.tr
  const trNegativo = tr < 0

  return (
    <div className="animate-in-up space-y-8">
      {/* Título */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          O tempo é a única coisa<br />
          <span className="font-serif-italic">que não se compra.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Me conta como {nome} distribui as horas do dia.
        </p>
      </div>

      {/* Horas de trabalho */}
      <SliderInput
        label="Quantas horas por semana você trabalha?"
        value={dados.tt}
        min={1}
        max={80}
        step={1}
        unit="h/semana"
        onChange={val => onChange({ tt: val })}
        hint="Inclua horas extras e deslocamento obrigatório."
      />

      {/* Sono */}
      <SliderInput
        label="Quantas horas você dorme por noite?"
        value={dados.tab_sono}
        min={4}
        max={12}
        step={0.5}
        unit="h/noite"
        onChange={val => onChange({ tab_sono: val })}
      />

      {/* Rotina basal */}
      <SliderInput
        label="Horas diárias para alimentação e higiene"
        value={dados.tab_rotina}
        min={0.5}
        max={4}
        step={0.5}
        unit="h/dia"
        onChange={val => onChange({ tab_rotina: val })}
        hint="Refeições, banho, cuidados pessoais."
      />

      {/* Insight de tempo */}
      {podeAvancar && (
        <div className={`
          p-4 rounded-xl border
          ${trNegativo
            ? 'bg-[#f5e0de] border-[#d4807a]'
            : 'bg-white border-[#e8d8ce]'
          }
        `}>
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest mb-1">
            Tempo livre
          </p>
          {trNegativo ? (
            <p className="text-[#a32d2d] font-medium text-base">
              Com esse ritmo, seu trabalho ocupa mais tempo do que você tem disponível. Algo vai ser sacrificado.
            </p>
          ) : (
            <p className="text-[#2d2620] font-medium text-base">
              Você tem <strong>{formatarHoras(tr)}</strong> por semana para viver fora do trabalho.
            </p>
          )}
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
