// ============================================================
// Semear — Fundação Matemática
// Todas as equações ficam aqui. O frontend nunca exibe siglas.
// ============================================================

import type { OnboardingData, IndicadoresSemear } from '@/types'

const SEMANAS_POR_MES = 4.33
const HORAS_DIA = 24
const DIAS_SEMANA = 7

/** Tempo Bruto semanal — constante absoluta */
export const TB_SEMANAL = HORAS_DIA * DIAS_SEMANA // 168h

/**
 * Calcula todos os indicadores a partir dos dados de onboarding.
 * Aceita dados parciais — campos ausentes retornam 0.
 */
export function calcularIndicadores(dados: Partial<OnboardingData>): IndicadoresSemear {
  const tt = dados.tt ?? 0
  const tab_sono = dados.tab_sono ?? 8
  const tab_rotina = dados.tab_rotina ?? 2
  const r = dados.r ?? 0
  const ra = dados.ra ?? 0

  // Tempo
  const tab_diario = tab_sono + tab_rotina
  const tab = tab_diario * DIAS_SEMANA              // Tab semanal
  const tp = TB_SEMANAL - tab                       // Tp semanal
  const tr = tp - tt                                // Tr semanal

  // Financeiro
  const rl = Math.max(0, r - ra)
  const m = somarDespesas(dados.despesas_fixas ?? [])
  const v = somarDespesas(dados.despesas_variaveis ?? [])
  const d = somarDespesas(dados.desperdicio ?? [])
  const i = dados.investimento_mensal ?? 0
  const c = m + v + d
  const saldo = rl - c - i

  // Indicadores-chave
  const vh = tt > 0 ? rl / (tt * SEMANAS_POR_MES) : 0
  const renda_passiva = dados.renda_passiva ?? 0
  const gif = c > 0 ? (renda_passiva / c) * 100 : 0

  return { tb: TB_SEMANAL, tab, tp, tr, rl, m, v, d, i, c, saldo, vh, gif }
}

function somarDespesas(items: { valor: number }[]): number {
  return items.reduce((acc, item) => acc + (item.valor || 0), 0)
}

// ============================================================
// Formatadores — usados diretamente no frontend
// ============================================================

/** Formata valor monetário: R$ 1.234,56 */
export function formatarReais(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor)
}

/** Formata horas: "42h" ou "42h 30min" */
export function formatarHoras(horas: number): string {
  const h = Math.floor(horas)
  const m = Math.round((horas - h) * 60)
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

/** Formata percentual: "23%" */
export function formatarPorcentagem(valor: number): string {
  return `${Math.round(valor)}%`
}

// ============================================================
// Frases humanas — o usuário nunca vê equações
// ============================================================

export function fraseSaldo(saldo: number, rl: number): string {
  if (rl === 0) return 'Preencha sua receita para ver o diagnóstico.'
  if (saldo < -rl * 0.1) return 'Você está gastando mais do que ganha. Vamos entender o que está acontecendo.'
  if (saldo < 0) return 'Seus gastos estão um pouco acima da sua receita. Dá para ajustar.'
  if (saldo === 0) return 'Tudo alocado. Cada real tem um destino definido.'
  if (saldo <= rl * 0.05) return `Sobram ${formatarReais(saldo)} sem destino. Eles deveriam ir para investimentos.`
  return `${formatarReais(saldo)} por mês sem destino definido. É hora de planejar.`
}

export function fraseVh(vh: number): string {
  if (vh <= 0) return ''
  return `Cada hora do seu trabalho vale ${formatarReais(vh)}.`
}

export function fraseTr(tr: number): string {
  if (tr <= 0) return 'Seu trabalho ocupa todo o seu tempo disponível.'
  return `Você tem ${formatarHoras(tr)} por semana para viver fora do trabalho.`
}

export function fraseRl(r: number, rl: number): string {
  if (r <= 0) return ''
  const diff = r - rl
  if (diff <= 0) return `Sua receita real é ${formatarReais(rl)}.`
  return `Você acha que ganha ${formatarReais(r)}, mas seu dinheiro real é ${formatarReais(rl)}.`
}

export function fraseGif(gif: number): string {
  if (gif <= 0) return '0% das suas contas se pagam sozinhas ainda. É o ponto de partida de todos.'
  if (gif < 10) return `${formatarPorcentagem(gif)} das suas contas já se pagam sozinhas. Pequeno, mas real.`
  if (gif < 50) return `${formatarPorcentagem(gif)} das suas despesas já são cobertas sem você trabalhar.`
  if (gif < 100) return `${formatarPorcentagem(gif)} do caminho percorrido. Você está chegando lá.`
  return 'Você cruzou a linha. O trabalho agora é uma escolha.'
}

/** Zona de saúde financeira baseada em saldo e gif */
export function zonaFinanceira(saldo: number, gif: number): 'vermelho' | 'amarelo' | 'azul' | 'verde' {
  if (saldo < 0) return 'vermelho'
  if (gif >= 100) return 'verde'
  if (gif >= 50) return 'azul'
  if (saldo > 0) return 'amarelo'
  return 'vermelho'
}
