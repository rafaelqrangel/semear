// ============================================================
// Semear — Tipos centrais
// ============================================================

export interface OnboardingData {
  // Bloco 1 — Identidade
  nome: string
  apelido: string
  perfil: 'clt' | 'pj' | 'autonomo' | 'empresario' | ''

  // Bloco 2 — Tempo
  tt: number        // horas semanais de trabalho
  tab_sono: number  // horas de sono por dia
  tab_rotina: number // horas de alimentação + higiene por dia

  // Bloco 3 — Recursos
  r: number   // receita bruta mensal
  ra: number  // atrito da receita (impostos + custos para trabalhar)

  // Bloco 4 — Manutenção (despesas fixas)
  despesas_fixas: DespesaItem[]

  // Bloco 5 — Vida + Desperdício (despesas variáveis)
  despesas_variaveis: DespesaItem[]
  desperdicio: DespesaItem[]
  investimento_mensal: number
  renda_passiva: number
}

export interface DespesaItem {
  id: string
  nome: string
  valor: number
}

export interface IndicadoresSemear {
  // Tempo
  tb: number       // 24 * 7 = 168h/semana (constante)
  tab: number      // autocuidado semanal
  tp: number       // tempo produtivo semanal
  tr: number       // tempo restante semanal

  // Financeiro
  rl: number       // receita líquida
  m: number        // manutenção total
  v: number        // vida total
  d: number        // desperdício total
  i: number        // investimento mensal
  c: number        // consumo total (m + v + d)
  saldo: number    // rl - c - i

  // Indicadores-chave
  vh: number       // valor da hora
  gif: number      // grau de independência financeira (%)
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5
