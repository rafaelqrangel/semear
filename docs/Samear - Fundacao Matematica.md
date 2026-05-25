# Samear — Fundação Matemática e Glossário

**Documento de referência dos conceitos matemáticos aplicados no SaaS.**
**Versão:** 2.0 (mai/2026)
**Base literária:** Gustavo Cerbasi · Alexandre Assaf Neto · Brian Portnoy

> Este documento descreve todas as variáveis, equações e indicadores que movem o Samear por dentro. O usuário nunca vê esses termos — ele vê frases, termômetros e mensagens. Este documento existe para que desenvolvedores, designers e o time de produto falem a mesma língua.

---

## 1. Axioma Central

> **"A verdadeira riqueza não é medida em moeda, mas sim na quantidade de tempo livre que essa moeda consegue financiar."**
> — síntese de Portnoy + Cerbasi + Assaf Neto

O Samear cruza duas dimensões autônomas:

- **RIQUEZA** → dimensão financeira e patrimonial
- **PROSPERIDADE** → dimensão de tempo livre

A vida plena só existe quando ambas coexistem. Ter dinheiro sem tempo, ou tempo sem dinheiro, são formas diferentes de pobreza.

---

## 2. Glossário de Siglas

### 2.1 Dimensão Temporal

| Sigla | Nome completo | O que significa |
|-------|--------------|-----------------|
| **Tb** | Tempo Bruto | As 24 horas do dia. Constante absoluta e intransponível. É o teto de tudo. |
| **Tab** | Tempo de Autocuidado Basal | Horas dedicadas a sono, alimentação e higiene vividos com presença. Não é custo — é vida. Não se mede como perda. |
| **Tp** | Tempo Produtivo | O que resta das 24h depois do autocuidado. É o tempo disponível para o mundo. |
| **Tt** | Tempo de Trabalho | Horas semanais dedicadas ao trabalho que gera receita. Declarado pelo próprio usuário. |
| **Tr** | Tempo Restante | O tempo que sobra depois do trabalho. É dentro do Tr que os objetivos de vida devem se encaixar — ou não cabem. |
| **Vh** | Valor da Hora | Quanto vale, em reais líquidos, cada hora que o usuário entrega ao trabalho. É a moeda de conversão entre dinheiro e vida. |

> **Fase futura — To (Tempo Obrigatório):** A literatura aponta que o Tr pode ser inflado por obrigações não remuneradas: trânsito, burocracia, afazeres domésticos. Uma variável To capturaria esse "ralo oculto" e daria diagnóstico mais preciso. Equação futura: `Tr = Tp − Tt − To`. Não entra no MVP.

### 2.2 Dimensão Financeira — Receita

| Sigla | Nome completo | O que significa |
|-------|--------------|-----------------|
| **R** | Receita Bruta | Tudo que entra: salário, freelance, aluguéis, renda passiva, pensão, qualquer fonte. |
| **Ra** | Atrito da Receita | O que o sistema retira antes mesmo de o dinheiro chegar ao bolso: impostos, contribuições obrigatórias e custos estruturais do trabalho (transporte obrigatório, almoço fora, ferramentas indispensáveis). |
| **Rl** | Receita Líquida | O que efetivamente entra no bolso do usuário após o atrito estrutural. É a base de todos os cálculos do Samear. |

### 2.3 Dimensão Financeira — As 4 Caixas

Todo real que sai do bolso cai em uma das quatro caixas abaixo. Quando o Saldo é zero, as quatro somadas igualam a Receita Líquida.

| Sigla | Nome completo | O que significa |
|-------|--------------|-----------------|
| **M** | Manutenção | Gastos fixos e inevitáveis: moradia, escola, planos de saúde, assinaturas essenciais, contas recorrentes. São o custo de existir com a estrutura de vida atual. |
| **V** | Vida | Gastos variáveis por escolha: mercado, lazer, restaurantes, roupas, passeios. São o dinheiro que o usuário decide gastar conscientemente para viver. |
| **D** | Desperdício | Gastos que o próprio usuário julga desnecessários, mas que ainda ocorrem: juros de parcelamento evitável, multas, assinaturas esquecidas, conveniências que não valem o preço, compras por impulso. Não é o atrito do sistema — é a ineficiência pessoal. |
| **I** | Investimento | Dinheiro que sai hoje com a intenção de voltar maior amanhã: aportes em fundos, ações, previdência, reserva de emergência, pagamento antecipado de dívidas. Tem natureza diferente das outras caixas — não é consumo, é alocação de capital. |

> **Por que I não é despesa?**
> M, V e D são consumo — o dinheiro sai e é consumido. I é alocação de capital — o dinheiro sai mas aumenta o Patrimônio Líquido. Cerbasi é explícito: o investimento deve ser tratado como obrigação mensal, não como o que sobra. Tratá-lo como despesa distorceria a leitura de quanto o usuário realmente gasta versus quanto está construindo.

### 2.4 Dimensão Patrimonial

| Sigla | Nome completo | O que significa |
|-------|--------------|-----------------|
| **PB** | Patrimônio Bruto | Soma de todos os ativos: imóveis, veículos, investimentos, saldo em conta, previdência, qualquer bem com valor. |
| **Pa** | Passivos | Soma de todas as dívidas: financiamentos, saldo devedor de cartão, empréstimos, carnês. |
| **PL** | Patrimônio Líquido | O que o usuário efetivamente tem, descontando o que deve. É a fotografia real da sua riqueza acumulada. |
| **ML** | Meses de Liberdade | Quantos meses o usuário consegue manter seu padrão de vida sem trabalhar, usando apenas o patrimônio atual. Converte dinheiro na moeda que importa: tempo. |

### 2.5 Indicadores de Independência

| Sigla | Nome completo | O que significa |
|-------|--------------|-----------------|
| **GIF** | Grau de Independência Financeira | Percentual das despesas mensais coberto pela renda passiva real. Quando chega a 100%, o trabalho se torna opcional. |
| **PNIF** | Patrimônio Necessário para Independência Financeira | O valor total que o usuário precisa ter investido para que seus rendimentos reais cubram todas as suas despesas para sempre. É o destino final da jornada. |

### 2.6 Matemática do Dinheiro no Tempo

| Sigla | Nome completo | O que significa |
|-------|--------------|-----------------|
| **TN** | Taxa Nominal | A taxa de rendimento que os bancos anunciam. Não reflete o poder de compra real. |
| **Inf** | Inflação | O percentual de desvalorização da moeda ao longo do tempo. |
| **TR** | Taxa Real | A taxa de rendimento que de fato aumenta o poder de compra, descontando a inflação. É a única taxa usada nas projeções do Samear. |
| **PV** | Valor Presente | Quanto vale hoje um valor que será recebido ou pago no futuro. |
| **FV** | Valor Futuro | Para quanto crescerá um valor presente, dado um rendimento e um prazo. |
| **n** | Prazo | Número de meses ou anos de uma projeção. |
| **i** | Taxa de juros real mensal | A TR expressa em base mensal, usada nos cálculos de FV/PV. |
| **PMT** | Parcela / Aporte Mensal | O valor mensal necessário para atingir um objetivo financeiro em um prazo determinado. |
| **C** | Consumo Total | Soma dos gastos que efetivamente saem e não retornam: M + V + D. |
| **Saldo** | Saldo Mensal | O que sobra do Rl depois de todo consumo e investimento. O ideal é zero — significa que tudo foi alocado conscientemente. |

---

## 3. Equações — com explicação semântica

### 3.1 Tempo Produtivo

```
Tp = Tb − Tab
```
**O que diz:** "Das 24 horas do dia, subtraímos o tempo que você dedica a existir como ser vivo. O que sobra é o tempo disponível para o mundo."

Tab típico: 8h sono + 1,5h alimentação + 0,5h higiene = ~10h/dia. Tp ≈ 14h/dia.

---

### 3.2 Tempo Restante

```
Tr = Tp − Tt
```
**O que diz:** "Depois do autocuidado e do trabalho, quanto sobrou? É nesse espaço que sua vida real precisa caber."

Unidade: horas por semana. Tp semanal ≈ 98h. Se Tt = 40h, Tr = 58h/semana.

Frontend: *"Você tem X horas por semana para viver fora do trabalho."*

---

### 3.3 Valor da Hora de Trabalho

```
Vh = Rl / (Tt × 4,33)
```
**O que diz:** "Cada hora que você entrega ao trabalho vale R$ Vh líquidos. É com esse número que traduzimos qualquer gasto em horas de vida."

(4,33 = média de semanas por mês)

Frontend: *"Você ganha R$ X por hora de trabalho real."*

---

### 3.4 Custo de qualquer gasto em horas de vida

```
Custo_em_horas = Valor_do_gasto / Vh
```
**O que diz:** "Qualquer compra pode ser traduzida em quanto tempo de vida você precisou trabalhar para pagá-la."

Frontend: *"Este gasto de R$ X custou Y horas da sua vida."*
Exemplo: Um carro de R$ 80.000 a Vh = R$ 80/h custou 1.000 horas — ou 25 semanas de trabalho integral.

---

### 3.5 Receita Líquida

```
Rl = R − Ra
```
**O que diz:** "Do total que você ganha, subtraímos tudo que o sistema retira antes de você ver o dinheiro. O que sobra é o que realmente é seu."

O usuário acha que ganha R$ 10.000/mês. Mas depois de impostos e custos para poder trabalhar, talvez receba R$ 7.200. Essa diferença é o primeiro choque de realidade do Samear.

---

### 3.6 Alocação da Receita Líquida

```
Rl = M + V + D + I + Saldo
```
**O que diz:** "Todo real que entra no seu bolso tem um destino. Se você não define o destino, o dinheiro encontra um sozinho — geralmente, o Desperdício."

O objetivo do produto é fazer com que o Saldo seja zero, com tudo alocado conscientemente entre consumo útil (M + V), eliminação do Desperdício (D) e construção do futuro (I).

---

### 3.7 Consumo Total

```
C = M + V + D
```
**O que diz:** "Este é o dinheiro que você gasta e que não volta. É o que mantém sua vida hoje — mas parte disso (D) pode ser renegociada."

---

### 3.8 Saldo Mensal

```
Saldo = Rl − C − I
```
**O que diz:** "Quanto sobrou do seu dinheiro sem um destino definido este mês?"

- Saldo negativo: você gastou mais do que ganhou. Sangria ativa.
- Saldo zero: tudo foi alocado conscientemente. Saudável.
- Saldo positivo: sobrou dinheiro parado — deveria ir para I.

---

### 3.9 Patrimônio Líquido

```
PL = PB − Pa
```
**O que diz:** "Não importa quanto você tem — importa quanto você tem de verdade, depois de pagar o que deve. O Patrimônio Líquido é a sua riqueza real hoje."

---

### 3.10 Meses de Liberdade

```
ML = PL / C
```
**O que diz:** "Se você parasse de trabalhar agora, por quantos meses conseguiria manter sua vida com o que tem acumulado?"

Frontend: *"Seu patrimônio atual garante sua paz por X meses."*
Este indicador converte riqueza em tempo — a moeda real do Samear.

---

### 3.11 Taxa Real (Fisher)

```
TR = (1 + TN) / (1 + Inf) − 1
```
**O que diz:** "A taxa que o banco anuncia não desconta a inflação. A Taxa Real é o quanto seu dinheiro de fato cresceu em poder de compra."

Toda projeção do Samear usa TR, nunca TN. Mostrar projeções com taxa nominal seria enganar o usuário.

Frontend: *"Seu investimento rende X% ao ano. Com a inflação, o ganho real é Y%."*

---

### 3.12 Valor Futuro

```
FV = PV × (1 + i)ⁿ
```
**O que diz:** "Se você investir R$ X hoje, a uma taxa real de i% ao mês, em n meses você terá R$ Y."

---

### 3.13 Prazo para atingir um objetivo

```
n = log(FV / PV) / log(1 + i)
```
**O que diz:** "Para ter R$ X no futuro, partindo do que você tem hoje, você precisará de n meses."

Frontend: *"No seu ritmo atual, você chegará ao seu objetivo em X anos e Y meses."*

---

### 3.14 Aporte mensal necessário para um objetivo

```
PMT = FV × i / ((1 + i)ⁿ − 1)
```
**O que diz:** "Para acumular R$ X em n meses, você precisa investir R$ PMT por mês."

Frontend: *"Para comprar sua casa em 8 anos, você precisa guardar R$ X por mês."*

---

### 3.15 GIF — Grau de Independência Financeira

```
GIF = (Renda Passiva Real / C) × 100%
```
**O que diz:** "Qual percentual das suas despesas mensais é coberto por dinheiro que trabalha por você, sem exigir que você trabalhe?"

- GIF = 0%: você depende 100% do trabalho ativo para pagar as contas.
- GIF = 50%: metade das suas contas é paga por rendimentos.
- GIF = 100%: independência financeira. O trabalho torna-se uma escolha.

A Renda Passiva Real usa a Taxa Real — nunca o rendimento nominal bruto.

---

### 3.16 PNIF — Patrimônio Necessário para Independência Financeira

```
PNIF = C × 12 / TR_anual
```
**O que diz:** "Qual é o valor que você precisa ter investido para que os juros reais cubram suas despesas anuais para sempre, sem consumir o principal?"

Frontend: *"Para nunca mais precisar trabalhar, você precisa de R$ X investidos."*

---

## 4. O Cruzamento — Riqueza e Prosperidade

O indicador-síntese do Samear não é um número único — é a posição do usuário em dois eixos simultâneos:

```
Eixo X (Riqueza)      → GIF (0% a 100%+)
Eixo Y (Prosperidade) → ML (Meses de Liberdade)
```

| Posição | GIF | ML | Diagnóstico | Fase do Produto |
|---------|-----|----|-------------|-----------------|
| Zona vermelha | Baixo | Baixo | Sangria ativa. Dívidas. Sem reserva. | Fase 1: Estancar |
| Zona amarela | Médio | Baixo | Ganhos crescendo, mas sem acumulação. | Fase 2: Construir |
| Zona azul | Baixo | Alto | Patrimônio acumulado, mas sem renda passiva. | Fase 3: Ativar |
| Zona verde | Alto | Alto | Contentamento financiado. Trabalho é escolha. | Chegada |

**O Samear não julga onde o usuário está. Ele mostra a distância e ilumina o caminho.**

---

## 5. Fases do Produto

### Fase 1 — MVP: Estancar a Sangria

**Objetivo:** mostrar ao usuário onde o dinheiro vai e quanto tempo sobra. Primeiro choque de realidade.

**Equações ativas:**
- `Rl = R − Ra` → choque da receita real
- `C = M + V + D` → onde o dinheiro some
- `Saldo = Rl − C − I` → sangra ou sobra?
- `Tr = Tp − Tt` → quanto tempo sobra para viver
- `Vh = Rl / (Tt × 4,33)` → quanto vale cada hora

**O que o usuário declara no onboarding:**
1. Horas semanais de trabalho → Tt
2. Receita bruta → R
3. Impostos e custos para trabalhar → Ra
4. Gastos fixos mensais (Manutenção) → M

**O que o painel entrega:**
- "Você recebe R$ X, mas seu dinheiro real é R$ Y."
- "Você tem X horas por semana para viver fora do trabalho."
- "Você ganha R$ X por hora de trabalho real."
- Termômetro do Saldo: no vermelho, no zero ou no azul.
- GIF nascente: "0% das suas contas se pagam sozinhas ainda."

---

### Fase 2 — Construir

**Objetivo:** conectar o Tr a objetivos concretos e mostrar o futuro dos aportes.

**Equações adicionais:**
- `FV = PV × (1 + i)ⁿ` → projeção dos investimentos
- `PMT = FV × i / ((1 + i)ⁿ − 1)` → aporte necessário para um objetivo
- `n = log(FV / PV) / log(1 + i)` → prazo para chegar lá
- `ML = PL / C` → meses de liberdade acumulados

**O que muda:**
- Usuário nomeia seus objetivos de tempo ("quero 10h/semana com minha filha")
- Cada R$ de desperdício (D) cortado é convertido em horas de vida (Tr) de volta
- Projeções de patrimônio com taxa real
- PNIF aparece como "seu destino final"

**Campo opcional introduzido:**
- To (Tempo Obrigatório): deslocamento + afazeres não remunerados. Equação: `Tr = Tp − Tt − To`

---

### Fase 3 — Ativar

**Objetivo:** cruzar riqueza e prosperidade no dashboard completo.

**Equações adicionais:**
- `GIF = (Renda Passiva Real / C) × 100%` → quanto da liberdade já está financiada
- `PNIF = C × 12 / TR_anual` → o número que representa a chegada
- `Custo_em_horas = Valor_do_gasto / Vh` → em toda transação registrada

**O que muda:**
- Dashboard dos 4 quadrantes: GIF × ML
- Cada transação exibe o custo em horas de vida
- Renda passiva real rastreada mensalmente
- O usuário vê sua curva saindo da zona vermelha em direção à zona verde

---

### Fase 4 — Completa (visão de longo prazo)

**Objetivo:** gestão patrimonial completa e integração de dados em tempo real.

**O que adiciona:**
- Patrimônio detalhado por categoria (imóveis, ações, previdência, etc.)
- Integração bancária via Open Finance
- Projeções de independência com cenários (conservador / moderado / agressivo)
- Relatórios anuais: evolução do GIF, do ML e do PNIF
- Alertas inteligentes: "Você está a X meses de sair da zona vermelha"

---

## 6. Regra de Ouro do Produto

> O usuário nunca vê equações. Ele vê frases, termômetros e mensagens.
> As equações ficam no backend. A linguagem humana fica no frontend.

| Backend calcula | Frontend diz |
|---|---|
| `Rl = R − Ra` | *"Você recebe R$ X, mas seu dinheiro real é R$ Y."* |
| `Tr = Tp − Tt` | *"Você tem X horas por semana para viver fora do trabalho."* |
| `Vh = Rl / (Tt × 4,33)` | *"Cada hora do seu trabalho vale R$ X."* |
| `Custo_em_horas = Gasto / Vh` | *"Esta compra custou X horas da sua vida."* |
| `TR = (1 + TN)/(1 + Inf) − 1` | *"Seu investimento rende X% real — descontando a inflação."* |
| `ML = PL / C` | *"Seu patrimônio garante sua paz por X meses."* |
| `GIF = Renda Passiva / C` | *"X% das suas contas já se pagam sozinhas."* |
| `Saldo < 0` | *"Você gastou mais do que ganhou este mês. Vamos entender o que aconteceu."* |
| `GIF = 100%` | *"Você cruzou a linha. O trabalho agora é uma escolha."* |

---

*Documento vivo. Atualizar sempre que uma equação ou sigla for revisada.*
