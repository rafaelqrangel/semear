// ============================================================
// Semear — Tipos centrais
// ============================================================

export type TipoFonte = 'clt' | 'pj' | 'autonomo' | 'empresario' | 'outro'

export interface CustoFonte {
  id: string
  nome: string
  valor: number
}

export interface FonteReceita {
  id: string
  nome: string              // ex.: "Salário", "Minha loja"
  tipo: TipoFonte
  valorMensal: number       // receita bruta mensal desta fonte
  horasTrabalhoMes: number     // horas de trabalho efetivo por mês
  horasDeslocamentoMes: number // horas de deslocamento por mês
  custos: CustoFonte[]      // impostos, benefícios e custos para trabalhar
}

export interface OnboardingData {
  // Bloco 1 — Identidade
  nome: string
  apelido: string

  // Bloco 2 — Fontes de receita (pode haver mais de uma)
  fontes: FonteReceita[]

  // Bloco 3 — Tempo (autocuidado)
  tab_sono: number  // horas de sono por dia
  tab_rotina: number // horas de alimentação + higiene por dia

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
  tt: number       // horas semanais totais do trabalho (para o tempo livre)
  ttMes: number    // horas mensais totais (trabalho + deslocamento)
  ttTrabalhoMes: number // horas mensais só de trabalho efetivo

  // Financeiro
  r: number        // receita bruta total (soma das fontes)
  ra: number       // atrito total da receita
  rl: number       // receita líquida
  vhBruto: number  // valor da hora bruto (sobre horas mensais totais)
  vhTrabalho: number // valor da hora líquido sobre horas de trabalho
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
