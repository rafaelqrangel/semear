'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { MapaVida } from '@/components/mapa/MapaVida'
import { BarraSentimento } from '@/components/mapa/BarraSentimento'
import { BottomNav } from '@/components/BottomNav'
import { Button } from '@/components/ui/button'
import {
  FACETAS,
  SUGESTOES,
  facetaPorId,
  pontuacaoDe,
  nivelDaNota,
  carregarMapa,
  salvarMapa,
  carregarEconomia,
  novoId,
  type FacetaId,
  type MapaState,
  type Objetivo,
  type Comportamento,
  type Selecao,
  type EconomiaSnapshot,
  type AvaliacaoRoda,
} from '@/lib/mapa'
import { formatarReais, formatarHoras } from '@/lib/calculations'

export default function MapaPage() {
  const [objetivos, setObjetivos] = useState<Objetivo[]>([])
  const [pontuacoes, setPontuacoes] = useState<MapaState['pontuacoes']>({})
  const [historico, setHistorico] = useState<AvaliacaoRoda[]>([])
  const [economia, setEconomia] = useState<EconomiaSnapshot | null>(null)
  const [selecao, setSelecao] = useState<Selecao>('intencao')
  const [pronto, setPronto] = useState(false)
  const painelRef = useRef<HTMLDivElement | null>(null)
  const jaInteragiu = useRef(false)

  // Ao tocar numa faceta ou no centro, leva o painel correspondente
  // à vista — senão a interação parece "morta" abaixo da dobra.
  function selecionar(s: Selecao) {
    jaInteragiu.current = true
    setSelecao(s)
  }
  useEffect(() => {
    if (jaInteragiu.current) {
      painelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selecao])

  // Carrega do armazenamento local na montagem.
  useEffect(() => {
    const m = carregarMapa()
    setObjetivos(m.objetivos)
    setPontuacoes(m.pontuacoes)
    setHistorico(m.historico)
    setEconomia(carregarEconomia())
    setPronto(true)
  }, [])

  // Persiste a cada mudança (após a carga inicial).
  useEffect(() => {
    if (pronto) salvarMapa({ objetivos, pontuacoes, historico })
  }, [objetivos, pontuacoes, historico, pronto])

  function definirPontuacao(id: FacetaId, nota: number) {
    setPontuacoes((prev) => ({ ...prev, [id]: nota }))
  }

  // Quantas facetas já foram avaliadas hoje (na roda atual).
  const facetasAvaliadas = FACETAS.filter(
    (f) => (pontuacoes[f.id] ?? 0) > 0,
  ).length

  function registrarAvaliacao() {
    if (facetasAvaliadas === 0) return
    const hoje = new Date().toISOString().slice(0, 10)
    const nova: AvaliacaoRoda = {
      id: novoId(),
      data: new Date().toISOString(),
      pontuacoes: { ...pontuacoes },
    }
    setHistorico((prev) => {
      // substitui a avaliação de hoje, se já houver uma
      const semHoje = prev.filter((a) => a.data.slice(0, 10) !== hoje)
      return [nova, ...semHoje]
    })
  }

  function removerAvaliacao(id: string) {
    setHistorico((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#fdeee4] flex flex-col pb-24">
      <header className="px-6 pt-8 pb-2 flex items-center justify-between max-w-lg mx-auto w-full">
        <span className="font-serif text-[#2d2620] text-xl tracking-wide">
          semear
        </span>
      </header>

      <main className="flex-1 px-6 pb-12 max-w-lg mx-auto w-full">
        <div className="text-center pt-2 pb-1">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            A roda da sua vida
          </p>
          <h1 className="font-serif text-2xl text-[#2d2620] leading-tight mt-1">
            Você no centro.<br />
            <span className="font-serif-italic">A vida ao redor.</span>
          </h1>
        </div>

        <div className="mt-4">
          <MapaVida
            pontuacoes={pontuacoes}
            objetivos={objetivos}
            selecao={selecao}
            onSelecionar={selecionar}
          />
        </div>

        <p className="text-center text-[#8b6f5c] text-xs leading-relaxed mt-1 px-4">
          Toque em uma faceta para avaliar como você a sente — ou no centro para
          declarar suas intenções.
        </p>

        {facetasAvaliadas > 0 && (
          <PainelHistorico
            historico={historico}
            facetasAvaliadas={facetasAvaliadas}
            onRegistrar={registrarAvaliacao}
            onRemover={removerAvaliacao}
          />
        )}

        <div ref={painelRef} className="mt-6 scroll-mt-4 animate-in-up" key={selecao}>
          {selecao === 'intencao' ? (
            <PainelIntencao
              objetivos={objetivos}
              economia={economia}
              onSalvar={(o) =>
                setObjetivos((prev) =>
                  prev.some((x) => x.id === o.id)
                    ? prev.map((x) => (x.id === o.id ? o : x))
                    : [...prev, o],
                )
              }
              onRemover={(objId) =>
                setObjetivos((prev) => prev.filter((o) => o.id !== objId))
              }
            />
          ) : (
            <PainelFaceta
              facetaId={selecao}
              nota={pontuacaoDe(selecao, pontuacoes)}
              objetivos={objetivos}
              economia={economia}
              onPontuar={(n) => definirPontuacao(selecao, n)}
              onIrParaCentro={() => setSelecao('intencao')}
            />
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

// ============================================================
// Painel do centro — a Intenção e o compilador
// ============================================================

function PainelIntencao({
  objetivos,
  economia,
  onSalvar,
  onRemover,
}: {
  objetivos: Objetivo[]
  economia: EconomiaSnapshot | null
  onSalvar: (o: Objetivo) => void
  onRemover: (objId: string) => void
}) {
  const [criando, setCriando] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)

  return (
    <section className="space-y-4">
      <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5">
        <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
          O eixo
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
          {objetivos.map((o) =>
            editandoId === o.id ? (
              <FormularioObjetivo
                key={o.id}
                economia={economia}
                inicial={o}
                onSalvar={(x) => {
                  onSalvar(x)
                  setEditandoId(null)
                }}
                onCancelar={() => setEditandoId(null)}
              />
            ) : (
              <CartaoObjetivo
                key={o.id}
                objetivo={o}
                economia={economia}
                onEditar={() => {
                  setCriando(false)
                  setEditandoId(o.id)
                }}
                onRemover={onRemover}
              />
            ),
          )}
        </div>
      )}

      {criando ? (
        <FormularioObjetivo
          economia={economia}
          onSalvar={(o) => {
            onSalvar(o)
            setCriando(false)
          }}
          onCancelar={() => setCriando(false)}
        />
      ) : (
        <Button
          onClick={() => {
            setEditandoId(null)
            setCriando(true)
          }}
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
  onEditar,
  onRemover,
}: {
  objetivo: Objetivo
  economia: EconomiaSnapshot | null
  onEditar: () => void
  onRemover: (objId: string) => void
}) {
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
            {objetivo.facetas.map((id) => {
              const f = facetaPorId(id)
              return (
                <span
                  key={id}
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: f.cor + '22', color: f.cor }}
                >
                  {f.nome}
                </span>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onEditar}
            aria-label="Editar intenção"
            className="text-[#8b6f5c] hover:text-[#2d2620] p-1 rounded-md hover:bg-[#fdeee4]"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onRemover(objetivo.id)}
            aria-label="Remover intenção"
            className="text-[#8b6f5c] hover:text-[#a32d2d] p-1 rounded-md hover:bg-[#fdeee4]"
          >
            <Trash2 size={15} />
          </button>
        </div>
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

      {/* Hábitos da intenção — lista expositiva (a estrutura de hábitos) */}
      {objetivo.comportamentos.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
            Hábitos desta intenção
          </span>
          <ul className="space-y-2 pt-0.5">
            {objetivo.comportamentos.map((c) => (
              <li key={c.id} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: '#d4807a' }}
                />
                <span className="text-sm leading-snug text-[#2d2620]">
                  {c.texto}
                </span>
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
  inicial,
  onSalvar,
  onCancelar,
}: {
  economia: EconomiaSnapshot | null
  inicial?: Objetivo
  onSalvar: (o: Objetivo) => void
  onCancelar: () => void
}) {
  const editando = !!inicial
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '')
  const [facetas, setFacetas] = useState<FacetaId[]>(inicial?.facetas ?? [])
  const [horas, setHoras] = useState(
    inicial?.horasSemana ? String(inicial.horasSemana) : '',
  )
  const [dinheiro, setDinheiro] = useState(
    inicial?.dinheiroMes ? String(inicial.dinheiroMes) : '',
  )
  const [comportamentos, setComportamentos] = useState<Comportamento[]>(
    inicial?.comportamentos ?? [],
  )
  const [ancora, setAncora] = useState('')
  const [acao, setAcao] = useState('')

  const sugestoes = useMemo(() => {
    const conjunto = new Set<string>()
    facetas.forEach((id) => SUGESTOES[id].forEach((s) => conjunto.add(s)))
    const jaUsados = new Set(comportamentos.map((c) => c.texto))
    return Array.from(conjunto)
      .filter((s) => !jaUsados.has(s))
      .slice(0, 3)
  }, [facetas, comportamentos])

  const podeSalvar = titulo.trim().length > 0 && facetas.length > 0

  function toggleFaceta(id: FacetaId) {
    setFacetas((prev) =>
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
  }

  function adicionarHabito() {
    const a = ancora.trim()
    const b = acao.trim()
    if (!a || !b) return
    adicionarComportamento(`Depois que eu ${a}, eu vou ${b}.`)
    setAncora('')
    setAcao('')
  }

  function salvar() {
    if (!podeSalvar) return
    onSalvar({
      id: inicial?.id ?? novoId(),
      titulo: titulo.trim(),
      facetas,
      horasSemana: parseFloat(horas) || 0,
      dinheiroMes: parseFloat(dinheiro) || 0,
      comportamentos,
      criadoEm: inicial?.criadoEm ?? new Date().toISOString(),
    })
  }

  return (
    <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5 space-y-5">
      <h3 className="font-serif text-lg text-[#2d2620]">
        {editando ? 'Editar intenção' : 'Compilar uma intenção'}
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

      {/* Facetas */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Que facetas da vida ele toca?
        </label>
        <div className="flex flex-wrap gap-2">
          {FACETAS.map((f) => {
            const ativa = facetas.includes(f.id)
            return (
              <button
                key={f.id}
                onClick={() => toggleFaceta(f.id)}
                className="text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  background: ativa ? f.cor : 'transparent',
                  color: ativa ? '#fff' : f.cor,
                  borderColor: f.cor,
                }}
              >
                {f.nome}
              </button>
            )
          })}
        </div>
      </div>

      {/* Recursos */}
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
            Quanto isso vai custar de você?
          </label>
          <p className="text-xs text-[#8b6f5c] mt-1 leading-relaxed">
            Toda intenção consome dois recursos: o seu tempo e o seu dinheiro.
            Estime — dá pra ajustar depois.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2d2620]">
            Tempo: horas por semana
          </label>
          <input
            value={horas}
            onChange={(e) => setHoras(e.target.value.replace(/[^\d.]/g, ''))}
            inputMode="decimal"
            placeholder="Ex.: 5"
            className="w-full bg-[#fdeee4] border border-[#e8d8ce] rounded-xl px-3 py-2.5 text-[#2d2620] outline-none focus:border-[#d4807a]"
          />
          <p className="text-xs text-[#8b6f5c]">
            Quanto do seu tempo você vai dedicar a isso a cada semana.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#2d2620]">
            Dinheiro: reais por mês{' '}
            <span className="text-[#8b6f5c] font-normal">(opcional)</span>
          </label>
          <input
            value={dinheiro}
            onChange={(e) => setDinheiro(e.target.value.replace(/[^\d.]/g, ''))}
            inputMode="decimal"
            placeholder="Ex.: 800"
            className="w-full bg-[#fdeee4] border border-[#e8d8ce] rounded-xl px-3 py-2.5 text-[#2d2620] outline-none focus:border-[#d4807a]"
          />
          <p className="text-xs text-[#8b6f5c]">
            Quanto do seu dinheiro você vai apontar pra cá todo mês — guardar,
            investir ou gastar. Para uma casa, é o quanto você consegue separar
            por mês rumo a ela. Se ainda não souber, deixe em branco.
          </p>
        </div>

        {economia && economia.vh > 0 && parseFloat(horas) > 0 && (
          <p className="text-xs text-[#8b6f5c] bg-[#fdeee4] rounded-lg px-3 py-2">
            As {formatarHoras(parseFloat(horas))} por semana que você dedica a
            isso equivalem a cerca de{' '}
            <strong className="text-[#2d2620]">
              {formatarReais(parseFloat(horas) * economia.vh * 4.33)}
            </strong>{' '}
            do seu tempo por mês.
          </p>
        )}
      </div>

      {/* Hábitos da intenção */}
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
            Hábitos que levam até lá
          </label>
          <p className="text-xs text-[#8b6f5c] mt-1 leading-relaxed">
            Um objetivo se realiza por hábitos minúsculos. Ancore cada um em
            algo que você já faz todo dia.
          </p>
        </div>

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
                  aria-label="Remover hábito"
                  className="text-[#8b6f5c] hover:text-[#a32d2d] shrink-0"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-2 bg-[#fdeee4] rounded-xl p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8b6f5c] whitespace-nowrap">
              Depois que eu
            </span>
            <input
              value={ancora}
              onChange={(e) => setAncora(e.target.value)}
              placeholder="tomar café"
              className="flex-1 min-w-0 bg-white border border-[#e8d8ce] rounded-lg px-3 py-2 text-sm text-[#2d2620] outline-none focus:border-[#d4807a]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8b6f5c] whitespace-nowrap">
              eu vou
            </span>
            <input
              value={acao}
              onChange={(e) => setAcao(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  adicionarHabito()
                }
              }}
              placeholder="ler uma página sobre o negócio"
              className="flex-1 min-w-0 bg-white border border-[#e8d8ce] rounded-lg px-3 py-2 text-sm text-[#2d2620] outline-none focus:border-[#d4807a]"
            />
          </div>
          <Button
            onClick={adicionarHabito}
            disabled={!ancora.trim() || !acao.trim()}
            className="w-full h-10 bg-[#f5d9c8] text-[#2d2620] hover:bg-[#efcdb6] rounded-lg font-semibold disabled:opacity-40"
          >
            Adicionar hábito
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
          {editando ? 'Salvar alterações' : 'Compilar intenção'}
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
// Painel de uma faceta (drill-down)
// ============================================================

function PainelFaceta({
  facetaId,
  nota,
  objetivos,
  economia,
  onPontuar,
  onIrParaCentro,
}: {
  facetaId: FacetaId
  nota: number
  objetivos: Objetivo[]
  economia: EconomiaSnapshot | null
  onPontuar: (n: number) => void
  onIrParaCentro: () => void
}) {
  const faceta = facetaPorId(facetaId)
  const relacionados = objetivos.filter((o) => o.facetas.includes(facetaId))

  return (
    <section className="space-y-4">
      <div
        className="rounded-2xl p-5 border"
        style={{ background: faceta.cor + '14', borderColor: faceta.cor + '40' }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: faceta.cor }}
        >
          Faceta
        </p>
        <h2 className="font-serif text-2xl text-[#2d2620] mt-1">
          {faceta.nomeCompleto}
        </h2>
        <p className="text-[#8b6f5c] text-sm leading-relaxed mt-1">
          {faceta.descricao}
        </p>
      </div>

      {/* Barra de sentimento — avaliação por sensação, não por número */}
      <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Como você sente esta parte da sua vida?
        </p>
        <BarraSentimento cor={faceta.cor} nota={nota} onMudar={onPontuar} />
        <p className="text-[#8b6f5c] text-xs">
          Sem julgamento, sem números — só a sensação de onde isso está agora.
        </p>
      </div>

      {/* Finanças carrega a economia doméstica (a frente matemática) */}
      {facetaId === 'financas' && (
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
                faceta — o valor da sua hora, seu saldo, seu tempo livre.
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

      {/* Intenções que tocam esta faceta */}
      <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Intenções nesta faceta
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

// ============================================================
// Histórico de avaliações da roda
// ============================================================

function mediaNivel(pont: MapaState['pontuacoes']): number {
  const niveis = FACETAS.map((f) => nivelDaNota(pont[f.id] ?? 0)).filter(
    (n) => n > 0,
  )
  if (niveis.length === 0) return 0
  return niveis.reduce((a, b) => a + b, 0) / niveis.length
}

function MiniRoda({ pont }: { pont: MapaState['pontuacoes'] }) {
  return (
    <div className="flex gap-1">
      {FACETAS.map((f) => {
        const nivel = nivelDaNota(pont[f.id] ?? 0)
        return (
          <div
            key={f.id}
            title={f.nome}
            className="flex-1 h-6 rounded-sm flex items-end overflow-hidden bg-[#f5d9c8]"
          >
            <div
              className="w-full rounded-sm"
              style={{
                height: `${(nivel / 5) * 100}%`,
                background: f.cor,
                opacity: nivel > 0 ? 0.85 : 0,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

function PainelHistorico({
  historico,
  facetasAvaliadas,
  onRegistrar,
  onRemover,
}: {
  historico: AvaliacaoRoda[]
  facetasAvaliadas: number
  onRegistrar: () => void
  onRemover: (id: string) => void
}) {
  const [aberto, setAberto] = useState(false)
  const hoje = new Date().toISOString().slice(0, 10)
  const jaRegistradoHoje = historico.some((a) => a.data.slice(0, 10) === hoje)

  return (
    <div className="mt-5 bg-white border border-[#e8d8ce] rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
            Sua roda no tempo
          </p>
          <p className="text-xs text-[#8b6f5c] mt-0.5">
            {facetasAvaliadas} de {FACETAS.length} facetas avaliadas
          </p>
        </div>
        {historico.length > 0 && (
          <button
            onClick={() => setAberto((v) => !v)}
            className="text-[#d4807a] text-sm font-semibold hover:underline shrink-0"
          >
            {aberto ? 'Ocultar' : `Histórico (${historico.length})`}
          </button>
        )}
      </div>

      <Button
        onClick={onRegistrar}
        disabled={jaRegistradoHoje}
        className="w-full h-11 font-semibold bg-[#6fa572] hover:bg-[#5e9162] text-white rounded-xl disabled:opacity-50"
      >
        {jaRegistradoHoje
          ? 'Avaliação de hoje registrada ✓'
          : 'Registrar avaliação de hoje'}
      </Button>

      {aberto && historico.length > 0 && (
        <ul className="space-y-3 pt-1">
          {historico.map((a, idx) => {
            const media = mediaNivel(a.pontuacoes)
            const anterior = historico[idx + 1]
            const delta = anterior
              ? media - mediaNivel(anterior.pontuacoes)
              : 0
            const data = new Date(a.data).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
            return (
              <li
                key={a.id}
                className="space-y-1.5 border-b border-[#f0e2d8] last:border-0 pb-3 last:pb-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-[#2d2620] font-medium">
                    {data}
                  </span>
                  <div className="flex items-center gap-2">
                    {anterior && Math.abs(delta) >= 0.05 && (
                      <span
                        className="text-xs font-semibold"
                        style={{ color: delta > 0 ? '#2d7a4a' : '#a32d2d' }}
                      >
                        {delta > 0 ? '↑' : '↓'} {Math.abs(delta).toFixed(1)}
                      </span>
                    )}
                    <button
                      onClick={() => onRemover(a.id)}
                      aria-label="Remover avaliação"
                      className="text-[#8b6f5c] hover:text-[#a32d2d]"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <MiniRoda pont={a.pontuacoes} />
              </li>
            )
          })}
        </ul>
      )}
    </div>
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
