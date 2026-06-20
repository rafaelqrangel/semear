'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MapaVida } from '@/components/mapa/MapaVida'
import { Button } from '@/components/ui/button'
import {
  ESFERAS,
  SUGESTOES,
  esferaPorId,
  carregarMapa,
  salvarMapa,
  carregarEconomia,
  novoId,
  type EsferaId,
  type Objetivo,
  type Comportamento,
  type Selecao,
  type EconomiaSnapshot,
} from '@/lib/mapa'
import { formatarReais, formatarHoras } from '@/lib/calculations'

export default function MapaPage() {
  const [objetivos, setObjetivos] = useState<Objetivo[]>([])
  const [economia, setEconomia] = useState<EconomiaSnapshot | null>(null)
  const [selecao, setSelecao] = useState<Selecao>('intencao')
  const [pronto, setPronto] = useState(false)

  // Carrega do armazenamento local na montagem.
  useEffect(() => {
    setObjetivos(carregarMapa().objetivos)
    setEconomia(carregarEconomia())
    setPronto(true)
  }, [])

  // Persiste a cada mudança (após a carga inicial).
  useEffect(() => {
    if (pronto) salvarMapa({ objetivos })
  }, [objetivos, pronto])

  return (
    <div className="min-h-screen bg-[#fdeee4] flex flex-col">
      <header className="px-6 pt-8 pb-2 flex items-center justify-between max-w-lg mx-auto w-full">
        <span className="font-serif text-[#2d2620] text-xl tracking-wide">
          semear
        </span>
        <Link
          href="/onboarding"
          className="text-[#8b6f5c] text-sm font-medium hover:text-[#2d2620]"
        >
          economia doméstica →
        </Link>
      </header>

      <main className="flex-1 px-6 pb-12 max-w-lg mx-auto w-full">
        <div className="text-center pt-2 pb-1">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            O mapa da sua vida
          </p>
          <h1 className="font-serif text-2xl text-[#2d2620] leading-tight mt-1">
            Você no centro.<br />
            <span className="font-serif-italic">A vida ao redor.</span>
          </h1>
        </div>

        <div className="mt-2">
          <MapaVida
            objetivos={objetivos}
            selecao={selecao}
            onSelecionar={setSelecao}
          />
        </div>

        <div className="mt-2 animate-in-up" key={selecao}>
          {selecao === 'intencao' ? (
            <PainelIntencao
              objetivos={objetivos}
              economia={economia}
              onCriar={(o) => setObjetivos((prev) => [...prev, o])}
              onAlternar={(objId, compId) =>
                setObjetivos((prev) =>
                  prev.map((o) =>
                    o.id !== objId
                      ? o
                      : {
                          ...o,
                          comportamentos: o.comportamentos.map((c) =>
                            c.id === compId ? { ...c, feito: !c.feito } : c,
                          ),
                        },
                  ),
                )
              }
              onRemover={(objId) =>
                setObjetivos((prev) => prev.filter((o) => o.id !== objId))
              }
            />
          ) : (
            <PainelEsfera
              esferaId={selecao}
              objetivos={objetivos}
              economia={economia}
              onIrParaCentro={() => setSelecao('intencao')}
            />
          )}
        </div>
      </main>
    </div>
  )
}

// ============================================================
// Painel do centro — a Intenção e o compilador
// ============================================================

function PainelIntencao({
  objetivos,
  economia,
  onCriar,
  onAlternar,
  onRemover,
}: {
  objetivos: Objetivo[]
  economia: EconomiaSnapshot | null
  onCriar: (o: Objetivo) => void
  onAlternar: (objId: string, compId: string) => void
  onRemover: (objId: string) => void
}) {
  const [criando, setCriando] = useState(false)

  return (
    <section className="space-y-4">
      <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5">
        <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
          O centro
        </p>
        <h2 className="font-serif text-xl text-[#2d2620] mt-1">
          A intenção é o vértice.
        </h2>
        <p className="text-[#8b6f5c] text-sm leading-relaxed mt-1">
          Declare um objetivo. O Semear o decompõe em comportamentos minúsculos
          — e mostra, a cada passo, se ele segue apontado para a vida que você
          deseja.
        </p>
      </div>

      {objetivos.length > 0 && (
        <div className="space-y-3">
          {objetivos.map((o) => (
            <CartaoObjetivo
              key={o.id}
              objetivo={o}
              economia={economia}
              onAlternar={onAlternar}
              onRemover={onRemover}
            />
          ))}
        </div>
      )}

      {criando ? (
        <FormularioObjetivo
          economia={economia}
          onSalvar={(o) => {
            onCriar(o)
            setCriando(false)
          }}
          onCancelar={() => setCriando(false)}
        />
      ) : (
        <Button
          onClick={() => setCriando(true)}
          className="w-full h-14 text-base font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl"
        >
          {objetivos.length === 0
            ? 'Declarar minha primeira intenção'
            : 'Declarar nova intenção'}
        </Button>
      )}
    </section>
  )
}

function CartaoObjetivo({
  objetivo,
  economia,
  onAlternar,
  onRemover,
}: {
  objetivo: Objetivo
  economia: EconomiaSnapshot | null
  onAlternar: (objId: string, compId: string) => void
  onRemover: (objId: string) => void
}) {
  const total = objetivo.comportamentos.length
  const feitos = objetivo.comportamentos.filter((c) => c.feito).length
  const progresso = total > 0 ? Math.round((feitos / total) * 100) : 0
  const custoHoras =
    economia && economia.vh > 0
      ? objetivo.horasSemana * economia.vh * 4.33
      : null

  return (
    <div className="bg-white border border-[#e8d8ce] rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg text-[#2d2620] leading-snug">
            {objetivo.titulo}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {objetivo.esferas.map((id) => {
              const e = esferaPorId(id)
              return (
                <span
                  key={id}
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: e.cor + '22', color: e.cor }}
                >
                  {e.nome}
                </span>
              )
            })}
          </div>
        </div>
        <button
          onClick={() => onRemover(objetivo.id)}
          aria-label="Remover intenção"
          className="text-[#8b6f5c] hover:text-[#a32d2d] text-sm shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Recursos consumidos */}
      {(objetivo.horasSemana > 0 || objetivo.dinheiroMes > 0) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8b6f5c]">
          {objetivo.horasSemana > 0 && (
            <span>
              <strong className="text-[#2d2620]">
                {formatarHoras(objetivo.horasSemana)}
              </strong>{' '}
              por semana
              {custoHoras
                ? ` · ${formatarReais(custoHoras)}/mês do seu tempo`
                : ''}
            </span>
          )}
          {objetivo.dinheiroMes > 0 && (
            <span>
              <strong className="text-[#2d2620]">
                {formatarReais(objetivo.dinheiroMes)}
              </strong>{' '}
              por mês
            </span>
          )}
        </div>
      )}

      {/* Comportamentos minúsculos */}
      {total > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
              Comportamentos
            </span>
            <span className="text-[11px] font-semibold text-[#6fa572]">
              {feitos}/{total} · {progresso}%
            </span>
          </div>
          <div className="h-1 bg-[#f5d9c8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6fa572] rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <ul className="space-y-1.5 pt-1">
            {objetivo.comportamentos.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => onAlternar(objetivo.id, c.id)}
                  className="flex items-start gap-2 text-left w-full group"
                >
                  <span
                    className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center text-[10px] transition-colors ${
                      c.feito
                        ? 'bg-[#6fa572] border-[#6fa572] text-white'
                        : 'border-[#c9b3a5] text-transparent group-hover:border-[#6fa572]'
                    }`}
                  >
                    ✓
                  </span>
                  <span
                    className={`text-sm leading-snug ${
                      c.feito
                        ? 'text-[#8b6f5c] line-through'
                        : 'text-[#2d2620]'
                    }`}
                  >
                    {c.texto}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function FormularioObjetivo({
  economia,
  onSalvar,
  onCancelar,
}: {
  economia: EconomiaSnapshot | null
  onSalvar: (o: Objetivo) => void
  onCancelar: () => void
}) {
  const [titulo, setTitulo] = useState('')
  const [esferas, setEsferas] = useState<EsferaId[]>([])
  const [horas, setHoras] = useState('')
  const [dinheiro, setDinheiro] = useState('')
  const [comportamentos, setComportamentos] = useState<Comportamento[]>([])
  const [rascunho, setRascunho] = useState('')

  const sugestoes = useMemo(() => {
    const conjunto = new Set<string>()
    esferas.forEach((id) => SUGESTOES[id].forEach((s) => conjunto.add(s)))
    const jaUsados = new Set(comportamentos.map((c) => c.texto))
    return Array.from(conjunto)
      .filter((s) => !jaUsados.has(s))
      .slice(0, 3)
  }, [esferas, comportamentos])

  const podeSalvar = titulo.trim().length > 0 && esferas.length > 0

  function toggleEsfera(id: EsferaId) {
    setEsferas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function adicionarComportamento(texto: string) {
    const t = texto.trim()
    if (!t) return
    setComportamentos((prev) => [
      ...prev,
      { id: novoId(), texto: t, feito: false },
    ])
    setRascunho('')
  }

  function salvar() {
    if (!podeSalvar) return
    onSalvar({
      id: novoId(),
      titulo: titulo.trim(),
      esferas,
      horasSemana: parseFloat(horas) || 0,
      dinheiroMes: parseFloat(dinheiro) || 0,
      comportamentos,
      criadoEm: new Date().toISOString(),
    })
  }

  return (
    <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5 space-y-5">
      <h3 className="font-serif text-lg text-[#2d2620]">
        Compilar uma intenção
      </h3>

      {/* Objetivo */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          O objetivo (o estado-alvo)
        </label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex.: construir nossa casa"
          className="w-full bg-[#fdeee4] border border-[#e8d8ce] rounded-xl px-3 py-2.5 text-[#2d2620] outline-none focus:border-[#d4807a]"
        />
      </div>

      {/* Esferas */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Que esferas da vida ele toca?
        </label>
        <div className="flex flex-wrap gap-2">
          {ESFERAS.map((e) => {
            const ativa = esferas.includes(e.id)
            return (
              <button
                key={e.id}
                onClick={() => toggleEsfera(e.id)}
                className="text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  background: ativa ? e.cor : 'transparent',
                  color: ativa ? '#fff' : e.cor,
                  borderColor: e.cor,
                }}
              >
                {e.nome}
              </button>
            )
          })}
        </div>
      </div>

      {/* Recursos */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
            Horas / semana
          </label>
          <input
            value={horas}
            onChange={(e) => setHoras(e.target.value.replace(/[^\d.]/g, ''))}
            inputMode="decimal"
            placeholder="0"
            className="w-full bg-[#fdeee4] border border-[#e8d8ce] rounded-xl px-3 py-2.5 text-[#2d2620] outline-none focus:border-[#d4807a]"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
            R$ / mês
          </label>
          <input
            value={dinheiro}
            onChange={(e) => setDinheiro(e.target.value.replace(/[^\d.]/g, ''))}
            inputMode="decimal"
            placeholder="0"
            className="w-full bg-[#fdeee4] border border-[#e8d8ce] rounded-xl px-3 py-2.5 text-[#2d2620] outline-none focus:border-[#d4807a]"
          />
        </div>
      </div>
      {economia && economia.vh > 0 && parseFloat(horas) > 0 && (
        <p className="text-xs text-[#8b6f5c] -mt-2">
          {formatarHoras(parseFloat(horas))} por semana valem cerca de{' '}
          <strong className="text-[#2d2620]">
            {formatarReais(parseFloat(horas) * economia.vh * 4.33)}
          </strong>{' '}
          do seu tempo por mês.
        </p>
      )}

      {/* Comportamentos minúsculos */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Comportamentos minúsculos
        </label>
        {comportamentos.length > 0 && (
          <ul className="space-y-1.5">
            {comportamentos.map((c) => (
              <li
                key={c.id}
                className="flex items-start justify-between gap-2 text-sm text-[#2d2620] bg-[#fdeee4] rounded-lg px-3 py-2"
              >
                <span className="leading-snug">{c.texto}</span>
                <button
                  onClick={() =>
                    setComportamentos((prev) =>
                      prev.filter((x) => x.id !== c.id),
                    )
                  }
                  aria-label="Remover comportamento"
                  className="text-[#8b6f5c] hover:text-[#a32d2d] shrink-0"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <input
            value={rascunho}
            onChange={(e) => setRascunho(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                adicionarComportamento(rascunho)
              }
            }}
            placeholder="Depois que eu…, eu vou…"
            className="flex-1 bg-[#fdeee4] border border-[#e8d8ce] rounded-xl px-3 py-2.5 text-sm text-[#2d2620] outline-none focus:border-[#d4807a]"
          />
          <Button
            onClick={() => adicionarComportamento(rascunho)}
            disabled={!rascunho.trim()}
            className="h-auto px-4 bg-[#f5d9c8] text-[#2d2620] hover:bg-[#efcdb6] rounded-xl"
          >
            +
          </Button>
        </div>
        {sugestoes.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] text-[#8b6f5c]">Sugestões:</p>
            <div className="flex flex-col gap-1.5">
              {sugestoes.map((s) => (
                <button
                  key={s}
                  onClick={() => adicionarComportamento(s)}
                  className="text-left text-xs text-[#8b6f5c] hover:text-[#2d2620] border border-dashed border-[#e8d8ce] rounded-lg px-3 py-1.5"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex gap-2 pt-1">
        <Button
          onClick={salvar}
          disabled={!podeSalvar}
          className="flex-1 h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl disabled:opacity-40"
        >
          Compilar intenção
        </Button>
        <Button
          variant="ghost"
          onClick={onCancelar}
          className="h-12 px-4 text-[#8b6f5c] hover:text-[#2d2620] hover:bg-[#f5d9c8] rounded-xl"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}

// ============================================================
// Painel de uma esfera (drill-down)
// ============================================================

function PainelEsfera({
  esferaId,
  objetivos,
  economia,
  onIrParaCentro,
}: {
  esferaId: EsferaId
  objetivos: Objetivo[]
  economia: EconomiaSnapshot | null
  onIrParaCentro: () => void
}) {
  const esfera = esferaPorId(esferaId)
  const relacionados = objetivos.filter((o) => o.esferas.includes(esferaId))

  return (
    <section className="space-y-4">
      <div
        className="rounded-2xl p-5 border"
        style={{ background: esfera.cor + '14', borderColor: esfera.cor + '40' }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: esfera.cor }}
        >
          Esfera
        </p>
        <h2 className="font-serif text-2xl text-[#2d2620] mt-1">
          {esfera.nome}
        </h2>
        <p className="text-[#8b6f5c] text-sm leading-relaxed mt-1">
          {esfera.descricao}
        </p>
      </div>

      {/* Prosperar carrega a economia doméstica (a frente matemática) */}
      {esferaId === 'prosperar' && (
        <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
            Sua economia doméstica
          </p>
          {economia ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Indicador
                  label="Valor da hora"
                  valor={formatarReais(economia.vh)}
                />
                <Indicador
                  label="Saldo mensal"
                  valor={
                    (economia.saldo >= 0 ? '+' : '') +
                    formatarReais(economia.saldo)
                  }
                />
                <Indicador
                  label="Tempo livre"
                  valor={formatarHoras(economia.tr) + '/sem'}
                />
                <Indicador
                  label="Independência"
                  valor={`${Math.round(economia.gif)}%`}
                />
              </div>
              <Link
                href="/onboarding"
                className="inline-block text-[#d4807a] text-sm font-semibold hover:underline"
              >
                Revisar economia doméstica →
              </Link>
            </>
          ) : (
            <>
              <p className="text-[#8b6f5c] text-sm leading-relaxed">
                Você ainda não fez seu diagnóstico. É ele que dá lastro a esta
                esfera — o valor da sua hora, seu saldo, seu tempo livre.
              </p>
              <Link href="/onboarding">
                <Button className="w-full h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl">
                  Fazer meu diagnóstico
                </Button>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Intenções que tocam esta esfera */}
      <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Intenções nesta esfera
        </p>
        {relacionados.length > 0 ? (
          <ul className="space-y-2">
            {relacionados.map((o) => {
              const total = o.comportamentos.length
              const feitos = o.comportamentos.filter((c) => c.feito).length
              return (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-3 border-b border-[#f0e2d8] last:border-0 pb-2 last:pb-0"
                >
                  <span className="text-[#2d2620] text-sm">{o.titulo}</span>
                  {total > 0 && (
                    <span className="text-[#6fa572] text-xs font-semibold shrink-0">
                      {feitos}/{total}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-[#8b6f5c] text-sm leading-relaxed">
            Nenhuma intenção aqui ainda. Toda vida desejada parte de uma
            intenção declarada no centro.
          </p>
        )}
        <button
          onClick={onIrParaCentro}
          className="text-[#d4807a] text-sm font-semibold hover:underline"
        >
          Ir ao centro declarar uma intenção →
        </button>
      </div>
    </section>
  )
}

function Indicador({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
        {label}
      </p>
      <p className="font-serif text-lg text-[#2d2620]">{valor}</p>
    </div>
  )
}
