# Samear — Documentação Técnica do Apps Script (Legado)

**Versão:** v2.4
**Última atualização:** 17/05/2026
**Status:** Em uso paralelo. Será mantido até a migração para Next.js + Supabase concluir.
**Mantenedor:** Rafael Q. Rangel

---

## 1. Visão geral

O Samear no Apps Script é o **MVP funcional atual** — onde Rafael e Marcela registram gastos reais da família, validando o conceito do produto na vida real antes de migrar para a stack SaaS.

Esta documentação substitui versões anteriores (v1.4) e consolida o estado atual.

---

## 2. Arquitetura atual

### Stack
- **Backend:** Google Apps Script (JavaScript)
- **Frontend:** HTML + CSS + JavaScript vanilla servido como Web App
- **Persistência:** Google Sheets (planilha `ORCAMENTO CASA`)
- **Acesso:** URL do Web App salva como atalho no iPhone

### Fluxo de uso
1. Usuário toca no atalho Samear no iPhone (ou abre URL no navegador)
2. `doGet()` serve `formulario.html`
3. Usuário escolhe **Registrar** ou **Consultar**

**Registrar:**
- Preenche os campos (titular, descrição, valor, parcelas, mês, ano, pagador, percentual)
- `google.script.run.registrarGastoWeb(dados)` grava na aba GASTOS

**Consultar:**
- Define filtros (titular, pagador, ano, mês — mês com multi-select)
- `google.script.run.buscarGastosWeb(filtros)` retorna gastos
- Tabela renderiza com badges coloridos, ordenação por colunas, totais

---

## 3. Identificação e acessos

- **Planilha:** `ORCAMENTO CASA`
- **ID da planilha:** `1ueYEZ4HCoD9ZWjlbOz9YDclajvOAFnWQ34UcH0n1BJw`
- **URL da planilha:** https://docs.google.com/spreadsheets/d/1ueYEZ4HCoD9ZWjlbOz9YDclajvOAFnWQ34UcH0n1BJw/edit
- **Projeto Apps Script:** `atualizarBancoDeDados_contas...`
- **URL Web App:** https://script.google.com/macros/s/AKfycbwQYyn0HslmU9v334clpGDAMhY9a1tehiGSJ4QGWqj9ZiDtWY52CZNZtXK9G10uw_sgjw/exec
- **Código de implantação:** `AKfycbwQYyn0HslmU9v334clpGDAMhY9a1tehiGSJ4QGWqj9ZiDtWY52CZNZtXK9G10uw_sgjw`

### Usuários
- **Proprietário:** rafael.q.rangel@gmail.com
- **Editora:** marcelarprangel@gmail.com (permissão de edição na planilha)

---

## 4. Estrutura da planilha

### Abas existentes
- `__configs` — metadados do projeto
- `dbContasPagar` — base de transações importadas (legado)
- `Categorias` — mapeamento de lançamentos para categorias amigáveis
- `FINANÇAS NOVO` — orçamento familiar mensal, tabela de planejamento
- **`GASTOS`** — banco de dados principal do Samear (input via Web App)
- `GASTOS_FIXOS` — gastos recorrentes do cartão (legado)
- `BANCO` — controle de pagamentos e fluxo bancário

### Aba `GASTOS` (banco de dados principal)

| Col | Nome | Tipo | Descrição |
|-----|------|------|-----------|
| A | Titular_Gasto | Texto | Quem efetivamente fez o gasto |
| B | Descrição | Texto | O que foi comprado |
| C | Valor Total | Número | Valor total do gasto |
| D | Valor Total Parcela | Número | = C ÷ Total Parcelas |
| E | % Parcela | Decimal 0-1 | Percentual que o Pagador cobre |
| F | Valor Parcela Conta | Número | = D × E |
| G | Parcela Nº | Inteiro | 1, 2, 3... |
| H | Total Parcelas | Inteiro | Quantas parcelas no total |
| I | Mês | Texto | Formato "NN MMM" (ex: "05 MAI") |
| J | Ano | Inteiro | 2025, 2026... |
| K | Data Registro | Texto | "dd/MM/yyyy" |
| L | Pagador | Texto | Quem vai pagar/ressarcir |

### Contas válidas (titular e pagador)
- RAFAEL
- MARCELA
- CASA
- HEALTH KID
- POUP DOG
- INVESTIMENTO

---

## 5. Código atual

### Arquivos no projeto Apps Script
- `Código.gs` — script independente para importar CSVs para `dbContasPagar`
- `EnviarGastosOrcamento.gs` — lógica server-side do Samear
- `formulario.html` — interface (HTML + CSS + JS vanilla)

### Funções principais no `EnviarGastosOrcamento.gs`

**`doGet()`** — Servidor: retorna `formulario.html` quando alguém acessa a URL.

**`registrarGastoWeb(dados)`** — Principal: recebe JSON do formulário, valida, calcula parcelas, grava em GASTOS. Retorna `{ sucesso: bool, mensagem: string }`.

**`buscarGastosWeb(filtros)`** — Principal: busca gastos por filtros (titular, pagador, ano, meses como array). Converte Date para string. Retorna array de objetos.

**`enviarGasto(chamadaViaTrigger)`** — Legado: lê células AP2-AP10 da aba FINANÇAS NOVO e grava em GASTOS. Mantida por compatibilidade.

### Schema do objeto `dados` enviado pelo formulário

```javascript
{
  titularGasto: string,    // uma das 6 contas
  descricao: string,
  valorTotal: number,
  totalParcelas: int,
  mesReferencia: string,   // "NN MMM"
  anoReferencia: int,
  pagador: string,         // uma das 6 contas
  percConta: decimal       // 0 a 1
}
```

### Schema do objeto retornado por `buscarGastosWeb`

```javascript
{
  titular: string,
  descricao: string,
  valorTotal: number,
  parcelaNum: int,
  totalParcelas: int,
  mes: string,
  ano: int,
  dataRegistro: string,    // "dd/MM/yyyy"
  pagador: string,
  valorParcelaPagador: number
}
```

---

## 6. Funcionalidades do Web App atual (v2.4)

### Aba REGISTRAR
- 6 botões pílula para titular do gasto
- Campo de descrição
- Campo de valor (formatação automática em moeda brasileira)
- Campo de número de parcelas
- 12 botões pílula para mês (default: mês atual)
- 4 botões pílula para ano (default: ano atual)
- 6 botões pílula para pagador
- Campo percentual do pagador (0-100, sufixo %)
- Botão "Registrar gasto" com feedback visual

### Aba CONSULTAR
- Filtros (todos com botões pílula):
  - Quem fez o gasto: Todos + 6 contas
  - Conta pagadora: Todos + 6 contas
  - Ano: 2025-2028 (single select)
  - Mês: 12 meses (MULTI-SELECT, com hint)
- Cards de resumo (4 cards):
  - Total de gastos (quantidade)
  - Valor total (R$)
  - Saldo a receber (R$) — onde titular ≠ pagador
  - Gasto líquido (R$) — valor total − a receber
- Tabela com colunas:
  - Mês (abreviação) | Gasto | Titular (badge) | Pagador (badge) | Parcela X/Y | Valor parcela | Parcela pagador | Registrado em
  - Ordenação clicável em todas as colunas (asc/desc, indicador ▲▼⇅)
- Frases temáticas:
  - Carregando: 15 variações ("Semeando os números da família...")
  - Vazio: 10 variações ("Nenhuma semente brotou neste período. Ainda.")

---

## 7. Implantação (Web App)

### Configuração atual
- **Descrição:** Samear v2.4 — Filtros avançados, ordenação, frases temáticas
- **Executar como:** Eu (Rafael)
- **Quem pode acessar:** Qualquer pessoa com conta do Google

### Como atualizar
1. Editar código no editor Apps Script
2. Salvar (Cmd+S)
3. Implantar → Gerenciar implantações
4. Editar a implantação atual (ícone lápis)
5. Versão: Nova versão
6. Descrição: `Samear vX.Y — [mudança]`
7. Implantar

A URL não muda entre versões. Atalhos no iPhone continuam funcionando.

### Histórico de versões

| Versão | Data | Mudança |
|--------|------|---------|
| v1.0–1.4 | 09/05/26 | Inicial até botões clicáveis |
| v1.5–1.7 | 09/05/26 | Logo, ícone, aba Consultar |
| v1.8–1.9 | 16/05/26 | Fix busca por ID da planilha |
| v2.0–2.3 | 17/05/26 | Debug serialização Date, renomeações conceituais (Titular_Gasto, Pagador, percConta) |
| v2.4 | 17/05/26 | Filtros avançados (pagador, multi-mês), ordenação de tabela, frases temáticas, coluna Mês, cards Saldo a receber + Gasto líquido |

---

## 8. Limitações conhecidas

### Sandbox Caja do Apps Script
HTML servido bloqueia `onclick=` inline. Sempre usar `addEventListener` dentro de `DOMContentLoaded`.

### App Sheets no iOS é frágil
Não sincroniza edições em tempo real quando tela bloqueia. Por isso o input migrou de checkbox para Web App.

### Serialização de Date
Objetos Date precisam ser convertidos para string antes de retornar via `google.script.run`. Caso contrário, a função pode retornar `null` silenciosamente.

### Contas hardcoded
As 6 contas estão fixas no HTML do formulário. Adicionar nova exige editar e reimplantar. **Será resolvido na migração para Supabase.**

### Sem multi-tenancy
Tudo está em uma única planilha. Não há separação de dados por usuário. **Será resolvido na migração com Row Level Security do Supabase.**

---

## 9. Roadmap deste Apps Script (até a migração)

### Curto prazo (próximas semanas)
- Manter estabilidade
- Continuar inserindo gastos reais para alimentar o backlog de dados
- Pequenos ajustes de UX se necessário

### Quando migrar
- Quando o novo Samear (Next.js + Supabase) estiver com Painel + Registrar funcionais
- Exportar dados da aba GASTOS em CSV
- Importar para a tabela `gastos` no Supabase via script único
- Apps Script entra em modo somente-leitura para arquivo histórico

### O que NÃO fazer
- Não adicionar novas funcionalidades grandes a este Apps Script
- Não tentar implementar Painel/Dashboard aqui — fica para a stack nova
- Não reescrever em outra linguagem dentro do Apps Script — esforço desperdiçado

---

## 10. Referências cruzadas

- **Briefing conceitual completo:** `Samear - Briefing Conceitual.md`
- **Especificação técnica do MVP (Next.js):** `Samear - Especificacao Tecnica MVP.md`
- **Prompt inicial para Claude Code:** `Samear - Prompt Inicial Claude Code.md`
- **Painel visual de referência:** `Samear - Painel Visual.html`

---

## 11. Como retomar este Apps Script

Se você (ou um futuro Claude no chat) precisa voltar a este projeto:

1. Ler esta documentação inteira (~10 min)
2. Abrir planilha ORCAMENTO CASA no Drive
3. Extensões → Apps Script → projeto `atualizarBancoDeDados_contas...`
4. Olhar `EnviarGastosOrcamento.gs` (lógica) e `formulario.html` (interface)
5. Mudanças: editar → salvar → implantar nova versão
6. Atualizar a tabela de versões na seção 7.3 desta documentação

---

*Esta documentação substitui versões anteriores. Mantém o Apps Script vivo enquanto a migração para a stack SaaS acontece.*
