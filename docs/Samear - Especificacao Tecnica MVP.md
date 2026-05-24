# Samear — Especificação Técnica do MVP

**Versão:** 2.0 (mai/2026) — equação revisada
**Estratégia:** custo zero até validação com amigos, depois evolução comercial

---

## 1. Visão geral da arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    USUÁRIO (browser/mobile)              │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (Next.js 14 + Vercel)              │
│  • React Server Components                               │
│  • Tailwind CSS + shadcn/ui                              │
│  • TypeScript                                            │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   SUPABASE (BaaS)                        │
│  • PostgreSQL (dados)                                    │
│  • Auth (login Google + email)                           │
│  • Row Level Security (privacidade por usuário)          │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Stack técnica

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes:** shadcn/ui (componentes copiados, não dependência)
- **Gráficos:** Recharts
- **Forms:** react-hook-form + zod
- **Estado global:** Zustand (leve) ou Context API
- **Datas:** date-fns
- **Ícones:** lucide-react

### Backend
- **Database:** PostgreSQL via Supabase
- **Auth:** Supabase Auth (Google OAuth + email/senha)
- **API:** Supabase REST + Server Actions do Next.js
- **Row Level Security:** ativado em todas as tabelas

### Hospedagem (custo zero inicial)
- **Frontend:** Vercel (plano Hobby)
- **Banco/Auth:** Supabase (plano Free)
- **Domínio:** `samear.vercel.app` no início

### Desenvolvimento
- **Repositório:** GitHub privado `rafaelqrangel/samear`
- **IDE:** Claude Code (terminal + VS Code extension)
- **Versionamento:** Git (`main` produção, `dev` desenvolvimento)

---

## 3. Estrutura de pastas

```
samear/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (app)/
│   │   ├── layout.tsx
│   │   ├── painel/page.tsx
│   │   ├── dinheiro/page.tsx
│   │   ├── tempo/page.tsx
│   │   ├── registrar/page.tsx
│   │   └── onboarding/page.tsx
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── painel/
│   ├── dinheiro/
│   ├── tempo/
│   └── registrar/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── calculos/
│   │   ├── tempo.ts          # Tb, Tab, Tp, Te, Ttl, Tv
│   │   ├── receita.ts        # R, Ra, Rl
│   │   ├── vh.ts             # Vhb, Vhl
│   │   ├── riqueza.ts
│   │   ├── prosperidade.ts
│   │   └── vida-plena.ts
│   ├── utils.ts
│   └── tipos.ts
├── public/
├── styles/
├── .env.local
├── .env.example
└── README.md
```

---

## 4. Schema do banco (Supabase / PostgreSQL)

### Tabela `usuarios`

```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,

  -- Tempo (onboarding: 2 perguntas)
  tt_semanal NUMERIC(5,2),          -- horas brutas de trabalho/semana
  te_semanal NUMERIC(5,2),          -- horas de atrito no trabalho/semana (deslocamento, reuniões inúteis)
  tab_diario NUMERIC(4,2) DEFAULT 10, -- autocuidado basal (default 10h)
  tv_desejada_semanal NUMERIC(5,2), -- alvo: quantas horas/semana de vida desejada

  -- Receita (onboarding: 3 perguntas)
  receita_bruta NUMERIC(10,2),      -- R
  ra_impostos NUMERIC(10,2),        -- atrito da receita: impostos
  ra_operacao NUMERIC(10,2),        -- atrito da receita: custos para trabalhar (transporte, almoço, equipamento)

  expectativa_vida INT,
  data_nascimento DATE,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario_proprio" ON usuarios
  FOR ALL USING (auth.uid() = id);
```

### Tabela `gastos`

```sql
CREATE TABLE gastos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id),

  titular TEXT NOT NULL,
  descricao TEXT NOT NULL,

  valor_total NUMERIC(10,2) NOT NULL,
  valor_parcela NUMERIC(10,2) NOT NULL,
  perc_pagador NUMERIC(5,2) NOT NULL,
  valor_parcela_pagador NUMERIC(10,2) NOT NULL,
  parcela_num INT NOT NULL DEFAULT 1,
  total_parcelas INT NOT NULL DEFAULT 1,

  categoria TEXT NOT NULL CHECK (categoria IN (
    'manutencao', 'vida', 'investimento', 'atrito'
  )),

  pagador TEXT NOT NULL,

  mes_referencia TEXT NOT NULL,
  ano_referencia INT NOT NULL,
  data_registro DATE NOT NULL DEFAULT CURRENT_DATE,

  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gastos_usuario_mes ON gastos(usuario_id, ano_referencia, mes_referencia);
CREATE INDEX idx_gastos_categoria ON gastos(usuario_id, categoria);

ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gastos_proprios" ON gastos
  FOR ALL USING (auth.uid() = usuario_id);
```

### Tabela `objetivos`

```sql
CREATE TABLE objetivos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id),

  tipo TEXT NOT NULL CHECK (tipo IN ('material', 'tempo')),
  nome TEXT NOT NULL,

  -- Materiais
  custo_total NUMERIC(12,2),
  valor_acumulado NUMERIC(12,2) DEFAULT 0,
  prazo_desejado_meses INT,

  -- Tempo (sem atrito — Tv ainda não vivido)
  horas_atuais_semana NUMERIC(5,2),
  horas_desejadas_semana NUMERIC(5,2),
  com_quem TEXT,

  prioridade INT DEFAULT 1,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE objetivos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "objetivos_proprios" ON objetivos
  FOR ALL USING (auth.uid() = usuario_id);
```

---

## 5. As equações em código (TypeScript)

Todas em `lib/calculos/`. Funções puras, testáveis.

### `lib/calculos/tempo.ts`

```typescript
// Tempo Produtivo: o que sobra depois do autocuidado basal
export function calcularTp(tabDiario: number = 10): number {
  const tb = 24;
  return tb - tabDiario;
}

// Tempo de Trabalho Líquido: trabalho que de fato gera receita
export function calcularTtl(ttSemanal: number, teSemanal: number): number {
  return Math.max(0, ttSemanal - teSemanal);
}

// Tempo de Vida realizado: o que sobra do Tp após o trabalho
export function calcularTvReal(
  tpDiario: number,
  ttSemanal: number
): number {
  const tpSemanal = tpDiario * 7;
  return Math.max(0, tpSemanal - ttSemanal);
}

// Razão de prosperidade temporal
export function razaoTv(tvReal: number, tvDesejado: number): number {
  if (tvDesejado === 0) return 1;
  return tvReal / tvDesejado;
}
```

### `lib/calculos/receita.ts`

```typescript
export function calcularRl(
  receitaBruta: number,
  raImpostos: number,
  raOperacao: number
): number {
  return Math.max(0, receitaBruta - raImpostos - raOperacao);
}

export function calcularRaTotal(
  raImpostos: number,
  raOperacao: number
): number {
  return raImpostos + raOperacao;
}
```

### `lib/calculos/vh.ts`

```typescript
// Valor da Hora Bruto (ilusão do usuário)
export function calcularVhb(
  receitaBruta: number,
  ttSemanal: number
): number {
  const ttMensal = ttSemanal * 4.33;
  if (ttMensal === 0) return 0;
  return receitaBruta / ttMensal;
}

// Valor da Hora Líquido (realidade — o que muda decisão)
export function calcularVhl(
  receitaLiquida: number,
  ttlSemanal: number
): number {
  const ttlMensal = ttlSemanal * 4.33;
  if (ttlMensal === 0) return 0;
  return receitaLiquida / ttlMensal;
}

// Delta de atrito por hora — o veneno invisível
export function deltaVh(vhb: number, vhl: number): number {
  return vhb - vhl;
}

// Tradução de gasto em horas de vida (usa Vhl para ser honesto)
export function dinheiroEmHoras(valor: number, vhl: number): number {
  if (vhl === 0) return 0;
  return valor / vhl;
}
```

### `lib/calculos/riqueza.ts`

```typescript
// Razão Riqueza: receita líquida vs gastos mensais
export function razaoRiqueza(
  receitaLiquida: number,
  gastosMensais: number
): number {
  if (gastosMensais === 0) return 1;
  return receitaLiquida / gastosMensais;
}
```

### `lib/calculos/prosperidade.ts`

```typescript
// Razão Prosperidade: tempo de vida real vs desejado
export function razaoProsperidade(
  tvRealSemanal: number,
  tvDesejadoSemanal: number
): number {
  if (tvDesejadoSemanal === 0) return 1;
  return tvRealSemanal / tvDesejadoSemanal;
}
```

### `lib/calculos/vida-plena.ts`

```typescript
export function grauVidaPlena(
  riqueza: number,
  prosperidade: number
): number {
  return riqueza * prosperidade;
}

export function classificarVidaPlena(grau: number): string {
  if (grau >= 1) return "Vida plena equilibrada";
  if (grau >= 0.7) return "Próxima do equilíbrio";
  if (grau >= 0.4) return "Em construção";
  return "Aperto de início";
}
```

### `lib/calculos/objetivos.ts`

```typescript
import { calcularVhl } from './vh';

// Horas necessárias para alcançar objetivo material
export function horasParaObjetivoMaterial(
  custoObjetivo: number,
  vhl: number
): number {
  if (vhl === 0) return Infinity;
  return custoObjetivo / vhl;
}

// Meses para alcançar, dado o Ttl mensal atual
export function mesesParaObjetivoMaterial(
  custoObjetivo: number,
  vhl: number,
  ttlMensal: number
): number {
  if (ttlMensal === 0 || vhl === 0) return Infinity;
  const horasNecessarias = custoObjetivo / vhl;
  return horasNecessarias / ttlMensal;
}

// Receita anual potencial perdida ao reduzir Tt para aumentar Tv
export function custoOportunidadeAnual(
  horasASemanaisRecuperadas: number,
  vhl: number
): number {
  return horasASemanaisRecuperadas * vhl * 52;
}
```

---

## 6. Fases de desenvolvimento

### Fase 0 — Setup (1-2 dias)
- [ ] Criar repositório `samear` no GitHub
- [ ] Inicializar Next.js 14 + TypeScript + Tailwind
- [ ] Instalar shadcn/ui base
- [ ] Configurar tema (cores, fontes) em `globals.css`
- [ ] Criar conta Supabase, projeto novo
- [ ] Configurar `.env.local`
- [ ] Primeiro commit, deploy inicial no Vercel

### Fase 1 — Frontend com dados mockados (1-2 semanas)
- [ ] Layout com topbar + navtabs (Painel · Dinheiro · Tempo · Registrar)
- [ ] Página Painel com dados estáticos (igual ao protótipo HTML)
- [ ] Seletor de persona (Rafael/Marcela/Ambos) funcional com mock
- [ ] Componentes reutilizáveis (cards, barras, badges)
- [ ] Páginas Dinheiro, Tempo, Registrar como skeleton

### Fase 2 — Banco e autenticação (1 semana)
- [ ] Migrações SQL para criar tabelas no Supabase
- [ ] Setup Supabase Auth (Google + email)
- [ ] Páginas de login e signup
- [ ] Rotas protegidas (middleware)
- [ ] Onboarding (5 perguntas: 2 de tempo, 3 de receita)

### Fase 3 — Migração de dados (3-5 dias)
- [ ] Script Node.js para ler planilha Apps Script via API Google Sheets
- [ ] Importar gastos retroativos para Supabase
- [ ] Validar integridade
- [ ] Apps Script continua em paralelo durante validação

### Fase 4 — Painel com dados reais (1-2 semanas)
- [ ] Conectar Painel ao Supabase
- [ ] Página Registrar funcional (CRUD de gastos)
- [ ] Páginas Dinheiro e Tempo com gráficos reais (Recharts)
- [ ] Cálculo dinâmico de Riqueza, Prosperidade, Vhb/Vhl, Grau de Vida Plena

### Fase 5 — Validação com Marcela (2 semanas)
- [ ] Marcela como segundo usuário
- [ ] Compartilhamento de dados de casal (modelo a definir)
- [ ] Iterar UX com feedback dela

### Fase 6 — Validação com amigos (4 semanas)
- [ ] 5-10 amigos selecionados
- [ ] Feedback estruturado
- [ ] Refinar produto

### Fase 7 — Preparação SaaS comercial (futuro)
- [ ] Stripe
- [ ] Landing page pública
- [ ] Onboarding refinado
- [ ] Plano gratuito + planos pagos

---

## 7. Decisões técnicas importantes

### Por que Next.js 14?
- React Server Components reduzem JS no cliente
- Server Actions eliminam API REST customizada
- Vercel deploy nativo

### Por que Supabase?
- PostgreSQL real (não NoSQL fechado)
- Row Level Security nativo
- Auth integrada
- Plano gratuito generoso
- Migração futura para RDS é direta

### Por que shadcn/ui?
- Componentes copiados, não dependência
- Estética customizável
- Acessibilidade nativa
- Bundle controlado

### Por que TypeScript?
- Refatorações seguras
- Documentação implícita via tipos
- Pegada de erros em compile time

---

## 8. Variáveis de ambiente

`.env.local` (NÃO commitar):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

`.env.example` (commitado):

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 9. Convenções de código

- **Nomes em português** para domínio (gastos, receita, prosperidade)
- **Nomes em inglês** para conceitos técnicos universais (useState, Button)
- **Arquivos:** kebab-case
- **Componentes React:** PascalCase
- **Funções utilitárias:** camelCase
- **Comentários** apenas em decisões não óbvias

---

## 10. Testes (mínimo viável)

- **Equações em `lib/calculos/`:** Jest, casos de borda incluídos
- **Componentes críticos:** React Testing Library
- **Não testar:** UI cosmética, integrações Supabase no início

---

## 11. Checklist antes de deploy

- [ ] Build sem warnings (`npm run build`)
- [ ] Lint passa (`npm run lint`)
- [ ] Type-check passa
- [ ] Testado em desktop e mobile
- [ ] Equações revisadas (Vhb, Vhl, Riqueza, Prosperidade, Vida Plena)
- [ ] Sem dados sensíveis commitados

---

## 12. Recursos

- **Next.js 14 docs:** https://nextjs.org/docs
- **Supabase docs:** https://supabase.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind:** https://tailwindcss.com/docs
- **Recharts:** https://recharts.org

---

*Documento técnico vivo. Atualizar conforme decisões mudam.*
