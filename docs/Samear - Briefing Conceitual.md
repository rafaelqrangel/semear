# Samear — Briefing Conceitual

**Documento mestre do projeto. Leia antes de qualquer linha de código.**

---

## 1. O que é o Samear

Samear é um SaaS em construção que responde a uma única pergunta:

> **"Estou conseguindo viver a vida que quero, ou estou apenas trabalhando para tê-la algum dia?"**

Diferente dos aplicativos de finanças tradicionais — que perguntam *"quanto você gastou este mês?"* e devolvem gráficos —, o Samear trata o dinheiro como coadjuvante de algo maior: **o tempo de vida que ainda resta para viver**.

O nome *Samear* combina *Same* (junto) + *Ar* — e lê-se também como *semear*. Está em consideração mudar para um nome inspirado na linhagem salomônica (Salomão, sabedoria aplicada).

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

O modelo se ancora em três pensadores cujas obras descrevem o que o Samear organiza em forma de produto:

### 4.1 Aristóteles — Potência e Ato
- **Dynamis** (potência): capacidade de vir a ser
- **Energeia** (ato): essa capacidade realizada
- Aristóteles, na *Física*: "movimento é o ato do ente em potência enquanto tal"
- No Samear: **Recursos** = dynamis (potência financeira). **Tempo para aplicar** = condição para energeia (vida vivida).

### 4.2 Ilya Prigogine — Estruturas Dissipativas
- Nobel de Química 1977
- Sistemas vivos só se mantêm consumindo energia para preservar sua ordem interna contra o caos
- No Samear: o **Autocuidado Basal** (sono, alimentação, higiene com presença) **não é entropia, é vida** — é o gasto obrigatório de manutenção da estrutura viva

### 4.3 Nicholas Georgescu-Roegen — Entropia Econômica
- Livro: *The Entropy Law and the Economic Process* (1971)
- Processos da sociedade moderna geram atritos estruturais — uso de recursos e tempo em atividades essencialmente improdutivas
- No Samear: o **Atrito** é o cupim. Engarrafamento, espera burocrática, deslocamento dissipativo, multas, juros, reuniões inúteis

**Slogan-síntese do produto:** *"O atrito é o cupim do tempo e do dinheiro."*

---

## 5. A arquitetura temporal do MVP

Todas as variáveis começam com **T** — gramática unificada que sinaliza: nesta equação tudo é tempo.

| Sigla | Nome | Descrição |
|-------|------|-----------|
| **Tb** | Tempo Bruto | 24h por dia. Constante. |
| **Tab** | Tempo de Autocuidado Basal | Sono, alimentação, higiene vividos com presença. **É VIDA, não entropia.** Fundamentado em Prigogine. |
| **Tba** | Tempo Bruto após Autocuidado | Tba = Tb − Tab. Potencial bruto para projetos humanos. |
| **Te** | Tempo de Entropia | Atrito, ineficiência, espera estressante. **O cupim.** Fundamentado em Georgescu-Roegen. |
| **Tl** | Tempo Líquido | Tl = Tba − Te. **O palco real da vida.** |
| **Tt** | Tempo de Trabalho | Horas dentro de Tl dedicadas a gerar receita. |
| **Tv** | Tempo de Vida | Horas dentro de Tl dedicadas à vida desejada. |
| **Vh** | Valor da Hora Trabalhada | Vh = Receita ÷ Tt. Em R$/h. Régua que conecta dinheiro e tempo. |

**Equação central do MVP:**

```
Tl = Tt + Tv
```

Esse é o **cobertor curto da economia termodinâmica**: aumentar um lado obriga reduzir o outro — ou aumentar Vh.

---

## 6. As quatro caixas do dinheiro

Todo real que sai cai em uma das quatro caixas:

1. **Manutenção** — custos fixos inevitáveis (moradia, escola, planos, contas recorrentes)
2. **Vida** — variáveis, oscilantes, escolha (mercado, lazer, gastos cotidianos)
3. **Investimento** — sai hoje para voltar maior depois (aporte, reserva, ações)
4. **Atrito** — escoa sem virar nem manutenção, nem vida, nem retorno (juros, multas, conveniências, tarifas tolas)

A categorização espelha o conceito temporal: assim como há *Tab* (vida) e *Te* (atrito) no tempo, há *Manutenção* (vida) e *Atrito* (cupim) no dinheiro.

---

## 7. As duas perguntas que o MVP responde

Com as variáveis acima, o sistema responde duas perguntas centrais:

### Pergunta 1 — Distância dos objetivos materiais
*Quanto tempo de vida você precisa investir em trabalho para alcançar um objetivo material específico?*

```
Tempo necessário (em horas) = Custo do objetivo ÷ Vh
Tempo em meses              = Tempo em horas ÷ Tt mensal
```

### Pergunta 2 — Distância dos objetivos de tempo (cobertor curto)
*Para passar mais horas por semana com quem importa, quanto você abre mão em receita potencial — ou pode recuperar caçando entropia?*

```
Horas a recuperar           = Horas desejadas − Horas atuais
Receita potencial perdida   = Horas a recuperar × Vh × 52 (anual)
Saída alternativa           = Caçar Te (entropia) para liberar tempo sem reduzir Tt
```

**A frase-síntese do produto:** *"O cupim, não a Malu."*

---

## 8. A inversão de valor

A maioria dos apps pergunta: *"como você está usando seu tempo?"*

O Samear pergunta: *"quanto do seu tempo está sendo de fato vivido?"*

A diferença é existencial. O sistema **honra** o almoço com calma, o sono, o autocuidado — e identifica como inimigo apenas o atrito puro. O usuário não se sente cobrado — se sente respeitado.

---

## 9. A psicologia do consumista

Quem o produto serve tem três déficits sistemáticos:

1. **Não enxerga o "para onde" do dinheiro** — sabe que entra X, sabe que sai X, mas o dinheiro vira névoa. **Categorização visível = consciência.**
2. **Não conecta dinheiro a tempo de vida** — compra um relógio de R$ 4.000 sem perceber que custou 35 horas de vida. **Tradução em horas em todo gasto.**
3. **Não vê o futuro** — o cérebro é míope para consequências de longo prazo. Parcelar parece indolor. **O painel precisa fazer o futuro doer um pouco.**

---

## 10. Tom de voz do produto

- **Familial, não corporativo.** Como um irmão mais velho que cuida, não como um gerente que cobra.
- **Honesto, com parceria.** Mostra a realidade dura sem grosseria. Sempre fecha com "estamos juntos nesse caminho."
- **Sabedoria, não pressa.** Inspirado em Salomão. Sem ansiedade, sem urgência fabricada.
- **Sem emojis decorativos. Sem bullet points em conversa.** Frases inteiras.
- **Linguagem clássica, peso editorial.** Tipografia DM Serif Display nos títulos, Inter no corpo.

---

## 11. Estética visual

- **Paleta principal:**
  - Background: pêssego (`#fdeee4`)
  - Texto principal: marrom escuro (`#2d2620`)
  - Tom rosa terra (marca): `#d4807a`
  - Marrom suave (apoio): `#8b6f5c`
  - Verde sálvia (Tab, manutenção honrada): `#6fa572`
  - Vermelho terracota (Te, atrito): `#a32d2d`
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

## 12. Estratégia de construção (3 anéis)

**Anel 1 — Na pele do criador (Rafael)**
- Todo conceito testado primeiro na vida real de Rafael, sem mediação
- Se não serve para quem criou, não serve para mais ninguém
- **Status atual:** Apps Script + Sheets rodando, dados reais de Rafael e Marcela sendo inseridos

**Anel 2 — Círculo próximo**
- Marcela, familiares, amigos selecionados
- Realidades diversas estressam o modelo
- **Status:** Marcela já usa parcialmente

**Anel 3 — SaaS comercial**
- Quando os módulos centrais estiverem lapidados pelo uso real
- Abre-se ao mundo
- **Status:** futuro

---

## 13. O que fica em aberto (roadmap conceitual, fora do MVP)

1. **Equação completa Gp = (R − Sr) × (T − St) × A** — formulação aristotélica de Georgescu-Roegen aplicada ao indivíduo. Permanece como roadmap conceitual, não entra no MVP por exigir do usuário catalogação que destruiria a fricção zero do produto.

2. **Medição do fator de Ato (A)** — quanto da potência disponível está sendo efetivamente convertida em vida vivida. Medida comportamental, exige design cuidadoso de perguntas ao usuário ao longo do tempo.

3. **Modelagem dos objetivos de vida** — estrutura própria para capturar objetivos materiais (custo financeiro) e objetivos de tempo (recorrência semanal).

---

## 14. O que NÃO é o Samear

Para evitar drift conceitual durante o desenvolvimento:

- ❌ Não é um app de gastos
- ❌ Não é uma planilha bonita
- ❌ Não é uma calculadora de aposentadoria
- ❌ Não é um app de produtividade que otimiza tempo
- ❌ Não é mais um agregador de contas bancárias

**O Samear é um espelho.** Um sistema que mostra com clareza matemática e estética a distância entre a vida que o usuário gera e a vida que ele diz querer viver — e o ajuda a navegar essa distância com sabedoria, não com pressa nem com culpa.

---

## 15. Referências cruzadas

- **Documento conceitual completo:** `Samear - Documento Conceitual.docx`
- **Especificação técnica do MVP:** `Samear - Especificacao Tecnica MVP.md`
- **Prompt inicial Claude Code:** `Samear - Prompt Inicial Claude Code.md`
- **Documentação técnica do Apps Script (legado):** `Samear - Documentacao Tecnica AppsScript.md`
- **Painel visual de referência:** `Samear - Painel Visual.html`

---

*Este é um documento vivo. Deve crescer com o projeto.*
