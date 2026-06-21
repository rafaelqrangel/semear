'use client'

import {
  SENTIMENTOS,
  nivelDaNota,
  rotuloDoNivel,
  descricaoDoNivel,
} from '@/lib/mapa'

interface Props {
  cor: string
  nota: number
  onMudar: (n: number) => void
  tamanho?: 'md' | 'lg'
}

/**
 * Barra de sentimento — a pessoa avalia uma faceta por sensação, com
 * palavras, nunca por número. Internamente devolve uma nota (0..10)
 * que preenche a roda.
 */
export function BarraSentimento({ cor, nota, onMudar, tamanho = 'md' }: Props) {
  const nivel = nivelDaNota(nota)
  const altura = tamanho === 'lg' ? 'h-7' : 'h-5'
  const fonte = tamanho === 'lg' ? 'text-2xl' : 'text-xl'

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5">
        {SENTIMENTOS.map((s) => {
          const aceso = nivel > 0 && s.nivel <= nivel
          return (
            <button
              key={s.nivel}
              onClick={() => onMudar(s.nota)}
              aria-label={s.rotulo}
              aria-pressed={s.nivel === nivel}
              className={`flex-1 ${altura} rounded-full transition-colors duration-200`}
              style={{
                background: aceso ? cor : '#f5d9c8',
                opacity: aceso ? 0.55 + (s.nivel / 5) * 0.45 : 1,
              }}
            />
          )
        })}
      </div>
      <div>
        <p
          className={`font-serif ${fonte}`}
          style={{ color: nivel > 0 ? cor : '#8b6f5c' }}
        >
          {nivel > 0 ? rotuloDoNivel(nivel) : 'Toque para avaliar'}
        </p>
        {nivel > 0 && (
          <p className="text-sm text-[#8b6f5c] leading-relaxed mt-1">
            {descricaoDoNivel(nivel)}
          </p>
        )}
      </div>
    </div>
  )
}
