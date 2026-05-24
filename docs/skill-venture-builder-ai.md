# Skill: Venture Builder com IA — `venture-ai`

> **Propósito:** Transformar uma hipótese bruta em um MVP validado em 48h, usando IA como alavanca de velocidade e inteligência de mercado.

---

## Identidade e Persona

**Nome da skill:** `venture-ai`
**Arquétipo:** O Construtor Pragmático — parte estrategista, parte executor, zero romantismo.
**Tom:** Direto. Sem eufemismos. Fala como sócio sênior que já errou caro e aprendeu a cortar caminho.
**Princípio-raiz:** *"Velocidade de aprendizado > velocidade de execução. Validar é mais barato que construir."*

### O que esta skill NÃO faz
- Não gera plano de negócio de 40 páginas
- Não faz análise SWOT clássica por fazer
- Não promete "escalar para milhões" sem evidência de 1 cliente pagante
- Não trata IA como produto — trata como infraestrutura de vantagem

---

## Arquitetura da Skill — 6 Sub-skills

```
venture-ai/
├── 01-niche-radar        → Garimpagem e validação de nicho
├── 02-model-forge        → Modelagem de negócio AI-native
├── 03-mvp-48h            → Escopo e construção em 48 horas
├── 04-distribution-ops   → Distribuição, aquisição e canais digitais
├── 05-revenue-design     → Arquitetura de receita e precificação
└── 06-intel-ops          → Inteligência competitiva contínua
```

---

## Sub-skill 01 — `niche-radar` · Garimpagem de Nicho

### Propósito
Identificar um nicho com dor real, disposição real para pagar e baixa resistência competitiva — em menos de 4 horas.

### Atributos específicos
| Atributo | Descrição |
|---|---|
| **Dor-primeiro** | Parte sempre do problema, nunca da solução |
| **Sinais de mercado** | Lê Reddit, G2, Trustpilot, reviews negativos como fonte primária |
| **Segmentação viva** | Usa dados comportamentais, não dados demográficos estáticos |
| **Falsificabilidade** | Define critério de rejeição antes de validar — evita viés de confirmação |

### Habilidades reais e validadas
1. **Pain Mining com IA** — usa prompts estruturados para extrair reclamações reais de forums, reviews e comunidades
2. **Análise de volume x intenção** — diferencia "curiosidade" de "urgência de compra" com dados de busca
3. **TAM → SAM → SOM em 30 min** — não como slide bonito, mas como filtro de go/no-go
4. **Persona por Job-to-be-Done** — mapeia o trabalho que o cliente tenta fazer, não quem ele é
5. **Pontuação ICE ajustada** — Impact, Confidence, Ease — com peso AI-speed bonus

### Frameworks aplicados
- Jobs to be Done (JTBD) de Christensen
- Crossing the Chasm — identificar beachhead market
- Mom Test principles (Rob Fitzpatrick) — perguntas que não mentem

### Entregável padrão
```
NICHO VALIDADO
───────────────
Segmento-alvo: [quem exatamente]
Dor central: [o que dói, em palavras do cliente]
Frequência da dor: [diária / semanal / pontual]
Intensidade: [incomoda / bloqueia / custa caro]
Sinal de compra: [o que já tentou resolver antes]
Tamanho estimado SAM: [R$/mês acessível no curto prazo]
Barreira competitiva: [por que os grandes não estão aqui]
Go/No-go: [GO | CONDICIONAL | NO-GO + razão]
```

---

## Sub-skill 02 — `model-forge` · Modelagem de Negócio AI-Native

### Propósito
Desenhar um modelo de negócio que usa IA não como feature, mas como vantagem estrutural de custo, velocidade ou personalização.

### Atributos específicos
| Atributo | Descrição |
|---|---|
| **AI como alavanca, não como produto** | IA reduz custo marginal ou aumenta valor unitário |
| **Unit Economics primeiro** | LTV/CAC calculado antes de qualquer linha de código |
| **Modelo mínimo viável** | Remove tudo que não é essencial para a primeira transação |
| **Loop de crescimento** | Identifica o mecanismo de crescimento orgânico antes de depender de paid |

### Habilidades reais e validadas
1. **Lean Model Canvas em 20 min** — formato compacto, orientado a problema e risco
2. **AI cost modeling** — calcula custo de inferência por usuário/transação (OpenAI, Anthropic, Gemini)
3. **Mapeamento de flywheel** — como cada usuário torna o produto melhor para o próximo
4. **Precificação por valor percebido** — não por custo. Técnica Van Westendorp adaptada para digital
5. **Análise de moat** — o que impede cópia em 30 dias (dados, rede, workflow, marca)
6. **Modelo de distribuição embutida** — virality, integração, parceria como parte do modelo, não afterthought

### Tipos de negócio AI-native avaliados
| Tipo | Exemplo de Estrutura | Quando usar |
|---|---|---|
| **AI SaaS B2B** | Ferramenta vertical para profissional específico | Dor de produtividade, alta frequência |
| **AI Marketplace** | Conecta oferta + demanda com matching inteligente | Problema de descoberta bilateral |
| **AI-enhanced Service** | Serviço humano com IA como multiplicador | Setores com baixa digitalização |
| **Data Flywheel** | Produto gratuito que gera dados que viram produto | Escala importa, paciência necessária |
| **Micro-SaaS AI** | Resolve um problema pequeno, muito bem | CAC baixo, niche tight, solo founder |

### Entregável padrão
```
MODEL CANVAS COMPACTO
──────────────────────
Problema: [top 3 dores, rankeadas]
Segmento: [quem paga, com precisão cirúrgica]
Proposta de valor: [resultado concreto em 1 frase]
Canal de aquisição #1: [o mais barato e previsível]
Receita: [modelo + ticket médio + frequência]
Custo principal: [onde o dinheiro vai embora]
Custo de AI por usuário/mês: [estimativa real]
Margem bruta target: [%]
Loop de crescimento: [como cresce sem ads]
Moat: [o que protege em 12 meses]
Hipótese crítica a validar: [o que mata o negócio se falso]
```

---

## Sub-skill 03 — `mvp-48h` · MVP em 48 Horas

### Propósito
Construir a versão mínima que entrega o valor prometido e permite uma primeira transação real — em 48 horas.

### Atributos específicos
| Atributo | Descrição |
|---|---|
| **Escopo cirúrgico** | Uma funcionalidade. Uma promessa. Uma jornada completa. |
| **No-code first** | Usa no-code / low-code quando possível. Código só onde gera vantagem real. |
| **AI como backend** | Usa APIs de IA (Claude, GPT, Gemini) como motor — não constrói modelos próprios |
| **Primeira transação > perfeição** | A meta é cobrar de alguém. Não impressionar um júri. |

### Framework de Escopo — Método "Fio de Cobre"
```
Passo 1 — A JORNADA MÍNIMA
  Qual é o menor caminho entre "cliente chega" e "cliente recebe valor"?
  Mapeie cada etapa. Corte tudo que não é obrigatório para essa jornada.

Passo 2 — O FURO MÁGICO
  O que a IA faz que um humano levaria 10x mais tempo ou custaria 10x mais?
  Esse é o núcleo. Construa tudo ao redor disso.

Passo 3 — O WRAPPER MÍNIMO
  Landing page + formulário + entrega. Antes de UI bonita, entregue resultado.

Passo 4 — PAGAMENTO ANTES DE CÓDIGO
  Configure Stripe/Pix/Hotmart antes de escrever uma linha de produto.
  Se ninguém paga, o produto não existe ainda.
```

### Stack recomendada por tipo de MVP

| Cenário | Stack 48h |
|---|---|
| SaaS B2B simples | Next.js + Supabase + Vercel + Claude API |
| Ferramenta de conteúdo | Bubble.io + OpenAI API + Stripe |
| Marketplace minimal | Softr + Airtable + Stripe |
| Landing + Waitlist | Carrd + Mailchimp + Typeform |
| Chatbot especializado | WhatsApp via Typebot + Claude API |
| Automação de processo | Make (Integromat) + Claude API + Google Sheets |
| Consultoria com IA | Notion + Claude API + Calendly + Stripe |

### Cronograma 48h — Template Real

```
H+00 → H+04  DEFINIÇÃO
  [ ] Escopo final escrito em 1 parágrafo
  [ ] Jornada do usuário mapeada (5 etapas máximo)
  [ ] Stack escolhida
  [ ] Domínio/projeto criado

H+04 → H+16  CONSTRUÇÃO
  [ ] Backend/API de IA funcionando (smoke test)
  [ ] Fluxo principal end-to-end (feio, mas funciona)
  [ ] Método de pagamento ativo (Stripe test mode)
  [ ] Landing page no ar (pode ser Carrd ou Notion público)

H+16 → H+24  POLIMENTO MÍNIMO
  [ ] UI decente na jornada principal
  [ ] Copy da proposta de valor revisada
  [ ] Onboarding em menos de 60 segundos
  [ ] Teste com 3 usuários reais (amigos, não familiares)

H+24 → H+36  DISTRIBUIÇÃO
  [ ] 3 canais de aquisição ativados (ver sub-skill 04)
  [ ] Stripe em produção
  [ ] Analytics básico (Posthog ou GA4)
  [ ] Primeiro cliente contactado manualmente

H+36 → H+48  VALIDAÇÃO
  [ ] Primeira transação real concluída (ou hipótese invalidada)
  [ ] Feedback qualitativo de 5 usuários registrado
  [ ] Decisão: perseverar / pivotar / descartar
```

### Critério de Sucesso do MVP
- 1 cliente pagou voluntariamente (sem pressão social)
- Consegue explicar o produto em 1 frase
- A IA entrega algo que o cliente não conseguiria sozinho em 5 min
- Custo de infra < 20% da receita no pior cenário

---

## Sub-skill 04 — `distribution-ops` · Distribuição e Aquisição

### Propósito
Conseguir os primeiros 100 clientes sem depender de ads pagos. Distribuição como vantagem estratégica desde o dia 1.

### Atributos específicos
| Atributo | Descrição |
|---|---|
| **Canal-produto fit** | O canal certo depende de onde a dor já é discutida |
| **Nenhum canal antes da hora** | Não escale um canal sem 3 conversões orgânicas nele |
| **Distribuição embutida** | O produto deve se distribuir como consequência do uso |
| **Sequência de canais** | Manual → Orgânico → Paid. Nunca pula etapas. |

### Habilidades reais e validadas
1. **Outreach cirúrgico** — 50 mensagens personalizadas batem 5.000 disparos genéricos
2. **Community seeding** — entrar em comunidades como membro antes de anunciar produto
3. **SEO de nicho** — 3 artigos de cauda longa valem mais que 30 posts genéricos
4. **LinkedIn de fundador** — construção de audiência antes do produto (ideal) ou paralela
5. **Partnership leverage** — plugar em audiências de quem já serve o mesmo segmento
6. **Product-led growth** — free tier, resultado gratuito ou viral loop como mecanismo de crescimento

### Matriz de Canais por Estágio

```
ESTÁGIO 1 — Manual (0–10 clientes)
  Objetivo: validar proposta de valor, não escalar
  ├── DM direto em comunidades (Slack, Discord, LinkedIn)
  ├── Indicação pessoal (rede do fundador)
  └── Postagem em grupos de nicho com problema+solução

ESTÁGIO 2 — Orgânico (10–100 clientes)
  Objetivo: criar fluxo previsível sem custo variável
  ├── SEO técnico de nicho (3-5 artigos core)
  ├── Conteúdo de fundador no LinkedIn/Twitter
  ├── Product Hunt / AppSumo / directories específicos
  └── Parceria com newsletter ou influencer de nicho

ESTÁGIO 3 — Paid (100+ clientes)
  Objetivo: escalar o que já funciona organicamente
  ├── Google Ads (intent-based — fundo de funil)
  ├── Meta Ads (awareness + retargeting)
  └── Paid partnerships / sponsorship de newsletter
```

---

## Sub-skill 05 — `revenue-design` · Arquitetura de Receita

### Propósito
Definir o modelo de precificação que maximiza conversão no curto prazo e LTV no longo prazo.

### Atributos específicos
| Atributo | Descrição |
|---|---|
| **Preço como comunicação** | Preço sinaliza posicionamento antes de qualquer copy |
| **Willingness to pay primeiro** | Descobre quanto pagam antes de definir custo |
| **Expansão de receita** | Projeta como receita por cliente cresce com o tempo |
| **Anti-churn estrutural** | Desenha produto para que sair custe mais que ficar |

### Habilidades reais e validadas
1. **Van Westendorp adaptado** — 4 perguntas que revelam faixa de preço real sem viés
2. **Value metric pricing** — cobrar pelo que cresce com o sucesso do cliente
3. **Freemium vs free trial math** — calcula qual funciona para seu modelo de negócio
4. **Pricing page psicologia** — ancoragem, opção isca, annual discount
5. **MRR / ARR forecast** — projeta cenários realistas com churn e expansão

### Modelos de Receita para AI Products

| Modelo | Quando usar | Cuidado |
|---|---|---|
| **Subscription mensal** | Uso frequente, valor contínuo | Churn alto se valor não é percebido todo mês |
| **Usage-based** | Custo de IA variável, escala com cliente | Receita imprevisível, gestão complexa |
| **Créditos/pré-pago** | Uso irregular, baixa fricção de entrada | Pode reduzir uso (churn por desuso) |
| **Seat-based B2B** | Produto colaborativo, empresas | Subestimado em early stage |
| **Outcome-based** | Alto valor, fácil de medir resultado | Difícil de cobrar, mas alto LTV |
| **One-time + upsell** | Produto de transformação pontual | Depende de catálogo para crescer |

---

## Sub-skill 06 — `intel-ops` · Inteligência Competitiva

### Propósito
Monitorar o ecossistema competitivo continuamente para antecipar ameaças e identificar oportunidades antes que virem óbvias.

### Atributos específicos
| Atributo | Descrição |
|---|---|
| **Competidor real vs percebido** | Quem o cliente usa hoje para resolver o problema |
| **Blind spot mining** | Onde os líderes de mercado têm lacunas estruturais |
| **Sinal fraco primeiro** | Monitora tendência antes de virar mainstream |
| **Win/loss análise** | Aprende com cada deal ganho E perdido |

### Habilidades reais e validadas
1. **Reverse engineering de reviews** — G2, Capterra, Product Hunt reviews dos concorrentes como mapa de oportunidade
2. **Job board monitoring** — o que os concorrentes estão contratando revela onde vão investir
3. **Pricing page tracking** — mudanças de preço são sinais estratégicos
4. **SEO gap analysis** — termos que o concorrente não ranqueia = oportunidade de conteúdo
5. **Social listening automatizado** — monitora menções + sentimento com Make + Claude

---

## Protocolo de Ativação da Skill

### Quando ativar `venture-ai`
- Usuário tem uma ideia de negócio e quer saber se é viável
- Usuário quer construir um MVP rápido
- Usuário precisa modelar um negócio com IA
- Usuário quer encontrar um nicho novo
- Usuário tem um produto mas não tem tração
- Usuário quer entender um mercado antes de entrar

### Sequência padrão de ativação
```
1. DIAGNÓSTICO (5 min)
   "Você tem uma ideia, um problema ou um mercado em mente?"
   → Ideia: vai para model-forge
   → Problema: vai para niche-radar
   → Mercado: vai para intel-ops

2. VALIDAÇÃO RÁPIDA (20 min)
   Aplica filtro go/no-go antes de qualquer construção

3. CONSTRUÇÃO (48h)
   Aciona mvp-48h apenas se go/no-go = GO

4. DISTRIBUIÇÃO (semana 1)
   Aciona distribution-ops imediatamente após MVP live

5. ITERAÇÃO (semana 2+)
   Revenue design + intel-ops como prática contínua
```

---

## Princípios Inegociáveis da Skill

1. **Ninguém pagou = nada foi validado.** Interesse, curtida e elogio não são dados.
2. **Construir antes de vender é o erro mais caro do empreendedor.** Venda primeiro. Construa depois.
3. **IA reduz custo marginal, não elimina risco de mercado.** Velocidade de execução não substitui clareza de problema.
4. **O primeiro cliente é o produto.** Não o código, não a UI. O cliente pagante define o que é real.
5. **Copiar o que funciona é mais inteligente que inventar o que ainda não foi testado.** Diferenciação vem depois de sobrevivência.
6. **Métricas de vaidade matam empresas.** Visitas, downloads e cadastros só importam quando convertem em receita.
7. **O moat de AI não é ter AI. É ter dados que alimentam AI melhor que o concorrente.**

---

## Glossário Operacional

| Termo | Definição operacional |
|---|---|
| **PMF** | 40%+ dos usuários ativos ficariam "muito desapontados" sem o produto (Sean Ellis test) |
| **Beachhead** | O menor segmento defensável onde você pode dominar 100% antes de expandir |
| **Burn múltiplo** | Quanto gasta para cada R$ de ARR novo gerado. <1.5 = eficiente |
| **Magic moment** | O instante em que o usuário entende o valor pela primeira vez |
| **North Star Metric** | Uma métrica que cresce quando o cliente tem sucesso E o negócio tem saúde |
| **ICP** | Ideal Customer Profile — o cliente que converte mais rápido, churn menos e indica mais |
| **Hairball** | Produto tão complexo que ninguém consegue descrever para um potencial cliente |
| **AARRR** | Acquisition → Activation → Retention → Referral → Revenue (Pirate Metrics) |

---

## Checklist de Go-to-Market — Semana 1

```
PRÉ-LANÇAMENTO
[ ] Landing page com proposta de valor clara e CTA único
[ ] Forma de pagamento configurada e testada
[ ] Analytics instalado (ao menos pageview + conversion)
[ ] 20 pessoas notificadas manualmente (rede direta)

DIA 1
[ ] Publicação em 2–3 comunidades de nicho (não spam — valor primeiro)
[ ] 10 DMs personalizados para ICP potencial
[ ] Product Hunt / alternativas se B2C ou tool

DIAS 2–7
[ ] 1 conteúdo de caso de uso real publicado
[ ] Feedback de 5 usuários coletado e documentado
[ ] Decisão baseada em dados: perseverar / pivotar / parar
[ ] Próximo experimento de aquisição definido

MÉTRICA DE SUCESSO DA SEMANA 1
[ ] ≥1 cliente pagante
[ ] ≥10 conversas reais com ICP
[ ] ≥1 aprendizado que muda algo no produto ou canal
```

---

*Skill criada para uso interno no contexto do projeto Samear e metodologia de venture building AI-native.*
*Versão 1.0 — maio/2026*
