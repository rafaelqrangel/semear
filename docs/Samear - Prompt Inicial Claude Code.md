# Prompt Inicial para o Claude Code

**Cole este prompt na sua primeira conversa com o Claude Code, depois de criar o repositório `samear` e abrir ele no VS Code.**

---

## Como usar

1. Abra o Claude Code no terminal dentro da pasta `samear/`
2. Cole o prompt abaixo (entre as linhas tracejadas) na primeira mensagem
3. Anexe os três documentos:
   - `Samear - Briefing Conceitual.md`
   - `Samear - Especificacao Tecnica MVP.md`
   - `Samear - Painel Visual.html` (o protótipo visual)
4. Aguarde o Claude Code processar tudo e propor o plano de Fase 0

---

## O Prompt

```
Olá, Claude. Vou trabalhar com você no desenvolvimento do Samear, um SaaS de gestão de vida (não apenas finanças) que estou construindo do zero. Anexei três documentos que carregam todo o pensamento e direção:

1. **Samear - Briefing Conceitual.md** — a alma do projeto. Filosofia, equações, tom de voz, estética. Leia primeiro.

2. **Samear - Especificacao Tecnica MVP.md** — stack técnica, arquitetura, schema do banco, fases. Leia segundo.

3. **Samear - Painel Visual.html** — protótipo visual do painel principal, com a estética e UX já validadas. Abra no navegador para ver a referência visual de design.

**Antes de escrever qualquer linha de código, faça três coisas:**

1. Leia os três documentos completos
2. Confirme que entendeu:
   - A pergunta-mãe do produto
   - A distinção entre Riqueza e Prosperidade
   - As três bases filosófico-científicas (Aristóteles, Prigogine, Georgescu-Roegen)
   - A arquitetura temporal (Tb, Tab, Tba, Te, Tl, Tt, Tv, Vh)
   - As quatro caixas do dinheiro (Manutenção, Vida, Investimento, Atrito)
   - O tom de voz (familial, não corporativo, com sabedoria)
   - A estética (paleta pêssego/terra, DM Serif Display + Inter, botões pílula)

3. Proponha um plano detalhado para a **Fase 0 (Setup)** descrita na especificação técnica, com passos concretos a executar comigo. Quero acompanhar passo a passo no início.

**Importante:**
- Este projeto evoluirá em fases. Não tente fazer tudo de uma vez.
- O tom do produto é familial e sábio, não corporativo. Lembre-se disso ao nomear coisas, escrever copy, criar microcopy.
- A estética é editorial, com peso clássico (Salomão, sabedoria milenar). Não é um app fintech genérico.
- Já existe um Samear funcionando no Apps Script com dados reais — ele continuará rodando em paralelo durante a transição. Não preciso quebrar nada.
- Custo zero é prioridade no início (Vercel Hobby + Supabase Free). Quando crescer, evolui.

Pronto. Comece pela leitura dos documentos e me apresente o plano da Fase 0.
```

---

## Depois da Fase 0 — Como continuar trabalhando

A cada nova fase do projeto (Fase 1, Fase 2, etc.), abra uma nova sessão com o Claude Code e diga:

```
Estamos no projeto Samear (já leu os documentos de briefing). Vamos para a Fase [N] da especificação técnica: [nome da fase]. Proponha o plano detalhado.
```

O Claude Code vai reler o contexto e propor o próximo passo.

---

## Dicas práticas para trabalhar com Claude Code

**1. Sempre versione antes de mexer**
```bash
git checkout -b fase-1-frontend
```
Trabalhe em branch separada. Quando estiver pronto, dá merge no `main`.

**2. Commits frequentes e pequenos**
Em vez de fazer 50 mudanças e commitar tudo junto, faça commits a cada pequeno passo. Facilita reverter se algo quebrar.

**3. Peça para o Claude Code explicar antes de executar**
Em qualquer mudança grande, diga:
> "Antes de implementar, me explica o que você vai fazer e por quê."

**4. Mostre o painel de referência sempre que falar de UX**
Quando for criar uma nova tela ou componente, abra o `Samear - Painel Visual.html` no navegador e mostre como deve ficar.

**5. Volte ao briefing conceitual quando se sentir perdido**
Se o produto começar a virar "mais um app de gastos", reabra o briefing e relembre a pergunta-mãe. O conceito guia tudo.

---

## Arquivos que devem viver no repositório `samear/docs/`

Crie uma pasta `docs/` na raiz do projeto e copie para lá:

- `briefing-conceitual.md` (renomeado de `Samear - Briefing Conceitual.md`)
- `especificacao-tecnica.md` (renomeado de `Samear - Especificacao Tecnica MVP.md`)
- `painel-visual.html` (renomeado de `Samear - Painel Visual.html`)
- `documento-conceitual.docx` (o doc longo gerado anteriormente)

Assim qualquer pessoa que abrir o repositório (você daqui a 6 meses, ou um futuro dev) tem todo o contexto.

---

## Quando voltar para mim (Claude no chat)

Use este chat para:

- **Decisões conceituais** — quando precisar discutir uma nova dimensão do produto (ex: como modelar entropia financeira detalhada, como capturar A no futuro)
- **Tom de voz e copy** — quando precisar escrever frases sensíveis (mensagens motivacionais, alertas, onboarding)
- **Visualizações novas** — quando precisar prototipar uma tela nova antes de codar
- **Estratégia de negócio** — quando começar a pensar em monetização, marketing, posicionamento

Use o Claude Code para:

- **Tudo que é código** — implementação, refatoração, debug, deploy
- **Configurações técnicas** — Supabase, Next.js, Vercel, GitHub Actions
- **Testes e validação técnica**

Os dois Claude trabalham em camadas diferentes. O do chat pensa o produto. O do código constrói.

---

*Bom trabalho, Rafael. Estamos juntos nesse caminho.*
