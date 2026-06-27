# Semear — Documento de Produto

> **Fonte única de verdade do produto.** Este documento substitui a documentação
> anterior para fins de escopo de produto. Bases filosóficas abstratas
> (Aristóteles, Prigogine, Georgescu-Roegen) ficam **fora** do escopo de produto.
>
> **Versão:** 1.0 · **Mantenedor:** Rafael Q. Rangel

---

## 1. O que é o Semear (posicionamento)

O Semear **não** é um app financeiro nem um app de gestão de tempo. Ele é a
**"Escada da Abstração"** (S. I. Hayakawa) aplicada à vida: uma máquina que pega
uma intenção nebulosa do usuário — *"quero quitar minha casa"*, *"quero ter mais
tempo com meus filhos"*, *"quero sair do meu emprego"* — e a faz **descer, degrau
a degrau, até virar um micro-hábito concreto e datado** que cabe numa segunda-feira
à noite.

O trabalho duro de descer a escada é do **software**, não do usuário. O usuário só
faz o que já sabe e gosta de fazer:

- **Sonhar** — inserir a intenção no topo.
- **Executar passos minúsculos** — agir na base.

Tudo no meio — quebrar o sonho em entregas, traduzir em horas de vida, sugerir o
próximo passo — é a máquina que faz.

**Concorrente real:** não é Mobills, Guiabolso ou YNAB. O concorrente do Semear é
a **inércia** e a **estagnação** do próprio usuário.

> A frase de posicionamento oficial do app é mantida como está por enquanto; será
> refinada depois.

---

## 2. O problema e o Job To Be Done (JTBD)

A dor do usuário **não** é falta de dinheiro nem falta de tempo. É a sensação de
**estagnação** — de estar "andando de lado", de ver o tempo passar e os sonhos
nunca saírem do papel. O antídoto é **evidência de movimento**.

**JTBD central (formulação validada):**

> *"Quando me sinto paralisado pelas minhas próprias ideias e ansioso vendo o tempo
> passar, me ajude a transformar esse nevoeiro em um único passo concreto hoje,
> para que eu sinta que retomei o controle da minha vida."*

**Teste de existência do produto:** se o app servisse apenas para **inserir**
objetivos, ele não precisaria existir (um caderno faz isso). O valor está na
**ponte** entre a intenção grande e a ação minúscula — essa ponte é o produto.

---

## 3. Persona única do MVP

O evangelista precoce é **um perfil só** (decisão deliberada — não misturar
públicos no MVP). É o próprio fundador (Rafael) e sua esposa como segunda usuária:

- Profissional com renda estável, **financiando uma casa**, com reservas no limite
  e custo alto frente aos ganhos.
- Sente que *"trabalha muito e a conta não fecha"* e que, no ritmo atual, seriam
  incontáveis anos para quitar a casa.
- Já tentou planilha e apps financeiros, mas nenhum conectou o **dinheiro à vida**
  e nenhum tirou os objetivos do papel.
- Quer ver a dívida virar **horas de vida** e provar progresso mês a mês.

> **Nota:** perfis como TDAH, TOC e perfeccionistas foram considerados, mas
> atendê-los juntos no lançamento é um erro (arquiteturas de uso conflitantes).
> Foco em **um** perfil até dominar a dor.

---

## 4. Modelo central — A Escada da Abstração (5 degraus)

O coração do produto. O usuário insere a intenção no topo; o **app** conduz a
descida até o micro-hábito. Exemplo real (caso do fundador, intenção = *"quitar
minha casa"*):

| Degrau | Nome | O que acontece | Exemplo (quitar a casa) |
|---|---|---|---|
| **1** | **A Aspiração** (topo) | O usuário insere o sonho cru. É um desejo, não um comportamento executável (Fogg). *O esforço do usuário termina aqui.* | "Quero quitar o financiamento da minha casa para ter paz." |
| **2** | **O Resultado Mensurável** | O app converte o sonho em meta matemática. Ainda é resultado, não ação — a máquina já começou a descer. | "Para encurtar o financiamento, precisamos amortizar R$ 2.000 extras no saldo devedor este mês." |
| **3** | **O Trade-off** (a tradução Semear / coração do sistema) | O app aciona o **valor-hora**, divide a meta por ele e transforma dinheiro na métrica principal: **horas de vida**. | "R$ 2.000 custam 15 horas da sua vida. Injete 15h na caixa Investimento (ganhar mais) **ou** resgate 15h cortando gastos na caixa Atrito." |
| **4** | **A Escolha Tática** | O app varre as caixas **Atrito** e **Vida** procurando onde essas horas se dissipam e entrega opções **fechadas**. O usuário só escolhe. | "Opção A: horas extras no fim de semana. Opção B: cortar 10h de Atrito (iFood) + gerar 10h de Investimento (freela)." |
| **5** | **O Micro-hábito** (chão da escada) | O app agenda o gatilho exato na fórmula de Fogg (**âncora + microcomportamento**). | "Segunda-feira, logo depois de jantar, sente no sofá e apenas cancele aquela única assinatura de R$ 50." |

Cancelar R$ 50 não quita a casa, mas devolve uma fração de **tempo de vida** ao
projeto e gera a sensação de sucesso imediata que consolida o hábito.

**Resultado:** *"quitar a casa"* (angústia paralisante) vira *"cancelar uma
assinatura na segunda à noite"* (tarefa de 5 min). Isso **não** gera fricção —
gera **alívio**. Maximiza a **Capacidade** do modelo de Fogg:

> Comportamento = Motivação × Capacidade × Gatilho

---

## 5. Arquitetura financeira (o tabuleiro)

Os dados financeiros **não** são o fim — são os dois corrimãos (**tempo** e
**dinheiro**) que sustentam a descida da escada.

### Valor-hora

Receita real dividida pelas horas dedicadas ao trabalho (**incluindo
deslocamento**). É a taxa de conversão universal: todo R$ vira horas de vida.

- Exemplo do app: salário R$ 8.000 / 176h = **R$ 45/h**.

### As 4 caixas

O tabuleiro onde a Escada movimenta as peças:

| Caixa | O que é |
|---|---|
| **Manutenção** | Contas que sustentam a estrutura da vida (moradia, luz, água, escola). |
| **Vida** | O que você escolhe para viver bem e vale a pena (restaurantes, viagem, livros, lazer). |
| **Investimento** | O que você guarda/aporta/gera (aportes, reserva, renda passiva, ganho extra). |
| **Atrito** | O que escoa sem virar vida (juros, multas, assinaturas esquecidas, compras por impulso). |

### Registro diário de gastos

Cada gasto é classificado num guarda-chuva (a **conta/destino**, não o meio de
pagamento) e convertido na hora em **horas de vida**.

### Dados captados no onboarding

- Fontes de receita (bruta/líquida, tipo CLT/PJ/etc., custos e descontos).
- Horas de trabalho e deslocamento.
- Horas de sono e cuidados pessoais (= tempo livre real).
- Despesas fixas e variáveis.
- Investimentos e renda passiva.

> **Importante:** o onboarding também deve capturar **pelo menos 1
> intenção/objetivo** (topo da escada) — hoje isso falta.

---

## 6. A ligação Intenção ↔ Finanças (o motor de duas vias)

Esta é a seção-chave: o que faz a **Escada** (intenções) e as **Caixas** (finanças)
serem **um sistema único**, e não "dois apps colados". O sistema é um motor de duas
vias: a **intenção desce** a escada consumindo dados financeiros, e o **gasto
diário sobe** a escada prestando contas à intenção.

### Via 1 — A intenção desce (puxa dados financeiros)

Cada degrau da escada se alimenta da estrutura financeira:

- O **Degrau 2** usa a meta vs. saldo devedor.
- O **Degrau 3** usa o **valor-hora** para converter a meta em horas.
- O **Degrau 4** varre as caixas **Atrito** e **Vida** para achar de onde tirar as
  horas.

Ou seja, a Escada não é uma feature separada — ela **roda sobre** as caixas e o
valor-hora.

### Via 2 — O gasto diário sobe (presta contas à intenção)

Quando o usuário registra um gasto comum (ex.: R$ 180 num jantar), isso **não é
contabilidade** — é um **teste de alinhamento** com a intenção do topo. O app
converte na hora pelo valor-hora (*"custou 3h58 de vida"*) e mostra se aquele gasto
**aproxima** ou **afasta** o usuário do objetivo (ex.: quitar a casa). O gasto deixa
de ser um lançamento morto e vira uma **conversa com o sonho**.

### A prova de progresso

As 4 caixas são o **tabuleiro**; a Escada é a **regra do jogo** que movimenta as
peças. A prova de progresso acontece quando o usuário vê suas **horas de vida
migrarem de caixa** ao longo dos meses:

- **Mês 1:** 40h presas na caixa **Atrito**.
- **Mês 3** (após executar os micro-hábitos do Degrau 5): a caixa **Atrito** esvazia
  para 10h, e essas **30h salvas migram para a caixa Investimento**, ancorando a
  meta de quitar a casa.

O usuário para de gerenciar centavos de um cartão e passa a gerenciar a **própria
energia vital** nas caixas que importam. Isso é o que cura a estagnação: **evidência
visual de movimento.**

---

## 7. Escopo do MVP

O MVP é o **"Modo 1" (registro)**, mas **com provocação** — nunca registro puro.
Deve conter:

- Onboarding que capta receitas, tempo, despesas, investimentos **e pelo menos 1
  intenção/objetivo**.
- Valor-hora calculado e visível.
- As 4 caixas com saldos em **R$** e em **horas de vida**.
- Registro diário de gastos com conversão em horas em tempo real.
- Dashboard ("mapa da vida") mostrando para onde vai o dinheiro/tempo.
- A **Escada da Abstração** funcional para pelo menos 1 intenção (os 5 degraus,
  conduzidos pelo app).
- **Prova de progresso:** visualização da migração de horas entre caixas ao longo
  dos meses.
- Provocações contextuais em cada registro (*"isso te aproxima ou afasta do seu
  objetivo?"*).

---

## 8. O que fica de fora do MVP (decisão validada)

- **Agente de IA embarcado "Salomão" — fica de fora.** Distração no MVP. Só entra
  quando o método cru estiver validado e a empresa precisar ganhar escala. Se a
  conversão de dinheiro em tempo não mudar o comportamento sozinha, uma IA não salva
  o negócio.
- **Não** tentar resolver a roda da vida inteira (8 dimensões) de uma vez — atacar
  **uma** dor específica primeiro.
- **Não** prometer "ponto ótimo de equilíbrio" entre tempo e dinheiro — isso é
  abstrato (mora no topo da escada) e é uma armadilha. A promessa é dar o **número
  exato** e o **passo tático**, e responder se a escolha de hoje aproxima ou afasta
  do objetivo.
- **Remover** da documentação as bases filosóficas abstratas (Aristóteles,
  Prigogine, Georgescu-Roegen).

---

## 9. Princípios de design e tom

- O app **desce a escada pelo usuário** — nunca exige que ele pense muito para agir
  (reduz fricção, maximiza Capacidade de Fogg).
- Toda tela tem uma **frase-âncora** que carrega o conceito (a copy já existente é
  um ponto forte: *"O tempo é a única coisa que não se compra"*, etc. — manter esse
  padrão).
- Identidade visual atual (terracota/bege, serifada) comunica **"design de vida"**,
  não "fintech" — manter.
- Tom: claro, didático, levemente coloquial e amistoso, com a estrutura de um expert
  de negócios real que sabe o que dá certo e o que não dá.
- Cada ação do usuário deve **fechar o loop** com feedback visível (confirmação,
  progresso).

---

## 10. Bugs / gaps atuais do app

> Encontrados em teste de UX. **Corrigir na fase de implementação, não agora.**

- Botão "Registrar gasto" não dá feedback de confirmação.
- Botão central "Intenção — comece aqui" no mapa não abre o fluxo da Escada (é o
  diferencial central).
- Link "economia doméstica" leva de volta ao onboarding.
- Roda da vida (8 dimensões) é estática / não-interativa.
- Onboarding não captura objetivo/intenção de vida.
- Dado de "tempo livre / semana" some do diagnóstico final.
- Registro de gasto só oferece 1 guarda-chuva, sem as outras categorias.
