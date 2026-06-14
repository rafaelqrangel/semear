# Semear — Briefing Conceitual

**Documento mestre do projeto. Leia antes de qualquer linha de código.**
**Versão:** 3.0 (mai/2026) — conceito puro, cálculos em revisão
**Mantenedor conceitual:** Rafael Q. Rangel + Claude (chat)

---

## 1. O que é o Semear

Semear é um SaaS em construção que responde a uma única pergunta:

> **"Estou conseguindo viver a vida que quero, ou estou apenas trabalhando para tê-la algum dia?"**

Diferente dos aplicativos de finanças tradicionais — que perguntam *"quanto você gastou este mês?"* e devolvem gráficos —, o Semear trata o dinheiro como coadjuvante de algo maior: **o tempo de vida que ainda resta para viver**.

O nome *Semear* combina *Same* (junto) + *Ar* — e lê-se também como *semear*. Está em consideração mudar para um nome inspirado na linhagem salomônica (Salomão, sabedoria aplicada).

---

## 2. A pergunta-mãe do produto

Toda decisão de produto — métrica, painel, módulo, copy, microcopy — precisa responder a:

> **Qual é a distância entre o que você gera e o que você quer ter, ser e viver?**

Não é pergunta financeira. É pergunta existencial com consequências financeiras.

---

## 3. A definição-axioma (pedra fundamental)

> **Rico é aquele que tem os recursos para viver aquilo que precisa.**
> **Próspero é aquele que tem tempo para aplicar tais recursos.**

São grandezas autônomas. Não se substituem. Não se compensam. A **vida plena** só existe quando ambas estão presentes simultaneamente.

---

## 4. As três bases filosófico-científicas

### 4.1 Aristóteles — Potência e Ato
- **Dynamis** (potência): capacidade de vir a ser
- **Energeia** (ato): essa capacidade realizada
- No Semear: **Recursos** = dynamis (potência financeira). **Tempo para aplicar** = condição para energeia (vida vivida).

### 4.2 Ilya Prigogine — Estruturas Dissipativas
- Nobel de Química 1977. Sistemas vivos só se mantêm consumindo energia para preservar sua ordem interna contra o caos.
- No Semear: o **Autocuidado Basal** (sono, alimentação, higiene com presença) **não é entropia, é vida** — é o gasto obrigatório de manutenção da estrutura viva.

### 4.3 Nicholas Georgescu-Roegen — Entropia Econômica
- Livro: *The Entropy Law and the Economic Process* (1971).
- Processos da sociedade moderna geram atritos estruturais. **Atrito é transversal: existe dentro de cada processo de uso de recursos, não como categoria à parte.**
- No Semear: o **Atrito** é o cupim. Engarrafamento, espera burocrática, deslocamento dissipativo, impostos, multas, juros, reuniões inúteis.

**Slogan-síntese do produto:** *"O atrito é o cupim do tempo e do dinheiro."*

---

## 5. As quatro caixas do dinheiro

Todo real que sai cai em uma das quatro caixas:

1. **Manutenção** — custos fixos inevitáveis (moradia, escola, planos, contas recorrentes)
2. **Vida** — variáveis, oscilantes, escolha (mercado, lazer, gastos cotidianos)
3. **Investimento** — sai hoje para voltar maior depois (aporte, reserva, ações)
4. **Atrito** — escoa sem virar nem manutenção, nem vida, nem retorno (juros, multas, conveniências, tarifas tolas)

---

## 6. A inversão de valor

A maioria dos apps pergunta: *"como você está usando seu tempo?"*

O Semear pergunta: *"quanto do seu tempo está sendo de fato vivido?"*

A diferença é existencial. O sistema **honra** o autocuidado, identifica o trabalho que gera valor versus o atrito do trabalho, e mostra a distância da vida desejada. O usuário não se sente cobrado — se sente respeitado.

---

## 7. A psicologia do consumista

Quem o produto serve tem três déficits sistemáticos:

1. **Não enxerga o "para onde" do dinheiro** — sabe que entra X, sabe que sai X, mas o dinheiro vira névoa. **Categorização visível = consciência.**
2. **Não conecta dinheiro a tempo de vida** — compra um relógio de R$ 4.000 sem perceber quantas horas de vida isso representa. **Tradução em horas em todo gasto.**
3. **Não vê o futuro** — o cérebro é míope para consequências de longo prazo. Parcelar parece indolor. **O painel precisa fazer o futuro doer um pouco.**

---

## 8. Tom de voz do produto

- **Familial, não corporativo.** Como um irmão mais velho que cuida, não como um gerente que cobra.
- **Honesto, com parceria.** Mostra a realidade dura sem grosseria. Sempre fecha com "estamos juntos nesse caminho."
- **Sabedoria, não pressa.** Inspirado em Salomão. Sem ansiedade, sem urgência fabricada.
- **Sem emojis decorativos. Sem bullet points em conversa.** Frases inteiras.
- **Linguagem clássica, peso editorial.** DM Serif Display nos títulos, Inter no corpo.

---

## 9. Estética visual

- **Paleta principal:**
  - Background: pêssego (`#fdeee4`)
  - Texto principal: marrom escuro (`#2d2620`)
  - Tom rosa terra (marca): `#d4807a`
  - Marrom suave (apoio): `#8b6f5c`
  - Verde sálvia (autocuidado honrado): `#6fa572`
  - Vermelho terracota (atrito): `#a32d2d`
  - Verde escuro (positivo financeiro): `#2d7a4a`

- **Tipografia:**
  - Títulos: DM Serif Display (Google Fonts)
  - Corpo: Inter (Google Fonts)

- **Componentes:**
  - Botões em pílula (border-radius 999px)
  - Cards com border-radius 14-16px
  - Sombras suavíssimas (`0 1px 4px rgba(45,38,32,0.06)`)
  - Sem gradientes. Cores chapadas, ar entre elementos.

---

## 10. Estratégia de construção (3 anéis)

**Anel 1 — Na pele do criador (Rafael)** — todo conceito testado primeiro na vida real, sem mediação. **Status:** Apps Script + Sheets rodando.

**Anel 2 — Círculo próximo** — Marcela, familiares, amigos selecionados. **Status:** Marcela já usa parcialmente.

**Anel 3 — SaaS comercial** — quando os módulos centrais estiverem lapidados pelo uso real. **Status:** futuro.

---

## 11. O que fica em aberto (roadmap conceitual)

1. **Arquitetura de tempo e dinheiro** — os cálculos estão sendo revistos com rigor matemático-financeiro. Em construção com apoio do NotebookLM.
2. **Medição do fator de Ato** — quanto da potência disponível é convertida em vida vivida. Comportamental.
3. **Atrito dentro da vida desejada** — fase avançada. Trânsito para o lazer, fila no restaurante.
4. **Atrito dentro do autocuidado** — fase avançada. Sono mal dormido, alimentação estressante.

---

## 12. O que NÃO é o Semear

- ❌ Não é um app de gastos
- ❌ Não é uma planilha bonita
- ❌ Não é uma calculadora de aposentadoria
- ❌ Não é um app de produtividade que otimiza tempo
- ❌ Não é mais um agregador de contas bancárias

**O Semear é um espelho.** Um sistema que mostra com clareza matemática e estética a distância entre a vida que o usuário gera e a vida que ele diz querer viver — e o ajuda a navegar essa distância com sabedoria.

---

## 13. Referências cruzadas

- **Fundação matemática e glossário:** `Semear - Fundacao Matematica.md` ← equações canônicas e siglas
- **Documento conceitual completo:** `Semear - Documento Conceitual.docx`
- **Prompt inicial Claude Code:** `Semear - Prompt Inicial Claude Code.md`
- **Documentação técnica do Apps Script (legado):** `Semear - Documentacao Tecnica AppsScript.md`
- **Painel visual de referência:** `Semear - Painel Visual.html`

---

*Documento vivo. Cresce com o projeto.*
