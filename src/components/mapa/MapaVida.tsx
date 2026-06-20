'use client'

import {
  FACETAS,
  pontuacaoDe,
  type MapaState,
  type Selecao,
} from '@/lib/mapa'

interface Props {
  pontuacoes: MapaState['pontuacoes']
  objetivos: MapaState['objetivos']
  selecao: Selecao | null
  onSelecionar: (s: Selecao) => void
}

// Geometria da roda
const CX = 200
const CY = 200
const R = 150 // raio externo
const RH = 46 // raio do eixo (Intenção)
const SETOR = 360 / FACETAS.length // 45°
const LABEL_R = 172

function polar(r: number, graus: number): [number, number] {
  const a = (graus * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

/** Setor anular entre os raios r0 e r1, do ângulo a0 ao a1 (graus). */
function setorAnular(
  r0: number,
  r1: number,
  a0: number,
  a1: number,
): string {
  const [x0i, y0i] = polar(r0, a0)
  const [x0o, y0o] = polar(r1, a0)
  const [x1o, y1o] = polar(r1, a1)
  const [x1i, y1i] = polar(r0, a1)
  const grande = a1 - a0 > 180 ? 1 : 0
  return [
    `M ${x0i} ${y0i}`,
    `L ${x0o} ${y0o}`,
    `A ${r1} ${r1} 0 ${grande} 1 ${x1o} ${y1o}`,
    `L ${x1i} ${y1i}`,
    `A ${r0} ${r0} 0 ${grande} 0 ${x0i} ${y0i}`,
    'Z',
  ].join(' ')
}

/**
 * A Roda da Vida — oito facetas concretas como raios, cada uma
 * pontuada de 0 a 10 (preenchimento do eixo para fora). No centro,
 * a Intenção: o eixo de onde tudo irradia. Responsiva e interativa.
 */
export function MapaVida({ pontuacoes, objetivos, selecao, onSelecionar }: Props) {
  const objetivosCentro = objetivos.length

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md mx-auto block select-none overflow-visible"
      role="img"
      aria-label="Roda da vida com oito facetas ao redor da Intenção"
    >
      {/* Anéis de grade */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((k) => (
        <circle
          key={k}
          cx={CX}
          cy={CY}
          r={RH + (R - RH) * k}
          fill="none"
          stroke="#e8d8ce"
          strokeWidth={1}
        />
      ))}

      {/* Setores preenchidos pela pontuação */}
      {FACETAS.map((f, i) => {
        const a0 = -90 + i * SETOR
        const a1 = a0 + SETOR
        const nota = pontuacaoDe(f.id, pontuacoes)
        const r1 = RH + ((R - RH) * nota) / 10
        const ativa = selecao === f.id
        return (
          <g key={f.id}>
            {nota > 0 && (
              <path
                d={setorAnular(RH, r1, a0 + 1, a1 - 1)}
                fill={f.cor}
                fillOpacity={ativa ? 0.95 : 0.78}
                className="transition-all duration-300"
              />
            )}
          </g>
        )
      })}

      {/* Linhas radiais (raios) */}
      {FACETAS.map((f, i) => {
        const a = -90 + i * SETOR
        const [x0, y0] = polar(RH, a)
        const [x1, y1] = polar(R, a)
        return (
          <line
            key={`raio-${f.id}`}
            x1={x0}
            y1={y0}
            x2={x1}
            y2={y1}
            stroke="#e8d8ce"
            strokeWidth={1}
          />
        )
      })}

      {/* Alvos de clique (setor inteiro, transparente) + destaque */}
      {FACETAS.map((f, i) => {
        const a0 = -90 + i * SETOR
        const a1 = a0 + SETOR
        const ativa = selecao === f.id
        return (
          <path
            key={`alvo-${f.id}`}
            d={setorAnular(RH, R, a0, a1)}
            fill="transparent"
            stroke={ativa ? f.cor : 'transparent'}
            strokeWidth={ativa ? 2.5 : 0}
            className="cursor-pointer transition-all duration-200 hover:fill-[#2d262008]"
            role="button"
            tabIndex={0}
            aria-label={`Faceta ${f.nomeCompleto}`}
            onClick={() => onSelecionar(f.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelecionar(f.id)
              }
            }}
          />
        )
      })}

      {/* Rótulos das facetas */}
      {FACETAS.map((f, i) => {
        const am = -90 + i * SETOR + SETOR / 2
        const [lx, ly] = polar(LABEL_R, am)
        const c = Math.cos((am * Math.PI) / 180)
        const anchor = c > 0.3 ? 'start' : c < -0.3 ? 'end' : 'middle'
        return (
          <g
            key={`label-${f.id}`}
            className="cursor-pointer"
            onClick={() => onSelecionar(f.id)}
          >
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="font-serif"
              style={{ fontSize: 13, fill: '#2d2620' }}
            >
              {f.nome}
            </text>
          </g>
        )
      })}

      {/* Anel de pulso — o "big bang" do eixo */}
      <circle
        cx={CX}
        cy={CY}
        r={RH}
        fill="none"
        stroke="#d4807a"
        strokeWidth={1.5}
        className="mapa-pulso"
      />

      {/* Eixo — a Intenção */}
      <g
        onClick={(e) => {
          e.stopPropagation()
          onSelecionar('intencao')
        }}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Intenção — o eixo"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelecionar('intencao')
          }
        }}
      >
        <circle
          cx={CX}
          cy={CY}
          r={RH}
          fill="#fffaf6"
          stroke="#2d2620"
          strokeOpacity={selecao === 'intencao' ? 0.9 : 0.28}
          strokeWidth={selecao === 'intencao' ? 3 : 1.5}
          className="transition-all duration-300"
        />
        <text
          x={CX}
          y={CY - 3}
          textAnchor="middle"
          className="font-serif"
          style={{ fontSize: 15, fill: '#2d2620' }}
        >
          Intenção
        </text>
        <text
          x={CX}
          y={CY + 13}
          textAnchor="middle"
          style={{ fontSize: 9.5, fill: '#8b6f5c', fontWeight: 600 }}
        >
          {objetivosCentro > 0
            ? `${objetivosCentro} ${objetivosCentro === 1 ? 'intenção' : 'intenções'}`
            : 'comece aqui'}
        </text>
      </g>
    </svg>
  )
}
