'use client'

import { useState } from 'react'
import { OnboardingData, FonteReceita, TipoFonte } from '@/types'
import {
  calcularIndicadores,
  formatarReais,
  fraseRl,
  fraseVh,
} from '@/lib/calculations'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const SEMANAS_POR_MES = 4.33

const TIPOS: { valor: TipoFonte; label: string }[] = [
  { valor: 'clt', label: 'CLT' },
  { valor: 'pj', label: 'PJ' },
  { valor: 'autonomo', label: 'Autônomo' },
  { valor: 'empresario', label: 'Empresário' },
  { valor: 'outro', label: 'Outro' },
]

const LABEL_TIPO: Record<TipoFonte, string> = {
  clt: 'CLT',
  pj: 'PJ',
  autonomo: 'Autônomo',
  empresario: 'Empresário',
  outro: 'Outro',
}

interface Props {
  dados: OnboardingData
  onChange: (parcial: Partial<OnboardingData>) => void
  onAvancar: () => void
  onVoltar: () => void
}

let contadorFonte = 0
function gerarId() {
  return `fonte-${++contadorFonte}-${Date.now()}`
}

export function BlocoFontesReceita({
  dados,
  onChange,
  onAvancar,
  onVoltar,
}: Props) {
  const fontes = dados.fontes ?? []
  const indicadores = calcularIndicadores(dados)
  const podeAvancar = fontes.length > 0

  // Formulário da nova fonte
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState<TipoFonte>('clt')
  const [valor, setValor] = useState('')
  const [horas, setHoras] = useState('')
  const [atrito, setAtrito] = useState('')

  const valorNum = parseInt(valor.replace(/\D/g, '') || '0', 10)
  const horasNum = parseFloat(horas.replace(',', '.')) || 0
  const atritoNum = parseInt(atrito.replace(/\D/g, '') || '0', 10)
  const podeAdicionar = nome.trim().length > 0 && valorNum > 0 && horasNum > 0

  function adicionarFonte() {
    if (!podeAdicionar) return
    const nova: FonteReceita = {
      id: gerarId(),
      nome: nome.trim(),
      tipo,
      valorMensal: valorNum,
      atrito: atritoNum,
      horasSemana: horasNum,
    }
    onChange({ fontes: [...fontes, nova] })
    setNome('')
    setTipo('clt')
    setValor('')
    setHoras('')
    setAtrito('')
  }

  function removerFonte(id: string) {
    onChange({ fontes: fontes.filter((f) => f.id !== id) })
  }

  return (
    <div className="animate-in-up space-y-7">
      {/* Título */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          De onde vem<br />
          <span className="font-serif-italic">o seu dinheiro.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Você pode ter mais de uma fonte — um salário, um negócio, um freela
          fixo. Adicione cada uma com o que ela rende e o tempo que ela toma.
        </p>
      </div>

      {/* Fontes já adicionadas */}
      {fontes.length > 0 && (
        <div className="space-y-2">
          {fontes.map((f) => {
            const vhFonte =
              f.horasSemana > 0
                ? (f.valorMensal - f.atrito) / (f.horasSemana * SEMANAS_POR_MES)
                : 0
            return (
              <div
                key={f.id}
                className="bg-white border border-[#e8d8ce] rounded-xl p-4 space-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#2d2620] font-semibold">
                      {f.nome}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide bg-[#f5d9c8] text-[#8b6f5c] px-2 py-0.5 rounded-full">
                      {LABEL_TIPO[f.tipo]}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerFonte(f.id)}
                    aria-label="Remover fonte"
                    className="text-[#8b6f5c] hover:text-[#a32d2d] transition-colors shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="text-sm text-[#8b6f5c]">
                  <strong className="text-[#2d2620]">
                    {formatarReais(f.valorMensal)}
                  </strong>
                  /mês · {f.horasSemana}h por semana
                  {f.atrito > 0 && (
                    <> · {formatarReais(f.atrito)} de impostos/custos</>
                  )}
                </div>
                {vhFonte > 0 && (
                  <div className="text-xs text-[#8b6f5c]">
                    Sua hora aqui vale{' '}
                    <strong className="text-[#d4807a]">
                      {formatarReais(vhFonte)}
                    </strong>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Formulário da nova fonte */}
      <div className="bg-[#fdeee4] border border-[#e8d8ce] rounded-2xl p-4 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          {fontes.length === 0 ? 'Sua primeira fonte' : 'Adicionar outra fonte'}
        </p>

        {/* Nome */}
        <input
          type="text"
          placeholder="Nome (ex.: Salário, Minha loja)"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-white border border-[#e8d8ce] rounded-xl px-4 py-3 text-[#2d2620] text-base placeholder:text-[#ccc] focus:outline-none focus:border-[#d4807a] transition-colors"
        />

        {/* Tipo */}
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.valor}
              type="button"
              onClick={() => setTipo(t.valor)}
              className="text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors"
              style={{
                background: tipo === t.valor ? '#d4807a' : 'transparent',
                color: tipo === t.valor ? '#fff' : '#8b6f5c',
                borderColor: tipo === t.valor ? '#d4807a' : '#e8d8ce',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Valor + horas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
              Quanto rende / mês
            </label>
            <div className="flex items-center bg-white border border-[#e8d8ce] rounded-xl px-3 py-2.5 focus-within:border-[#d4807a]">
              <span className="text-[#8b6f5c] text-sm mr-1">R$</span>
              <input
                inputMode="numeric"
                placeholder="0"
                value={valorNum > 0 ? valorNum.toLocaleString('pt-BR') : ''}
                onChange={(e) =>
                  setValor(e.target.value.replace(/\D/g, ''))
                }
                className="w-full bg-transparent text-[#2d2620] outline-none placeholder:text-[#ccc]"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
              Horas / semana
            </label>
            <div className="flex items-center bg-white border border-[#e8d8ce] rounded-xl px-3 py-2.5 focus-within:border-[#d4807a]">
              <input
                inputMode="decimal"
                placeholder="0"
                value={horas}
                onChange={(e) =>
                  setHoras(e.target.value.replace(/[^\d.,]/g, ''))
                }
                className="w-full bg-transparent text-[#2d2620] outline-none placeholder:text-[#ccc]"
              />
              <span className="text-[#8b6f5c] text-sm ml-1">h</span>
            </div>
          </div>
        </div>

        {/* Atrito */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
            Impostos e custos{' '}
            <span className="normal-case font-normal">(opcional)</span>
          </label>
          <div className="flex items-center bg-white border border-[#e8d8ce] rounded-xl px-3 py-2.5 focus-within:border-[#d4807a]">
            <span className="text-[#8b6f5c] text-sm mr-1">R$</span>
            <input
              inputMode="numeric"
              placeholder="0"
              value={atritoNum > 0 ? atritoNum.toLocaleString('pt-BR') : ''}
              onChange={(e) => setAtrito(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-transparent text-[#2d2620] outline-none placeholder:text-[#ccc]"
            />
          </div>
          <p className="text-xs text-[#8b6f5c]">
            IR, INSS, transporte, plano — o que sai antes de chegar a você.
          </p>
        </div>

        <Button
          type="button"
          onClick={adicionarFonte}
          disabled={!podeAdicionar}
          className="w-full h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl disabled:opacity-40"
        >
          Adicionar fonte
        </Button>
      </div>

      {/* Síntese de todas as fontes */}
      {fontes.length > 0 && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#f5e0de] border border-[#d4807a] space-y-1">
            <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
              Sua receita real
            </p>
            <p className="text-[#2d2620] font-medium text-base">
              {fraseRl(indicadores.r, indicadores.rl)}
            </p>
            <p className="text-[#a32d2d] font-bold text-2xl font-serif">
              {formatarReais(indicadores.rl)}
              <span className="text-base font-normal text-[#8b6f5c]">/mês</span>
            </p>
          </div>

          {indicadores.vh > 0 && (
            <div className="p-4 rounded-xl bg-white border border-[#e8d8ce]">
              <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest mb-1">
                Valor da hora (no conjunto)
              </p>
              <p className="text-[#2d2620] text-base">{fraseVh(indicadores.vh)}</p>
              <p className="text-[#d4807a] font-bold text-2xl font-serif mt-1">
                {formatarReais(indicadores.vh)}
                <span className="text-base font-normal text-[#8b6f5c]">
                  /hora
                </span>
              </p>
            </div>
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
