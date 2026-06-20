'use client'

import {
  ESFERAS,
  CENTRO,
  RAIO_ESFERA,
  saudeEsfera,
  type Objetivo,
  type Selecao,
} from '@/lib/mapa'

interface Props {
  objetivos: Objetivo[]
  selecao: Selecao | null
  onSelecionar: (s: Selecao) => void
}

/**
 * O Mapa da Vida — três esferas que se cruzam, com a Intenção no
 * núcleo onde todas se sobrepõem. Responsivo (escala pelo viewBox),
 * interativo (toque numa esfera ou no centro para entrar).
 */
export function MapaVida({ objetivos, selecao, onSelecionar }: Props) {
  const objetivosCentro = objetivos.filter((o) => o.esferas.length >= 2).length

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md mx-auto block select-none"
      role="img"
      aria-label="Mapa da vida: as esferas Ser, Conviver e Prosperar ao redor da Intenção"
    >
      {/* Esferas */}
      {ESFERAS.map((e) => {
        const saude = saudeEsfera(e.id, objetivos)
        const opacidade = 0.2 + saude * 0.5
        const ativa = selecao === e.id
        return (
          <g
            key={e.id}
            onClick={() => onSelecionar(e.id)}
            className="cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label={`Esfera ${e.nome}`}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault()
                onSelecionar(e.id)
              }
            }}
          >
            <circle
              cx={e.cx}
              cy={e.cy}
              r={RAIO_ESFERA}
              fill={e.cor}
              fillOpacity={opacidade}
              stroke={e.cor}
              strokeOpacity={ativa ? 0.95 : 0.4}
              strokeWidth={ativa ? 3 : 1.5}
              className="transition-all duration-300"
              style={{ mixBlendMode: 'multiply' }}
            />
          </g>
        )
      })}

      {/* Rótulos das esferas */}
      {ESFERAS.map((e) => {
        const count = objetivos.filter((o) => o.esferas.includes(e.id)).length
        return (
          <g
            key={`label-${e.id}`}
            onClick={() => onSelecionar(e.id)}
            className="cursor-pointer pointer-events-auto"
          >
            <text
              x={e.lx}
              y={e.ly}
              textAnchor="middle"
              className="font-serif"
              style={{ fontSize: 19, fill: '#2d2620' }}
            >
              {e.nome}
            </text>
            {count > 0 && (
              <text
                x={e.lx}
                y={e.ly + 17}
                textAnchor="middle"
                style={{ fontSize: 10.5, fill: '#8b6f5c', fontWeight: 600 }}
              >
                {count} {count === 1 ? 'intenção' : 'intenções'}
              </text>
            )}
          </g>
        )
      })}

      {/* Anel de pulso — o "big bang" do centro */}
      <circle
        cx={CENTRO.cx}
        cy={CENTRO.cy}
        r={CENTRO.r}
        fill="none"
        stroke="#d4807a"
        strokeWidth={1.5}
        className="mapa-pulso"
      />

      {/* Núcleo — a Intenção */}
      <g
        onClick={(ev) => {
          ev.stopPropagation()
          onSelecionar('intencao')
        }}
        className="cursor-pointer"
        tabIndex={0}
        role="button"
        aria-label="Intenção — o centro"
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault()
            onSelecionar('intencao')
          }
        }}
      >
        <circle
          cx={CENTRO.cx}
          cy={CENTRO.cy}
          r={CENTRO.r}
          fill="#fffaf6"
          stroke="#2d2620"
          strokeOpacity={selecao === 'intencao' ? 0.9 : 0.28}
          strokeWidth={selecao === 'intencao' ? 3 : 1.5}
          className="transition-all duration-300"
        />
        <text
          x={CENTRO.cx}
          y={CENTRO.cy - 2}
          textAnchor="middle"
          className="font-serif"
          style={{ fontSize: 16, fill: '#2d2620' }}
        >
          Intenção
        </text>
        <text
          x={CENTRO.cx}
          y={CENTRO.cy + 15}
          textAnchor="middle"
          style={{ fontSize: 10, fill: '#8b6f5c', fontWeight: 600 }}
        >
          {objetivosCentro > 0
            ? `${objetivosCentro} no centro`
            : 'comece aqui'}
        </text>
      </g>
    </svg>
  )
}
