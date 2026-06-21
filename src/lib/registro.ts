// ============================================================
// Semear — Registro do dia a dia
// O ritual que traz a pessoa de volta: registrar o gasto, classificá-lo
// num guarda-chuva e ver o espelho contra o orçamento — em horas de vida.
// ============================================================

import type { OnboardingData } from '@/types'

export type Caixa = 'manutencao' | 'vida' | 'desperdicio' | 'investimento'

export const CAIXAS: Record<
  Caixa,
  { nome: string; cor: string; descricao: string }
> = {
  manutencao: {
    nome: 'Manutenção',
    cor: '#8b6f5c',
    descricao: 'O que mantém sua vida de pé',
  },
  vida: {
    nome: 'Vida',
    cor: '#d4807a',
    descricao: 'O que você escolhe para viver bem',
  },
  desperdicio: {
    nome: 'Desperdício',
    cor: '#a32d2d',
    descricao: 'O que escoa sem virar vida',
  },
  investimento: {
    nome: 'Investimento',
    cor: '#2d7a4a',
    descricao: 'Sai hoje para voltar maior',
  },
}

/** Um guarda-chuva orçado no onboarding. */
export interface ItemOrcamento {
  id: string
  nome: string
  caixa: Caixa
  orcado: number // valor mensal planejado
}

export interface Orcamento {
  vh: number // valor da hora real, para traduzir em horas de vida
  itens: ItemOrcamento[]
  atualizadoEm: string
}

/** Um gasto registrado no dia a dia. */
export interface Gasto {
  id: string
  data: string // ISO
  nome: string
  valor: number
  itemId: string // guarda-chuva ao qual pertence
  caixa: Caixa
}

// ------------------------------------------------------------
// Conversão e helpers
// ------------------------------------------------------------

/** Quantas horas de vida um valor representa. */
export function horasDeVida(valor: number, vh: number): number {
  return vh > 0 ? valor / vh : 0
}

export function mesmoMes(iso: string, ref: Date = new Date()): boolean {
  const d = new Date(iso)
  return (
    d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth()
  )
}

export function gastoDoItemNoMes(
  itemId: string,
  gastos: Gasto[],
): number {
  return gastos
    .filter((g) => g.itemId === itemId && mesmoMes(g.data))
    .reduce((acc, g) => acc + g.valor, 0)
}

/** Monta o orçamento a partir dos dados do onboarding. */
export function orcamentoDeOnboarding(
  dados: OnboardingData,
  vh: number,
): Orcamento {
  const itens: ItemOrcamento[] = [
    ...(dados.despesas_fixas ?? []).map((d) => ({
      id: d.id,
      nome: d.nome,
      caixa: 'manutencao' as Caixa,
      orcado: d.valor,
    })),
    ...(dados.despesas_variaveis ?? []).map((d) => ({
      id: d.id,
      nome: d.nome,
      caixa: 'vida' as Caixa,
      orcado: d.valor,
    })),
    ...(dados.desperdicio ?? []).map((d) => ({
      id: d.id,
      nome: d.nome,
      caixa: 'desperdicio' as Caixa,
      orcado: d.valor,
    })),
  ]
  if ((dados.investimento_mensal ?? 0) > 0) {
    itens.push({
      id: 'investimento',
      nome: 'Investimento',
      caixa: 'investimento',
      orcado: dados.investimento_mensal,
    })
  }
  return { vh, itens, atualizadoEm: new Date().toISOString() }
}

// ------------------------------------------------------------
// Persistência local
// ------------------------------------------------------------

const CHAVE_ORCAMENTO = 'semear:orcamento'
const CHAVE_GASTOS = 'semear:gastos'

export function carregarOrcamento(): Orcamento | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CHAVE_ORCAMENTO)
    return raw ? (JSON.parse(raw) as Orcamento) : null
  } catch {
    return null
  }
}

export function salvarOrcamento(o: Orcamento): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CHAVE_ORCAMENTO, JSON.stringify(o))
  } catch {
    /* ignora */
  }
}

export function carregarGastos(): Gasto[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CHAVE_GASTOS)
    return raw ? (JSON.parse(raw) as Gasto[]) : []
  } catch {
    return []
  }
}

export function salvarGastos(gastos: Gasto[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CHAVE_GASTOS, JSON.stringify(gastos))
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
