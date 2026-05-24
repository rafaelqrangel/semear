# Samear — Briefing Conceitual

**Documento mestre do projeto. Leia antes de qualquer linha de código.**
**Versão:** 2.0 (mai/2026) — equação revisada
**Mantenedor conceitual:** Rafael Q. Rangel + Claude (chat)

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

### 4.1 Aristóteles — Potência e Ato
- **Dynamis** (potência): capacidade de vir a ser
- **Energeia** (ato): essa capacidade realizada
- No Samear: **Recursos** = dynamis (potência financeira). **Tempo para aplicar** = condição para energeia (vida vivida).

### 4.2 Ilya Prigogine — Estruturas Dissipativas
- Nobel de Química 1977. Sistemas vivos só se mantêm consumindo energia para preservar sua ordem interna contra o caos.
- No Samear: o **Autocuidado Basal** (sono, alimentação, higiene com presença) **não é entropia, é vida** — é o gasto obrigatório de manutenção da estrutura viva.

### 4.3 Nicholas Georgescu-Roegen — Entropia Econômica
- Livro: *The Entropy Law and the Economic Process* (1971).
- Processos da sociedade moderna geram atritos estruturais. **Atrito é transversal: existe dentro de cada processo de uso de recursos, não como categoria à parte.**
- No Samear: o **Atrito** é o cupim. Engarrafamento, espera burocrática, deslocamento dissipativo, impostos, multas, juros, reuniões inúteis.

**Slogan-síntese do produto:** *"O atrito é o cupim do tempo e do dinheiro."*

---

## 5. A arquitetura temporal do MVP (versão revisada)

### Princípio: rigor seletivo

Atrito é transversal por natureza (Georgescu-Roegen). Mas o Samear **só mede onde o ganho informacional compensa a fricção de registro**. Big atritos sim — deslocamento, impostos, gasolina, reuniões inúteis. Micro atritos não — quanto tempo leva pro restaurante preferido.

> **A regra:** só pergunta se a resposta vai influenciar comportamento. Se vira dado decorativo, não vale.

### As variáveis (tempo)

| Sigla | Nome | Descrição |
|-------|------|-----------|
| **Tb** | Tempo Bruto | 24h por dia. Constante. |
| **Tab** | Tempo de Autocuidado Basal | Sono, alimentação, higiene vividos com presença. Fundamentado em Prigogine. **Honrado, não medimos atrito interno.** |
| **Tp** | Tempo Produtivo | Tp = Tb − Tab. Potencial disponível para projetos humanos. |
| **Tt** | Tempo de Trabalho (bruto) | Horas dedicadas à atividade remunerada. |
| **Tv** | Tempo de Vida desejada | Horas dedicadas à vida fora do trabalho (família, projetos, lazer, presença). **Sem atrito, porque ainda é alvo — não foi vivido.** |
| **Te** | Tempo de Entropia | Atrito identificável dentro do trabalho: deslocamento, reunião inútil, espera burocrática. |
| **Ttl** | Tempo de Trabalho Líquido | Ttl = Tt − Te. Trabalho que de fato gera receita. |

### Por que Tv não tem atrito

Tv é a **vida desejada** — projeção, alvo, intenção. Atrito é fenômeno do que **já existe e está acontecendo**. Não se mede o atrito de algo que não aconteceu ainda. Tv é o horizonte; o atrito mora no percurso atual (Tt).

### As variáveis (dinheiro)

| Sigla | Nome | Descrição |
|-------|------|-----------|
| **R** | Receita bruta | Receita declarada mensal. |
| **Ra** | Receita de Atrito | Impostos + custos obrigatórios para poder trabalhar (transporte, almoço fora obrigatório, equipamento, deslocamento). |
| **Rl** | Receita Líquida | Rl = R − Ra. O que de fato fica no bolso. |

### As variáveis (hora)

| Sigla | Nome | Descrição |
|-------|------|-----------|
| **Vhb** | Valor da Hora Bruto | Vhb = R ÷ Tt. O que o usuário acha que ganha. |
| **Vhl** | Valor da Hora Líquido | Vhl = Rl ÷ Ttl. O que de fato ganha por hora real de trabalho útil. |

### O delta que muda a vida

A diferença entre Vhb e Vhl é **o veneno invisível** que Georgescu-Roegen descreveu. O usuário acha que ganha R$ 121/h. Depois do atrito, talvez ganhe R$ 78/h. Esse delta — **R$ 43 evaporados por hora** — é o que o Samear escancara.

### Equação central do MVP

```
Tp = Tt + Tv
```

**O cobertor curto:** aumentar Tt reduz Tv. Caçar Te aumenta Ttl sem mexer em Tt. Aumentar Vhl permite reduzir Tt sem perder receita.

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

### Pergunta 1 — Distância dos objetivos materiais
*Quanto tempo de vida você precisa investir em trabalho para alcançar um objetivo material específico?*

```
Tempo necessário (horas) = Custo do objetivo ÷ Vhl
Tempo em meses           = Horas necessárias ÷ Ttl mensal
```

**Usar Vhl, não Vhb.** A casa de R$ 2 milhões a R$ 78/h líquidos é diferente da casa a R$ 121/h brutos. Esse é o número honesto.

### Pergunta 2 — Distância dos objetivos de tempo (cobertor curto)
*Para passar mais horas por semana com quem importa, quanto você abre mão em receita potencial — ou pode recuperar caçando Te?*

```
Horas a recuperar           = Horas desejadas em Tv − Horas atuais em Tv
Receita potencial perdida   = Horas a recuperar × Vhl × 52 (anual)
Saída alternativa           = Caçar Te (cupim do trabalho) para liberar Tt sem reduzi-lo
```

**A frase-síntese do produto:** *"O cupim, não a Malu."*

---

## 8. O onboarding (rigor seletivo aplicado)

Cinco perguntas. Dois minutos. Fricção mínima, rigor onde importa.

**Tempo:**
1. Quantas horas por semana você dedica ao trabalho? → **Tt**
2. Dessas horas, quantas são deslocamento, reunião inútil ou espera burocrática? → **Te**

**Receita:**
3. Qual sua receita bruta mensal? → **R**
4. Quanto vai em impostos? → **Ra (impostos)**
5. Quanto você gasta por mês para poder trabalhar (transporte, almoço fora obrigatório, equipamento)? → **Ra (operação)**

**Sobre Tv (vida desejada):**
Não perguntamos atrito. Perguntamos só o desejo bruto: *"Quantas horas por semana você gostaria de dedicar à vida fora do trabalho?"*. O painel mostra a distância entre Tv real (Tp − Tt) e Tv desejado.

---

## 9. A inversão de valor

A maioria dos apps pergunta: *"como você está usando seu tempo?"*

O Samear pergunta: *"quanto do seu tempo está sendo de fato vivido?"*

A diferença é existencial. O sistema **honra** o autocuidado, identifica o trabalho útil (Ttl) versus o atrito do trabalho (Te), e mostra a distância da vida desejada (Tv). O usuário não se sente cobrado — se sente respeitado.

---

## 10. A psicologia do consumista

Quem o produto serve tem três déficits sistemáticos:

1. **Não enxerga o "para onde" do dinheiro** — sabe que entra X, sabe que sai X, mas o dinheiro vira névoa. **Categorização visível = consciência.**
2. **Não conecta dinheiro a tempo de vida** — compra um relógio de R$ 4.000 sem perceber que custou 51 horas de vida (a Vhl). **Tradução em horas em todo gasto.**
3. **Não vê o futuro** — o cérebro é míope para consequências de longo prazo. Parcelar parece indolor. **O painel precisa fazer o futuro doer um pouco.**

---

## 11. Tom de voz do produto

- **Familial, não corporativo.** Como um irmão mais velho que cuida, não como um gerente que cobra.
- **Honesto, com parceria.** Mostra a realidade dura sem grosseria. Sempre fecha com "estamos juntos nesse caminho."
- **Sabedoria, não pressa.** Inspirado em Salomão. Sem ansiedade, sem urgência fabricada.
- **Sem emojis decorativos. Sem bullet points em conversa.** Frases inteiras.
- **Linguagem clássica, peso editorial.** DM Serif Display nos títulos, Inter no corpo.

---

## 12. Estética visual

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

## 13. Estratégia de construção (3 anéis)

**Anel 1 — Na pele do criador (Rafael)** — todo conceito testado primeiro na vida real, sem mediação. **Status:** Apps Script + Sheets rodando.

**Anel 2 — Círculo próximo** — Marcela, familiares, amigos selecionados. **Status:** Marcela já usa parcialmente.

**Anel 3 — SaaS comercial** — quando os módulos centrais estiverem lapidados pelo uso real. **Status:** futuro.

---

## 14. O que fica em aberto (roadmap conceitual)

1. **Equação completa Gp = (R − Sr) × (T − St) × A** — formulação aristotélica de Georgescu-Roegen aplicada ao indivíduo. Roadmap conceitual.
2. **Medição do fator de Ato (A)** — quanto da potência disponível é convertida em vida vivida. Comportamental.
3. **Atrito dentro de Tv** — fase avançada. Quando o usuário tiver intimidade com o modelo, podemos pedir granularidade maior sobre o atrito da vida desejada (trânsito pro lazer, fila no restaurante).
4. **Atrito dentro de Tab** — fase avançada. Honra do autocuidado pode evoluir para identificar atrito interno (sono mal dormido por barulho, alimentação rápida e estressante).

---

## 15. O que NÃO é o Samear

- ❌ Não é um app de gastos
- ❌ Não é uma planilha bonita
- ❌ Não é uma calculadora de aposentadoria
- ❌ Não é um app de produtividade que otimiza tempo
- ❌ Não é mais um agregador de contas bancárias

**O Samear é um espelho.** Um sistema que mostra com clareza matemática e estética a distância entre a vida que o usuário gera e a vida que ele diz querer viver — e o ajuda a navegar essa distância com sabedoria.

---

## 16. Referências cruzadas

- **Documento conceitual completo:** `Samear - Documento Conceitual.docx`
- **Especificação técnica do MVP:** `Samear - Especificacao Tecnica MVP.md`
- **Prompt inicial Claude Code:** `Samear - Prompt Inicial Claude Code.md`
- **Documentação técnica do Apps Script (legado):** `Samear - Documentacao Tecnica AppsScript.md`
- **Painel visual de referência:** `Samear - Painel Visual.html`

---

*Documento vivo. Cresce com o projeto.*
