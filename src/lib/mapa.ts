// ============================================================
// Semear — Mapa da Vida
// O modelo das esferas, da intenção no centro, e do compilador
// de intenção (objetivo → comportamentos minúsculos + recursos).
// ============================================================

export type EsferaId = 'ser' | 'conviver' | 'prosperar'

export interface EsferaConfig {
  id: EsferaId
  nome: string
  descricao: string
  cor: string
  // posição do centro do círculo no viewBox 400x440
  cx: number
  cy: number
  // posição do rótulo, no lóbulo externo da esfera
  lx: number
  ly: number
}

export const RAIO_ESFERA = 120

/**
 * As três esferas da vida. Elas se cruzam; o centro onde todas se
 * sobrepõem é a Intenção — o cerne, o ponto de onde o usuário parte.
 */
export const ESFERAS: EsferaConfig[] = [
  {
    id: 'ser',
    nome: 'Ser',
    descricao: 'Identidade, saúde, autocuidado, propósito — quem você é.',
    cor: '#d4807a', // rose
    cx: 200, cy: 150,
    lx: 200, ly: 56,
  },
  {
    id: 'conviver',
    nome: 'Conviver',
    descricao: 'Relações, família, amor — com quem você vive.',
    cor: '#6fa572', // sage
    cx: 138, cy: 258,
    lx: 78, ly: 348,
  },
  {
    id: 'prosperar',
    nome: 'Prosperar',
    descricao: 'Trabalho, dinheiro, tempo — o que você constrói.',
    cor: '#8b6f5c', // mocha
    cx: 262, cy: 258,
    lx: 322, ly: 348,
  },
]

// Centroide dos três círculos — onde mora a Intenção.
export const CENTRO = { cx: 200, cy: 222, r: 48 }

export type Selecao = 'intencao' | EsferaId

export function esferaPorId(id: EsferaId): EsferaConfig {
  return ESFERAS.find((e) => e.id === id)!
}

// ------------------------------------------------------------
// O compilador de intenção
// ------------------------------------------------------------

export interface Comportamento {
  id: string
  texto: string
  feito: boolean
}

export interface Objetivo {
  id: string
  titulo: string
  esferas: EsferaId[] // quais esferas a intenção toca
  horasSemana: number // recurso: tempo
  dinheiroMes: number // recurso: dinheiro
  comportamentos: Comportamento[]
  criadoEm: string
}

export interface MapaState {
  objetivos: Objetivo[]
}

/**
 * Snapshot da economia doméstica, gravado ao fim do onboarding.
 * É a ponte entre as duas frentes: a frente matemática alimenta
 * a esfera Prosperar com números reais.
 */
export interface EconomiaSnapshot {
  vh: number
  saldo: number
  gif: number
  rl: number
  tr: number
  m: number
  v: number
  d: number
  i: number
  atualizadoEm: string
}

// ------------------------------------------------------------
// Sugestões de comportamento minúsculo (estrutura de Fogg:
// "Depois que eu [âncora], eu vou [ação ridiculamente fácil]").
// ------------------------------------------------------------

export const SUGESTOES: Record<EsferaId, string[]> = {
  ser: [
    'Depois que eu acordar, eu vou beber um copo d’água.',
    'Depois que eu escovar os dentes, eu vou respirar fundo três vezes.',
  ],
  conviver: [
    'Depois que eu jantar, eu vou mandar uma mensagem para alguém que amo.',
    'Depois que eu chegar em casa, eu vou perguntar como foi o dia de alguém.',
  ],
  prosperar: [
    'Depois que eu receber, eu vou separar 1% para investir.',
    'Depois que eu pagar uma conta, eu vou anotar em qual caixa ela caiu.',
  ],
}

// ------------------------------------------------------------
// Saúde da esfera — intensidade visual de preenchimento (0..1).
// Presença de objetivos acende a esfera; o progresso dos
// comportamentos a torna mais viva.
// ------------------------------------------------------------

export function saudeEsfera(id: EsferaId, objetivos: Objetivo[]): number {
  const rel = objetivos.filter((o) => o.esferas.includes(id))
  if (rel.length === 0) return 0
  const total = rel.reduce((a, o) => a + o.comportamentos.length, 0)
  const feitos = rel.reduce(
    (a, o) => a + o.comportamentos.filter((c) => c.feito).length,
    0,
  )
  const progresso = total > 0 ? feitos / total : 0
  return Math.min(1, 0.4 + progresso * 0.6)
}

// ------------------------------------------------------------
// Persistência local (MVP — sem backend ainda).
// ------------------------------------------------------------

const CHAVE_MAPA = 'semear:mapa'
const CHAVE_ECONOMIA = 'semear:economia'

export function carregarMapa(): MapaState {
  if (typeof window === 'undefined') return { objetivos: [] }
  try {
    const raw = window.localStorage.getItem(CHAVE_MAPA)
    if (!raw) return { objetivos: [] }
    const parsed = JSON.parse(raw) as MapaState
    return { objetivos: parsed.objetivos ?? [] }
  } catch {
    return { objetivos: [] }
  }
}

export function salvarMapa(state: MapaState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CHAVE_MAPA, JSON.stringify(state))
  } catch {
    /* ignora cota cheia / modo privado */
  }
}

export function carregarEconomia(): EconomiaSnapshot | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CHAVE_ECONOMIA)
    return raw ? (JSON.parse(raw) as EconomiaSnapshot) : null
  } catch {
    return null
  }
}

export function salvarEconomia(snap: EconomiaSnapshot): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CHAVE_ECONOMIA, JSON.stringify(snap))
  } catch {
    /* ignora */
  }
}

export function novoId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}
