# Samear — Especificação Técnica do MVP

**Versão:** 1.0
**Última atualização:** maio/2026
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
- **Gráficos:** Recharts (compatibilidade nativa com React)
- **Forms:** react-hook-form + zod (validação)
- **Estado global:** Zustand (leve, simples) ou Context API
- **Datas:** date-fns
- **Ícones:** lucide-react

### Backend
- **Database:** PostgreSQL via Supabase
- **Auth:** Supabase Auth (Google OAuth + email/senha)
- **API:** Supabase REST + Server Actions do Next.js (sem precisar de backend separado)
- **Row Level Security:** ativado em todas as tabelas

### Hospedagem (custo zero inicial)
- **Frontend:** Vercel (plano Hobby)
- **Banco/Auth:** Supabase (plano Free)
- **Domínio:** `samear.vercel.app` no início, domínio próprio quando escalar

### Desenvolvimento
- **Repositório:** GitHub privado `rafaelqrangel/samear`
- **IDE:** Claude Code (terminal + VS Code extension)
- **Versionamento:** Git com branches `main` (produção) e `dev` (desenvolvimento)

---

## 3. Estrutura de pastas

```
samear/
├── app/                          # App Router (Next.js 14)
│   ├── (auth)/                   # Rotas de autenticação
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (app)/                    # Área autenticada
│   │   ├── layout.tsx            # Layout com topbar + navtabs
│   │   ├── painel/page.tsx       # Painel principal
│   │   ├── dinheiro/page.tsx     # Aba detalhe financeiro
│   │   ├── tempo/page.tsx        # Aba detalhe temporal
│   │   ├── registrar/page.tsx    # Aba de registro (entrada de dados)
│   │   └── onboarding/page.tsx   # Setup inicial
│   ├── api/                      # Endpoints customizados (se precisar)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Estilos globais
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── painel/                   # Componentes específicos do painel
│   ├── dinheiro/                 # Componentes da aba dinheiro
│   ├── tempo/                    # Componentes da aba tempo
│   └── registrar/                # Componentes da aba registrar
├── lib/
│   ├── supabase/                 # Cliente Supabase
│   │   ├── client.ts             # Browser client
│   │   └── server.ts             # Server client
│   ├── calculos/                 # Equações do Samear
│   │   ├── tempo.ts              # Tb, Tab, Td, Te, Tl, Tt, Tv
│   │   ├── vh.ts                 # Vh = Receita / Tt
│   │   ├── riqueza.ts            # Razão Riqueza
│   │   ├── prosperidade.ts       # Razão Prosperidade
│   │   └── vida-plena.ts         # Riqueza × Prosperidade
│   ├── utils.ts                  # Helpers gerais
│   └── tipos.ts                  # Types TypeScript
├── public/
│   └── samear-logo.svg
├── styles/
│   └── theme.css                 # Variáveis CSS do tema
├── .env.local                    # Variáveis de ambiente (NÃO comitar)
├── .env.example                  # Template das variáveis
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 4. Schema do banco (Supabase / PostgreSQL)

### Tabela `usuarios`
*Estende `auth.users` do Supabase com dados do Samear.*

```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  receita_mensal NUMERIC(10,2),       -- receita bruta declarada no onboarding
  tt_semanal NUMERIC(5,2),            -- horas trabalhadas/semana (default 40)
  tab_diario NUMERIC(4,2),            -- horas autocuidado basal/dia (default 10)
  expectativa_vida INT,               -- ex: 76 (anos)
  data_nascimento DATE,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: usuário só vê seus próprios dados
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "usuario_proprio" ON usuarios
  FOR ALL USING (auth.uid() = id);
```

### Tabela `gastos`
*Substitui a aba GASTOS do Apps Script.*

```sql
CREATE TABLE gastos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id),

  -- Quem fez o gasto (pessoa)
  titular TEXT NOT NULL,              -- ex: "Rafael", "Marcela", "Casa"

  -- O que foi
  descricao TEXT NOT NULL,

  -- Valores
  valor_total NUMERIC(10,2) NOT NULL,
  valor_parcela NUMERIC(10,2) NOT NULL,
  perc_pagador NUMERIC(5,2) NOT NULL,     -- 0 a 100
  valor_parcela_pagador NUMERIC(10,2) NOT NULL,
  parcela_num INT NOT NULL DEFAULT 1,
  total_parcelas INT NOT NULL DEFAULT 1,

  -- Categorização (4 caixas)
  categoria TEXT NOT NULL CHECK (categoria IN (
    'manutencao', 'vida', 'investimento', 'atrito'
  )),

  -- Conta pagadora (quem ressarce)
  pagador TEXT NOT NULL,

  -- Referência temporal
  mes_referencia TEXT NOT NULL,           -- ex: "05 MAI"
  ano_referencia INT NOT NULL,            -- ex: 2026
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
*Substitui o que hoje não existe — objetivos materiais e de tempo.*

```sql
CREATE TABLE objetivos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id),

  tipo TEXT NOT NULL CHECK (tipo IN ('material', 'tempo')),
  nome TEXT NOT NULL,                     -- ex: "Casa em Teresópolis", "Horas com Malu"

  -- Para objetivos materiais
  custo_total NUMERIC(12,2),              -- ex: 2.000.000 (casa)
  valor_acumulado NUMERIC(12,2) DEFAULT 0,
  prazo_desejado_meses INT,

  -- Para objetivos de tempo
  horas_atuais_semana NUMERIC(5,2),
  horas_desejadas_semana NUMERIC(5,2),
  com_quem TEXT,                          -- ex: "Malu", "Marcela"

  prioridade INT DEFAULT 1,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE objetivos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "objetivos_proprios" ON objetivos
  FOR ALL USING (auth.uid() = usuario_id);
```

### Tabela `receitas` (futura)
*Atualmente receita é campo único no usuário. Tabela criada se precisar histórico.*

```sql
CREATE TABLE receitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  fonte TEXT NOT NULL,                    -- ex: "Salário", "Freelance", "Bônus"
  valor NUMERIC(10,2) NOT NULL,
  mes_referencia TEXT NOT NULL,
  ano_referencia INT NOT NULL,
  recorrente BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE receitas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "receitas_proprias" ON receitas
  FOR ALL USING (auth.uid() = usuario_id);
```

---

## 5. As equações em código

Todas em `lib/calculos/`. Funções puras, testáveis isoladamente.

### `lib/calculos/tempo.ts`

```typescript
export function calcularTl(
  tabDiario: number,
  teDiario: number = 0
): { tb: number; tab: number; td: number; te: number; tl: number } {
  const tb = 24;
  const td = tb - tabDiario;   // Tempo Disponível (ex-Tba)
  const tl = td - teDiario;
  return { tb, tab: tabDiario, td, te: teDiario, tl };
}

export function distribuirTlSemanal(
  tlDiario: number,
  ttSemanal: number
): { ttSemanal: number; tvSemanal: number; tlSemanal: number } {
  const tlSemanal = tlDiario * 7;
  const tvSemanal = tlSemanal - ttSemanal;
  return { ttSemanal, tvSemanal, tlSemanal };
}
```

### `lib/calculos/vh.ts`

```typescript
export function calcularVh(
  receitaMensal: number,
  ttSemanal: number
): number {
  const ttMensal = ttSemanal * 4.33;
  return receitaMensal / ttMensal;
}

export function dinheiroEmHoras(valor: number, vh: number): number {
  return valor / vh;
}
```

### `lib/calculos/riqueza.ts`

```typescript
export function razaoRiqueza(
  receitaMensal: number,
  gastosMensais: number
): number {
  return receitaMensal / gastosMensais;
}
```

### `lib/calculos/prosperidade.ts`

```typescript
export function razaoProsperidade(
  tempoDisponivelSemanal: number,
  tempoDesejadoSemanal: number
): number {
  return tempoDisponivelSemanal / tempoDesejadoSemanal;
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

---

## 6. Fases de desenvolvimento

### Fase 0 — Setup (1-2 dias)
- [ ] Criar repositório `samear` no GitHub
- [ ] Inicializar projeto Next.js 14 com TypeScript + Tailwind
- [ ] Instalar shadcn/ui base
- [ ] Configurar tema (cores, fontes) em `globals.css`
- [ ] Criar conta Supabase, projeto novo
- [ ] Configurar `.env.local` com credenciais Supabase
- [ ] Primeiro commit, deploy inicial no Vercel

### Fase 1 — Frontend com dados mockados (1-2 semanas)
- [ ] Layout principal com topbar + navtabs (Painel · Dinheiro · Tempo · Registrar)
- [ ] Página Painel com dados estáticos (igual ao protótipo HTML)
- [ ] Seletor de persona (Rafael/Marcela/Ambos) funcional com mock
- [ ] Componentes reutilizáveis (cards, barras, badges)
- [ ] Páginas Dinheiro, Tempo, Registrar como skeleton

### Fase 2 — Banco e autenticação (1 semana)
- [ ] Migrações SQL para criar tabelas no Supabase
- [ ] Setup Supabase Auth (Google + email)
- [ ] Páginas de login e signup
- [ ] Rotas protegidas (middleware do Next.js)
- [ ] Onboarding básico (coletar receita, Tt semanal, Tab diário)

### Fase 3 — Migração de dados (3-5 dias)
- [ ] Script Node.js para ler planilha do Apps Script via API do Google Sheets
- [ ] Importar gastos retroativos para Supabase
- [ ] Validar integridade dos dados
- [ ] Apps Script continua rodando em paralelo durante validação

### Fase 4 — Painel com dados reais (1-2 semanas)
- [ ] Conectar Painel ao Supabase
- [ ] Página Registrar funcional (CRUD de gastos)
- [ ] Páginas Dinheiro e Tempo com gráficos reais (Recharts)
- [ ] Cálculo dinâmico de Riqueza, Prosperidade, Vh, Grau de Vida Plena

### Fase 5 — Validação com Marcela (2 semanas)
- [ ] Convidar Marcela como segundo usuário
- [ ] Compartilhamento de dados de casal (modelo a definir)
- [ ] Iterar UX com feedback dela

### Fase 6 — Validação com amigos (4 semanas)
- [ ] Convidar 5-10 amigos selecionados
- [ ] Coletar feedback estruturado
- [ ] Refinar conceito e produto

### Fase 7 — Preparação para SaaS comercial (futuro)
- [ ] Stripe para cobrança
- [ ] Landing page pública
- [ ] Onboarding refinado
- [ ] Plano gratuito + planos pagos

---

## 7. Decisões técnicas importantes

### Por que Next.js 14 (App Router)?
- React Server Components reduzem JavaScript no cliente
- Server Actions eliminam necessidade de API REST customizada
- SSG/ISR para landing pages institucionais
- Vercel deploy nativo

### Por que Supabase?
- PostgreSQL real (não NoSQL fechado como Firebase)
- Row Level Security nativo — privacidade por padrão
- Auth integrada com OAuth providers
- Generoso plano gratuito
- SQL aberto, migração fácil para AWS RDS depois se precisar

### Por que shadcn/ui (não Material UI ou Chakra)?
- Componentes copiados para o projeto, não dependência
- Estética customizável (combina com a paleta do Samear)
- Acessibilidade nativa (Radix UI por baixo)
- Tamanho de bundle controlado

### Por que TypeScript?
- Refatorações seguras quando o projeto crescer
- Documentação implícita via tipos
- Pegada de erros em tempo de compilação
- Padrão de mercado para projetos sérios

---

## 8. Variáveis de ambiente

`.env.local` (NÃO commitar):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...      # apenas server-side
```

`.env.example` (commitado):

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 9. Convenções de código

- **Nomes em português** para tipos, funções e variáveis de domínio (gastos, receita, prosperidade)
- **Nomes em inglês** para conceitos técnicos universais (useState, useEffect, Button)
- **Arquivos:** kebab-case (`painel-vida.tsx`, não `PainelVida.tsx`)
- **Componentes React:** PascalCase
- **Funções utilitárias:** camelCase
- **Sem comentários óbvios** — o código deve falar por si
- **Comentários explicativos** apenas em decisões não óbvias ou trade-offs

---

## 10. Testes (mínimo viável)

- **Equações em `lib/calculos/`:** testar com Jest, casos de borda incluídos
- **Componentes críticos:** testar renderização com React Testing Library
- **Não testar:** UI cosmética, integrações com Supabase (custoso de mockar no início)

---

## 11. Checklist de qualidade antes de cada deploy

- [ ] Build sem warnings (`npm run build`)
- [ ] Lint passa (`npm run lint`)
- [ ] Type-check passa (`npm run typecheck`)
- [ ] Testado em desktop e mobile (Chrome DevTools)
- [ ] Equações revisadas (Vh, Riqueza, Prosperidade, Vida Plena)
- [ ] Sem dados sensíveis commitados
- [ ] `.env.example` atualizado se nova variável foi adicionada

---

## 12. Recursos e links

- **Next.js 14 docs:** https://nextjs.org/docs
- **Supabase docs:** https://supabase.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Recharts:** https://recharts.org

---

*Documento técnico vivo. Atualizar à medida que decisões mudam.*
