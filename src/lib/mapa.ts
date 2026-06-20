// ============================================================
// Semear — Roda da Vida
// As facetas concretas da vida (modelo dos profissionais de
// design/organização de vida), a Intenção no eixo central, e o
// compilador de intenção (objetivo → comportamentos + recursos).
// ============================================================

export type FacetaId =
  | 'saude'
  | 'carreira'
  | 'financas'
  | 'amoroso'
  | 'familia'
  | 'amizades'
  | 'desenvolvimento'
  | 'lazer'

export interface FacetaConfig {
  id: FacetaId
  nome: string // rótulo curto na roda
  nomeCompleto: string
  descricao: string
  cor: string
}

/**
 * As oito facetas da Roda da Vida, na ordem em que aparecem ao
 * redor do eixo (sentido horário, a partir do topo). O campo das
 * relações é quebrado em três facetas distintas — amoroso, família
 * e amizades — como fazem os profissionais.
 */
export const FACETAS: FacetaConfig[] = [
  {
    id: 'saude',
    nome: 'Saúde',
    nomeCompleto: 'Saúde e energia',
    descricao: 'Corpo, sono, alimentação, disposição — sua base física.',
    cor: '#6fa572', // sage
  },
  {
    id: 'carreira',
    nome: 'Carreira',
    nomeCompleto: 'Carreira e propósito',
    descricao: 'Trabalho, vocação, sentido do que você faz.',
    cor: '#8b6f5c', // mocha
  },
  {
    id: 'financas',
    nome: 'Finanças',
    nomeCompleto: 'Finanças',
    descricao: 'Dinheiro, segurança, independência — sua economia doméstica.',
    cor: '#2d7a4a', // green-semear
  },
  {
    id: 'amoroso',
    nome: 'Amor',
    nomeCompleto: 'Relacionamento amoroso',
    descricao: 'Parceria, intimidade, vida a dois.',
    cor: '#d4807a', // rose
  },
  {
    id: 'familia',
    nome: 'Família',
    nomeCompleto: 'Família',
    descricao: 'Filhos, pais, parentes — o núcleo de casa.',
    cor: '#c2695f', // terracota suave
  },
  {
    id: 'amizades',
    nome: 'Amizades',
    nomeCompleto: 'Amizades e vida social',
    descricao: 'A rede fora de casa: amigos e convívio.',
    cor: '#c79a5b', // âmbar/ocre
  },
  {
    id: 'desenvolvimento',
    nome: 'Crescimento',
    nomeCompleto: 'Desenvolvimento pessoal',
    descricao: 'Estudo, espiritualidade, evolução interna.',
    cor: '#7d8a5a', // oliva
  },
  {
    id: 'lazer',
    nome: 'Lazer',
    nomeCompleto: 'Lazer e diversão',
    descricao: 'Descanso, prazer, recreação — recarregar.',
    cor: '#b07a9a', // malva
  },
]

export type Selecao = 'intencao' | FacetaId

export function facetaPorId(id: FacetaId): FacetaConfig {
  return FACETAS.find((f) => f.id === id)!
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
  facetas: FacetaId[] // quais facetas a intenção toca
  horasSemana: number // recurso: tempo
  dinheiroMes: number // recurso: dinheiro
  comportamentos: Comportamento[]
  criadoEm: string
}

export interface MapaState {
  objetivos: Objetivo[]
  // nota de 0 a 10 que a pessoa dá a cada faceta (coração da Roda da Vida)
  pontuacoes: Partial<Record<FacetaId, number>>
}

/**
 * Snapshot da economia doméstica, gravado ao fim do onboarding.
 * É a ponte entre as duas frentes: a frente matemática alimenta a
 * faceta Finanças com números reais.
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

export function pontuacaoDe(
  id: FacetaId,
  pontuacoes: MapaState['pontuacoes'],
): number {
  return pontuacoes[id] ?? 0
}

// ------------------------------------------------------------
// Barra de sentimento — a pessoa avalia cada faceta por sensação,
// não por número. Internamente vira uma nota (0..10) para preencher
// a roda, mas o usuário só vê a palavra.
// ------------------------------------------------------------

export interface Sentimento {
  nivel: number // 1..5
  nota: number // valor que preenche a roda
  rotulo: string
}

export const SENTIMENTOS: Sentimento[] = [
  { nivel: 1, nota: 2, rotulo: 'Precisa de cuidado' },
  { nivel: 2, nota: 4, rotulo: 'Frágil' },
  { nivel: 3, nota: 6, rotulo: 'Mais ou menos' },
  { nivel: 4, nota: 8, rotulo: 'Bem' },
  { nivel: 5, nota: 10, rotulo: 'Florescendo' },
]

/** Nível (1..5) correspondente a uma nota; 0 = ainda não avaliado. */
export function nivelDaNota(nota: number): number {
  if (nota <= 0) return 0
  return Math.min(5, Math.max(1, Math.ceil(nota / 2)))
}

export function rotuloDoNivel(nivel: number): string {
  return SENTIMENTOS.find((s) => s.nivel === nivel)?.rotulo ?? ''
}

// ------------------------------------------------------------
// Sugestões de comportamento minúsculo (estrutura de Fogg:
// "Depois que eu [âncora], eu vou [ação ridiculamente fácil]").
// ------------------------------------------------------------

export const SUGESTOES: Record<FacetaId, string[]> = {
  saude: [
    'Depois que eu acordar, eu vou beber um copo d’água.',
    'Depois que eu escovar os dentes, eu vou me alongar por um minuto.',
  ],
  carreira: [
    'Depois que eu abrir o computador, eu vou anotar a tarefa mais importante do dia.',
    'Depois do almoço, eu vou ler uma página sobre a minha área.',
  ],
  financas: [
    'Depois que eu receber, eu vou separar 1% para investir.',
    'Depois que eu pagar uma conta, eu vou anotar em qual caixa ela caiu.',
  ],
  amoroso: [
    'Depois que eu deitar, eu vou agradecer uma coisa ao meu par.',
    'Depois do jantar, eu vou perguntar como foi o dia dele(a).',
  ],
  familia: [
    'Depois que eu acordar, eu vou abraçar quem mora comigo.',
    'Depois do domingo, eu vou ligar para um familiar.',
  ],
  amizades: [
    'Depois que eu tomar café, eu vou mandar uma mensagem para um amigo.',
    'Depois da semana, eu vou marcar um encontro com alguém.',
  ],
  desenvolvimento: [
    'Depois que eu sentar para trabalhar, eu vou ler uma página.',
    'Depois do café, eu vou escrever três linhas no diário.',
  ],
  lazer: [
    'Depois do jantar, eu vou fazer algo que gosto por cinco minutos.',
    'Depois do trabalho, eu vou caminhar dez minutos.',
  ],
}

// ------------------------------------------------------------
// Persistência local (MVP — sem backend ainda).
// ------------------------------------------------------------

const CHAVE_MAPA = 'semear:mapa'
const CHAVE_ECONOMIA = 'semear:economia'

const ESTADO_VAZIO: MapaState = { objetivos: [], pontuacoes: {} }

export function carregarMapa(): MapaState {
  if (typeof window === 'undefined') return ESTADO_VAZIO
  try {
    const raw = window.localStorage.getItem(CHAVE_MAPA)
    if (!raw) return ESTADO_VAZIO
    const parsed = JSON.parse(raw) as Partial<MapaState>
    return {
      objetivos: parsed.objetivos ?? [],
      pontuacoes: parsed.pontuacoes ?? {},
    }
  } catch {
    return ESTADO_VAZIO
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
