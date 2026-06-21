# Semear — Contexto do Projeto

## O que é o Semear

**Semear é o ecossistema onde você arquiteta a vida que quer — equilibrando as duas forças que a definem: tempo e dinheiro.**

Não é um app de gestão financeira. É um sistema de navegação de vida. A maioria das pessoas vive ao sabor do vento — reage, improvisa, se perde. O Semear dá os instrumentos para navegar com intenção: o casco (base financeira), as velas (escolhas), a leitura dos mares (consciência de tempo e dinheiro) e os portos (objetivos).

Estratégia: **Oceano Azul** — a concorrência (Mobills, Guiabolso, YNAB) responde "para onde foi meu dinheiro?". O Semear responde "para onde vai a minha vida?".

## Stack

- **Frontend + Backend:** Next.js 14 + TypeScript
- **Estilo:** Tailwind CSS + shadcn/ui
- **Banco de dados:** Supabase (PostgreSQL)
- **Deploy:** Vercel
- **Repo:** https://github.com/rafaelqrangel/semear
- **Local:** `~/Developer/samear`

## Paleta visual

| Variável | Hex | Uso |
|---|---|---|
| peach | `#fdeee4` | Background geral |
| brown | `#2d2620` | Texto principal |
| rose | `#d4807a` | Primária / CTAs |
| mocha | `#8b6f5c` | Texto secundário |
| peach-mid | `#f5d9c8` | Superfícies secundárias |

**Fontes:** DM Serif Display (títulos) + Inter (corpo)

## Fundação Matemática

Equações centrais — o usuário nunca vê siglas, só frases humanas:

| Sigla | Equação | Frase no frontend |
|---|---|---|
| Rl | R − Ra | "Você acha que ganha R$X, mas seu dinheiro real é R$Y" |
| Vh | Rl ÷ (Tt × 4,33) | "Cada hora do seu trabalho vale R$X" |
| Tr | Tp − Tt | "Você tem Xh por semana para viver fora do trabalho" |
| C | M + V + D | Consumo total |
| Saldo | Rl − C − I | Termômetro de saúde financeira |
| GIF | Renda Passiva ÷ C × 100% | "X% das suas contas já se pagam sozinhas" |

Documento completo: `docs/Samear - Fundacao Matematica.md`

## Estrutura de arquivos

```
src/
  app/
    onboarding/page.tsx   — wizard de 5 blocos (Sprint 1 ✅)
    dashboard/page.tsx    — stub (Sprint 2)
  components/
    onboarding/           — Bloco1 a Bloco5 + ResultadoFinal
    ui/                   — shadcn components
  lib/
    calculations.ts       — toda a matemática do produto
  types/
    index.ts              — tipos TypeScript centrais
```

## Estado atual

- **Sprint 1 completa:** onboarding com 5 blocos funcionando, engine de cálculos, diagnóstico final
- **Próximo:** Sprint 2 — dashboard com os 3 vértices (Vh, GIF, ML) e as 4 caixas

## Decisões importantes

- O nome mudou de **Samear** para **Semear** (diretório local ainda é `samear`)
- O produto se posiciona **longe** do mercado de apps financeiros — é arquitetura de vida
- Usuário nunca vê equações — só frases em linguagem humana
- As 4 caixas: M (Manutenção), V (Vida), D (Desperdício), I (Investimento)

## Comandos úteis

```bash
cd ~/Developer/samear
npm run dev        # inicia em localhost:3000
npm run build      # verifica erros de compilação
git push           # envia para github.com/rafaelqrangel/semear
```
