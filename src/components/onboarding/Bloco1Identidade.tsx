'use client'

import { OnboardingData } from '@/types'
import { Button } from '@/components/ui/button'

const PERFIS = [
  { valor: 'clt', label: 'CLT', descricao: 'Empregado com carteira' },
  { valor: 'pj', label: 'PJ', descricao: 'Pessoa jurídica' },
  { valor: 'autonomo', label: 'Autônomo', descricao: 'Freelancer ou liberal' },
  { valor: 'empresario', label: 'Empresário', descricao: 'Sócio ou dono de negócio' },
] as const

interface Props {
  dados: OnboardingData
  onChange: (parcial: Partial<OnboardingData>) => void
  onAvancar: () => void
}

export function Bloco1Identidade({ dados, onChange, onAvancar }: Props) {
  const podeAvancar = dados.nome.trim().length >= 2

  return (
    <div className="animate-in-up space-y-8">
      {/* Título */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          Vamos começar pelo começo.
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Me conta um pouco sobre você. Isso me ajuda a personalizar tudo.
        </p>
      </div>

      {/* Nome */}
      <div className="space-y-2">
        <label className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
          Seu nome
        </label>
        <input
          type="text"
          placeholder="Como você se chama?"
          value={dados.nome}
          onChange={e => onChange({ nome: e.target.value })}
          className="w-full bg-white border border-[#e8d8ce] rounded-xl px-4 py-3 text-[#2d2620] text-base placeholder:text-[#ccc] focus:outline-none focus:border-[#d4807a] transition-colors"
          autoFocus
        />
      </div>

      {/* Apelido (opcional) */}
      <div className="space-y-2">
        <label className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
          Como prefere ser chamado? <span className="normal-case font-normal">(opcional)</span>
        </label>
        <input
          type="text"
          placeholder="Apelido ou nome curto"
          value={dados.apelido}
          onChange={e => onChange({ apelido: e.target.value })}
          className="w-full bg-white border border-[#e8d8ce] rounded-xl px-4 py-3 text-[#2d2620] text-base placeholder:text-[#ccc] focus:outline-none focus:border-[#d4807a] transition-colors"
        />
      </div>

      {/* Perfil profissional */}
      <div className="space-y-3">
        <label className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
          Situação profissional
        </label>
        <div className="grid grid-cols-2 gap-3">
          {PERFIS.map(p => (
            <button
              key={p.valor}
              type="button"
              onClick={() => onChange({ perfil: p.valor })}
              className={`
                flex flex-col items-start p-4 rounded-xl border text-left transition-all
                ${dados.perfil === p.valor
                  ? 'bg-[#d4807a] border-[#d4807a] text-white'
                  : 'bg-white border-[#e8d8ce] text-[#2d2620] hover:border-[#d4807a]'
                }
              `}
            >
              <span className="font-semibold text-sm">{p.label}</span>
              <span className={`text-xs mt-0.5 ${dados.perfil === p.valor ? 'text-white/80' : 'text-[#8b6f5c]'}`}>
                {p.descricao}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Botão */}
      <Button
        onClick={onAvancar}
        disabled={!podeAvancar}
        className="w-full h-14 text-base font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl disabled:opacity-40"
      >
        Continuar →
      </Button>
    </div>
  )
}
