'use client'

import { useState } from 'react'
import {
  OnboardingData,
  FonteReceita,
  CustoFonte,
  TipoFonte,
} from '@/types'
import {
  calcularIndicadores,
  formatarReais,
  fraseRl,
  fraseVh,
} from '@/lib/calculations'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Plus } from 'lucide-react'

const TIPOS: { valor: TipoFonte; label: string }[] = [
  { valor: 'clt', label: 'CLT' },
  { valor: 'pj', label: 'PJ' },
  { valor: 'autonomo', label: 'Autônomo' },
  { valor: 'empresario', label: 'Empresário' },
  { valor: 'outro', label: 'Outro' },
]

const LABEL_TIPO: Record<TipoFonte, string> = {
  clt: 'CLT',
  pj: 'PJ',
  autonomo: 'Autônomo',
  empresario: 'Empresário',
  outro: 'Outro',
}

// Custos típicos por tipo de fonte — para sugerir, não obrigar.
const CUSTOS_SUGERIDOS: Record<TipoFonte, string[]> = {
  clt: [
    'INSS',
    'Imposto de renda',
    'Vale-transporte',
    'Plano de saúde',
    'Vale-refeição',
    'Previdência privada',
  ],
  pj: ['Impostos (DAS/Simples)', 'Contador', 'INSS', 'Plano de saúde'],
  autonomo: ['INSS', 'ISS', 'Imposto de renda', 'Plano de saúde', 'Transporte'],
  empresario: ['Impostos', 'Contador', 'Pró-labore (INSS)', 'Plano de saúde'],
  outro: ['Impostos', 'Transporte', 'Plano de saúde'],
}

let contador = 0
function gerarId(prefixo: string) {
  return `${prefixo}-${++contador}-${Date.now()}`
}

function somaCustos(custos: CustoFonte[]) {
  return custos.reduce((acc, c) => acc + (c.valor || 0), 0)
}

interface Props {
  dados: OnboardingData
  onChange: (parcial: Partial<OnboardingData>) => void
  onAvancar: () => void
  onVoltar: () => void
}

export function BlocoFontesReceita({
  dados,
  onChange,
  onAvancar,
  onVoltar,
}: Props) {
  const fontes = dados.fontes ?? []
  const indicadores = calcularIndicadores(dados)
  const podeAvancar = fontes.length > 0

  const [adicionando, setAdicionando] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)

  function salvarFonte(fonte: FonteReceita) {
    const existe = fontes.some((f) => f.id === fonte.id)
    onChange({
      fontes: existe
        ? fontes.map((f) => (f.id === fonte.id ? fonte : f))
        : [...fontes, fonte],
    })
    setAdicionando(false)
    setEditandoId(null)
  }

  function removerFonte(id: string) {
    onChange({ fontes: fontes.filter((f) => f.id !== id) })
  }

  return (
    <div className="animate-in-up space-y-7">
      {/* Título */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[#2d2620] leading-tight">
          De onde vem<br />
          <span className="font-serif-italic">o seu dinheiro.</span>
        </h1>
        <p className="text-[#8b6f5c] text-base leading-relaxed">
          Você pode ter mais de uma fonte — um salário, um negócio, um freela
          fixo. Em cada uma, conte o que ela rende, o tempo que toma e os custos
          para mantê-la.
        </p>
      </div>

      {/* Fontes já adicionadas */}
      {fontes.length > 0 && (
        <div className="space-y-2">
          {fontes.map((f) =>
            editandoId === f.id ? (
              <FormularioFonte
                key={f.id}
                inicial={f}
                onSalvar={salvarFonte}
                onCancelar={() => setEditandoId(null)}
              />
            ) : (
              <CartaoFonte
                key={f.id}
                fonte={f}
                onEditar={() => {
                  setAdicionando(false)
                  setEditandoId(f.id)
                }}
                onRemover={() => removerFonte(f.id)}
              />
            ),
          )}
        </div>
      )}

      {/* Formulário de nova fonte */}
      {adicionando ? (
        <FormularioFonte
          ehPrimeira={fontes.length === 0}
          onSalvar={salvarFonte}
          onCancelar={() => setAdicionando(false)}
        />
      ) : (
        <Button
          type="button"
          onClick={() => {
            setEditandoId(null)
            setAdicionando(true)
          }}
          className="w-full h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl"
        >
          {fontes.length === 0 ? 'Adicionar minha primeira fonte' : 'Adicionar outra fonte'}
        </Button>
      )}

      {/* Síntese de todas as fontes */}
      {fontes.length > 0 && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#f5e0de] border border-[#d4807a] space-y-1">
            <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
              Sua receita real
            </p>
            <p className="text-[#2d2620] font-medium text-base">
              {fraseRl(indicadores.r, indicadores.rl)}
            </p>
            <p className="text-[#a32d2d] font-bold text-2xl font-serif">
              {formatarReais(indicadores.rl)}
              <span className="text-base font-normal text-[#8b6f5c]">/mês</span>
            </p>
          </div>

          {indicadores.vh > 0 && (
            <div className="p-4 rounded-xl bg-white border border-[#e8d8ce] space-y-2">
              <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
                Valor da hora (no conjunto)
              </p>
              <p className="text-[#2d2620] text-base">{fraseVh(indicadores.vh)}</p>
              <ValorHoraDetalhe
                bruto={indicadores.r}
                liquido={indicadores.rl}
                horasTrabalhoMes={indicadores.ttTrabalhoMes}
                horasTotalMes={indicadores.ttMes}
              />
            </div>
          )}
        </div>
      )}

      {/* Navegação */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onVoltar}
          className="h-14 px-6 border-[#e8d8ce] text-[#8b6f5c] rounded-xl hover:bg-[#f5d9c8]"
        >
          ←
        </Button>
        <Button
          onClick={onAvancar}
          disabled={!podeAvancar}
          className="flex-1 h-14 text-base font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl disabled:opacity-40"
        >
          Continuar →
        </Button>
      </div>
    </div>
  )
}

// ------------------------------------------------------------
// Cartão de uma fonte já cadastrada
// ------------------------------------------------------------

/** Valor da hora bruto e líquido, em duas bases — tudo por mês. */
function ValorHoraDetalhe({
  bruto,
  liquido,
  horasTrabalhoMes,
  horasTotalMes,
}: {
  bruto: number
  liquido: number
  horasTrabalhoMes: number
  horasTotalMes: number
}) {
  const porHora = (valor: number, horas: number) =>
    horas > 0 ? formatarReais(valor / horas) : '—'

  const temDeslocamento = horasTotalMes > horasTrabalhoMes

  return (
    <div className="space-y-2 pt-1">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
          Por hora trabalhada ({horasTrabalhoMes}h/mês)
        </p>
        <p className="text-sm text-[#8b6f5c]">
          Bruto{' '}
          <strong className="text-[#2d2620]">
            {porHora(bruto, horasTrabalhoMes)}
          </strong>{' '}
          · Líquido{' '}
          <strong className="text-[#d4807a]">
            {porHora(liquido, horasTrabalhoMes)}
          </strong>
        </p>
      </div>
      {temDeslocamento && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
            Com deslocamento ({horasTotalMes}h/mês)
          </p>
          <p className="text-sm text-[#8b6f5c]">
            Bruto{' '}
            <strong className="text-[#2d2620]">
              {porHora(bruto, horasTotalMes)}
            </strong>{' '}
            · Líquido{' '}
            <strong className="text-[#d4807a]">
              {porHora(liquido, horasTotalMes)}
            </strong>
          </p>
        </div>
      )}
    </div>
  )
}

function CartaoFonte({
  fonte,
  onEditar,
  onRemover,
}: {
  fonte: FonteReceita
  onEditar: () => void
  onRemover: () => void
}) {
  const totalCustos = somaCustos(fonte.custos)
  const horasMes = fonte.horasTrabalhoMes + fonte.horasDeslocamentoMes

  return (
    <div className="bg-white border border-[#e8d8ce] rounded-xl p-4 space-y-1.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#2d2620] font-semibold">{fonte.nome}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide bg-[#f5d9c8] text-[#8b6f5c] px-2 py-0.5 rounded-full">
            {LABEL_TIPO[fonte.tipo]}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onEditar}
            aria-label="Editar fonte"
            className="text-[#8b6f5c] hover:text-[#2d2620] p-1 rounded-md hover:bg-[#fdeee4]"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={onRemover}
            aria-label="Remover fonte"
            className="text-[#8b6f5c] hover:text-[#a32d2d] p-1 rounded-md hover:bg-[#fdeee4]"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="text-sm text-[#8b6f5c]">
        <strong className="text-[#2d2620]">
          {formatarReais(fonte.valorMensal)}
        </strong>
        /mês
      </div>

      <div className="text-xs text-[#8b6f5c]">
        {fonte.horasTrabalhoMes}h de trabalho
        {fonte.horasDeslocamentoMes > 0 && (
          <> + {fonte.horasDeslocamentoMes}h de deslocamento</>
        )}{' '}
        por mês
      </div>

      {totalCustos > 0 && (
        <div className="text-xs text-[#8b6f5c]">
          {formatarReais(totalCustos)} em custos
          {fonte.custos.length > 0 && (
            <> ({fonte.custos.map((c) => c.nome).join(', ')})</>
          )}
        </div>
      )}

      {horasMes > 0 && (
        <ValorHoraDetalhe
          bruto={fonte.valorMensal}
          liquido={fonte.valorMensal - totalCustos}
          horasTrabalhoMes={fonte.horasTrabalhoMes}
          horasTotalMes={horasMes}
        />
      )}
    </div>
  )
}

// ------------------------------------------------------------
// Formulário de fonte (adicionar e editar)
// ------------------------------------------------------------

function FormularioFonte({
  inicial,
  ehPrimeira,
  onSalvar,
  onCancelar,
}: {
  inicial?: FonteReceita
  ehPrimeira?: boolean
  onSalvar: (f: FonteReceita) => void
  onCancelar: () => void
}) {
  const editando = !!inicial
  const [nome, setNome] = useState(inicial?.nome ?? '')
  const [tipo, setTipo] = useState<TipoFonte>(inicial?.tipo ?? 'clt')
  const [valor, setValor] = useState(
    inicial?.valorMensal ? String(inicial.valorMensal) : '',
  )
  const [horasTrabalho, setHorasTrabalho] = useState(
    inicial?.horasTrabalhoMes ? String(inicial.horasTrabalhoMes) : '',
  )
  const [horasDeslocamento, setHorasDeslocamento] = useState(
    inicial?.horasDeslocamentoMes ? String(inicial.horasDeslocamentoMes) : '',
  )
  const [custos, setCustos] = useState<CustoFonte[]>(inicial?.custos ?? [])
  const [custoNome, setCustoNome] = useState('')
  const [custoValor, setCustoValor] = useState('')

  const valorNum = parseInt(valor.replace(/\D/g, '') || '0', 10)
  const trabNum = parseFloat(horasTrabalho.replace(',', '.')) || 0
  const deslNum = parseFloat(horasDeslocamento.replace(',', '.')) || 0
  const podeSalvar = nome.trim().length > 0 && valorNum > 0 && trabNum + deslNum > 0
  const totalCustos = somaCustos(custos)

  function adicionarCusto(nomeCusto: string, valorCusto: string) {
    const n = nomeCusto.trim()
    const v = parseInt(valorCusto.replace(/\D/g, '') || '0', 10)
    if (!n || v <= 0) return
    setCustos((prev) => [...prev, { id: gerarId('custo'), nome: n, valor: v }])
    setCustoNome('')
    setCustoValor('')
  }

  function salvar() {
    if (!podeSalvar) return
    onSalvar({
      id: inicial?.id ?? gerarId('fonte'),
      nome: nome.trim(),
      tipo,
      valorMensal: valorNum,
      horasTrabalhoMes: trabNum,
      horasDeslocamentoMes: deslNum,
      custos,
    })
  }

  const sugestoes = CUSTOS_SUGERIDOS[tipo].filter(
    (s) => !custos.some((c) => c.nome.toLowerCase() === s.toLowerCase()),
  )

  return (
    <div className="bg-[#fdeee4] border border-[#e8d8ce] rounded-2xl p-4 space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
        {editando
          ? 'Editar fonte'
          : ehPrimeira
            ? 'Sua primeira fonte'
            : 'Nova fonte'}
      </p>

      {/* Nome */}
      <input
        type="text"
        placeholder="Nome (ex.: Salário, Minha loja)"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full bg-white border border-[#e8d8ce] rounded-xl px-4 py-3 text-[#2d2620] text-base placeholder:text-[#ccc] focus:outline-none focus:border-[#d4807a] transition-colors"
      />

      {/* Tipo */}
      <div className="flex flex-wrap gap-2">
        {TIPOS.map((t) => (
          <button
            key={t.valor}
            type="button"
            onClick={() => setTipo(t.valor)}
            className="text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors"
            style={{
              background: tipo === t.valor ? '#d4807a' : 'transparent',
              color: tipo === t.valor ? '#fff' : '#8b6f5c',
              borderColor: tipo === t.valor ? '#d4807a' : '#e8d8ce',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Valor */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
          Quanto rende / mês
        </label>
        <div className="flex items-center bg-white border border-[#e8d8ce] rounded-xl px-3 py-2.5 focus-within:border-[#d4807a]">
          <span className="text-[#8b6f5c] text-sm mr-1">R$</span>
          <input
            inputMode="numeric"
            placeholder="0"
            value={valorNum > 0 ? valorNum.toLocaleString('pt-BR') : ''}
            onChange={(e) => setValor(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-transparent text-[#2d2620] outline-none placeholder:text-[#ccc]"
          />
        </div>
      </div>

      {/* Horas: trabalho + deslocamento (por mês) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
            Trabalho / mês
          </label>
          <div className="flex items-center bg-white border border-[#e8d8ce] rounded-xl px-3 py-2.5 focus-within:border-[#d4807a]">
            <input
              inputMode="decimal"
              placeholder="0"
              value={horasTrabalho}
              onChange={(e) =>
                setHorasTrabalho(e.target.value.replace(/[^\d.,]/g, ''))
              }
              className="w-full bg-transparent text-[#2d2620] outline-none placeholder:text-[#ccc]"
            />
            <span className="text-[#8b6f5c] text-sm ml-1">h/mês</span>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
            Deslocamento / mês
          </label>
          <div className="flex items-center bg-white border border-[#e8d8ce] rounded-xl px-3 py-2.5 focus-within:border-[#d4807a]">
            <input
              inputMode="decimal"
              placeholder="0"
              value={horasDeslocamento}
              onChange={(e) =>
                setHorasDeslocamento(e.target.value.replace(/[^\d.,]/g, ''))
              }
              className="w-full bg-transparent text-[#2d2620] outline-none placeholder:text-[#ccc]"
            />
            <span className="text-[#8b6f5c] text-sm ml-1">h/mês</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-[#8b6f5c] -mt-2">
        Tudo no mês, na mesma base da renda. Uma jornada de ~40h por semana dá
        cerca de 176h por mês. O deslocamento também conta — é tempo que o
        trabalho consome.
      </p>
      {tipo !== 'clt' && (
        <p className="text-xs text-[#8b6f5c] -mt-1 bg-white border border-[#e8d8ce] rounded-lg px-3 py-2">
          Renda irregular? Estime uma média mensal. As contas da vida (aluguel,
          luz, escola) são mensais — a sua hora também precisa ser.
        </p>
      )}

      {/* Custos itemizados */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-[#8b6f5c]">
          Custos e descontos
        </label>
        <p className="text-xs text-[#8b6f5c]">
          O que sai antes de chegar a você ou para manter este trabalho —
          impostos, transporte, benefícios divididos com a empresa.
        </p>

        {custos.length > 0 && (
          <div className="space-y-2">
            {custos.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-white border border-[#e8d8ce] rounded-lg px-3 py-2"
              >
                <span className="text-[#2d2620] text-sm flex-1 truncate">
                  {c.nome}
                </span>
                <span className="text-[#2d2620] text-sm font-semibold mx-3">
                  {formatarReais(c.valor)}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCustos((prev) => prev.filter((x) => x.id !== c.id))
                  }
                  aria-label="Remover custo"
                  className="text-[#8b6f5c] hover:text-[#a32d2d] shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <div className="flex justify-between px-3 py-1.5 bg-[#f5d9c8] rounded-lg">
              <span className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-wide">
                Total de custos
              </span>
              <span className="text-[#2d2620] text-xs font-bold">
                {formatarReais(totalCustos)}
              </span>
            </div>
          </div>
        )}

        {/* Sugestões de custo por tipo */}
        {sugestoes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sugestoes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setCustoNome(s)}
                className="text-xs px-3 py-1.5 bg-white border border-[#e8d8ce] rounded-full text-[#8b6f5c] hover:border-[#d4807a] hover:text-[#d4807a] transition-colors"
              >
                + {s}
              </button>
            ))}
          </div>
        )}

        {/* Adicionar custo */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Custo (ex.: Plano de saúde)"
            value={custoNome}
            onChange={(e) => setCustoNome(e.target.value)}
            className="flex-1 min-w-0 bg-white border border-[#e8d8ce] rounded-lg px-3 py-2 text-sm text-[#2d2620] outline-none focus:border-[#d4807a]"
          />
          <div className="flex items-center bg-white border border-[#e8d8ce] rounded-lg px-2 focus-within:border-[#d4807a]">
            <span className="text-[#8b6f5c] text-xs mr-1">R$</span>
            <input
              inputMode="numeric"
              placeholder="0"
              value={
                custoValor
                  ? parseInt(custoValor, 10).toLocaleString('pt-BR')
                  : ''
              }
              onChange={(e) =>
                setCustoValor(e.target.value.replace(/\D/g, ''))
              }
              className="w-16 bg-transparent text-[#2d2620] text-sm outline-none placeholder:text-[#ccc] py-2"
            />
          </div>
          <button
            type="button"
            onClick={() => adicionarCusto(custoNome, custoValor)}
            disabled={!custoNome.trim() || !custoValor}
            className="bg-[#f5d9c8] hover:bg-[#efcdb6] text-[#2d2620] rounded-lg p-2 disabled:opacity-40"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          onClick={salvar}
          disabled={!podeSalvar}
          className="flex-1 h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl disabled:opacity-40"
        >
          {editando ? 'Salvar alterações' : 'Salvar fonte'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancelar}
          className="h-12 px-4 text-[#8b6f5c] hover:text-[#2d2620] hover:bg-[#f5d9c8] rounded-xl"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
