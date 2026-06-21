'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatarReais, formatarHoras } from '@/lib/calculations'
import {
  CAIXAS,
  carregarOrcamento,
  carregarGastos,
  salvarGastos,
  gastoDoItemNoMes,
  horasDeVida,
  mesmoMes,
  novoId,
  type Orcamento,
  type Gasto,
  type ItemOrcamento,
} from '@/lib/registro'

export default function RegistroPage() {
  const [orcamento, setOrcamento] = useState<Orcamento | null>(null)
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    setOrcamento(carregarOrcamento())
    setGastos(carregarGastos())
    setPronto(true)
  }, [])

  useEffect(() => {
    if (pronto) salvarGastos(gastos)
  }, [gastos, pronto])

  function registrar(g: Gasto) {
    setGastos((prev) => [g, ...prev])
  }
  function remover(id: string) {
    setGastos((prev) => prev.filter((g) => g.id !== id))
  }

  const vh = orcamento?.vh ?? 0

  return (
    <div className="min-h-screen bg-[#fdeee4] flex flex-col">
      <header className="px-6 pt-8 pb-2 flex items-center justify-between max-w-lg mx-auto w-full">
        <span className="font-serif text-[#2d2620] text-xl tracking-wide">
          semear
        </span>
        <Link
          href="/mapa"
          className="text-[#8b6f5c] text-sm font-medium hover:text-[#2d2620]"
        >
          ← a roda
        </Link>
      </header>

      <main className="flex-1 px-6 pb-12 max-w-lg mx-auto w-full">
        <div className="pt-2 pb-4">
          <p className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest">
            O dia a dia
          </p>
          <h1 className="font-serif text-3xl text-[#2d2620] leading-tight mt-1">
            O que você<br />
            <span className="font-serif-italic">gastou hoje?</span>
          </h1>
          <p className="text-[#8b6f5c] text-sm leading-relaxed mt-2">
            Registre suas escolhas de vida — o jantar, a viagem, o impulso — e
            veja, na hora, quantas horas da sua vida aquilo custou.
          </p>
        </div>

        {!orcamento || orcamento.itens.length === 0 ? (
          <EstadoVazio />
        ) : (
          <>
            <FormularioGasto
              orcamento={orcamento}
              gastos={gastos}
              onRegistrar={registrar}
            />
            <Espelho orcamento={orcamento} gastos={gastos} />
            <Recentes
              gastos={gastos}
              vh={vh}
              onRemover={remover}
            />
          </>
        )}
      </main>
    </div>
  )
}

function EstadoVazio() {
  return (
    <div className="bg-white border border-[#e8d8ce] rounded-2xl p-6 text-center space-y-3">
      <p className="text-[#2d2620] font-serif text-xl">
        Primeiro, seus guarda-chuvas.
      </p>
      <p className="text-[#8b6f5c] text-sm leading-relaxed">
        O registro compara o seu dia a dia com o que você planejou. Faça o
        diagnóstico para definir seus guarda-chuvas de gasto.
      </p>
      <Link href="/onboarding">
        <Button className="w-full h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl mt-1">
          Fazer meu diagnóstico
        </Button>
      </Link>
    </div>
  )
}

// ------------------------------------------------------------
// Formulário de registro
// ------------------------------------------------------------

function FormularioGasto({
  orcamento,
  gastos,
  onRegistrar,
}: {
  orcamento: Orcamento
  gastos: Gasto[]
  onRegistrar: (g: Gasto) => void
}) {
  const [valor, setValor] = useState('')
  const [itemId, setItemId] = useState<string | null>(null)
  const [ultimo, setUltimo] = useState<{ horas: number; nome: string } | null>(
    null,
  )

  // Registro diário é só das escolhas ativas: Vida e Desperdício.
  // Manutenção é um bloco mensal, não um lançamento do dia a dia.
  const itensAtivos = orcamento.itens.filter(
    (i) => i.caixa === 'vida' || i.caixa === 'desperdicio',
  )

  const valorNum = parseInt(valor.replace(/\D/g, '') || '0', 10)
  const item = itensAtivos.find((i) => i.id === itemId) ?? null
  const podeRegistrar = valorNum > 0 && !!item
  const horas = horasDeVida(valorNum, orcamento.vh)

  // Horas que restam no guarda-chuva escolhido, depois deste gasto.
  const restanteAposH = item
    ? horasDeVida(
        item.orcado - gastoDoItemNoMes(item.id, gastos) - valorNum,
        orcamento.vh,
      )
    : 0

  function registrar() {
    if (!podeRegistrar || !item) return
    onRegistrar({
      id: novoId(),
      data: new Date().toISOString(),
      nome: item.nome,
      valor: valorNum,
      itemId: item.id,
      caixa: item.caixa,
    })
    setUltimo({ horas: horasDeVida(valorNum, orcamento.vh), nome: item.nome })
    setValor('')
    setItemId(null)
  }

  return (
    <div className="bg-white border border-[#e8d8ce] rounded-2xl p-5 space-y-4">
      {/* Valor */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Quanto gastou?
        </label>
        <div className="flex items-center bg-[#fdeee4] border border-[#e8d8ce] rounded-xl px-4 py-3 focus-within:border-[#d4807a]">
          <span className="text-[#8b6f5c] text-lg mr-1">R$</span>
          <input
            inputMode="numeric"
            autoFocus
            placeholder="0"
            value={valorNum > 0 ? valorNum.toLocaleString('pt-BR') : ''}
            onChange={(e) => {
              setValor(e.target.value.replace(/\D/g, ''))
              setUltimo(null)
            }}
            className="w-full bg-transparent text-[#2d2620] text-2xl font-light outline-none placeholder:text-[#ccc]"
          />
        </div>
        {valorNum > 0 && orcamento.vh > 0 && (
          <p className="text-sm text-[#8b6f5c] pt-0.5">
            Isso custa{' '}
            <strong className="text-[#d4807a]">{formatarHoras(horas)}</strong> da
            sua vida.
          </p>
        )}
      </div>

      {/* Guarda-chuva */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-[#8b6f5c]">
          Em qual guarda-chuva?
        </label>
        <div className="flex flex-wrap gap-2">
          {itensAtivos.map((i) => {
            const cor = CAIXAS[i.caixa].cor
            const ativo = itemId === i.id
            return (
              <button
                key={i.id}
                onClick={() => {
                  setItemId(i.id)
                  setUltimo(null)
                }}
                className="text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  background: ativo ? cor : 'transparent',
                  color: ativo ? '#fff' : cor,
                  borderColor: cor,
                }}
              >
                {i.nome}
              </button>
            )
          })}
        </div>
      </div>

      {/* Projeção em horas de vida no guarda-chuva */}
      {item && valorNum > 0 && (
        <p className="text-sm leading-relaxed text-[#8b6f5c]">
          {restanteAposH >= 0 ? (
            <>
              Depois deste gasto, restam{' '}
              <strong className="text-[#2d7a4a]">
                {formatarHoras(restanteAposH)}
              </strong>{' '}
              de vida em <strong className="text-[#2d2620]">{item.nome}</strong>{' '}
              neste mês.
            </>
          ) : (
            <>
              Isso passa{' '}
              <strong className="text-[#a32d2d]">
                {formatarHoras(-restanteAposH)}
              </strong>{' '}
              além do que você reservou para{' '}
              <strong className="text-[#2d2620]">{item.nome}</strong> este mês.
            </>
          )}
        </p>
      )}

      <Button
        onClick={registrar}
        disabled={!podeRegistrar}
        className="w-full h-12 font-semibold bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl disabled:opacity-40"
      >
        Registrar gasto
      </Button>

      {/* Celebração discreta do passo */}
      {ultimo && (
        <div className="bg-[#e8f4eb] border border-[#6fa572] rounded-xl px-4 py-3 animate-in-up">
          <p className="text-sm text-[#2d7a4a]">
            Registrado em <strong>{ultimo.nome}</strong> —{' '}
            {formatarHoras(ultimo.horas)} da sua vida, agora conscientes.
          </p>
        </div>
      )}
    </div>
  )
}

// ------------------------------------------------------------
// Espelho: orçado x gasto no mês
// ------------------------------------------------------------

function Espelho({
  orcamento,
  gastos,
}: {
  orcamento: Orcamento
  gastos: Gasto[]
}) {
  const grupos = useMemo(() => {
    // O espelho diário acompanha as escolhas ativas: Vida e Desperdício.
    // Manutenção é revista uma vez por mês, em ritual próprio.
    const ordem: ItemOrcamento['caixa'][] = ['vida', 'desperdicio']
    return ordem
      .map((caixa) => ({
        caixa,
        itens: orcamento.itens.filter((i) => i.caixa === caixa),
      }))
      .filter((g) => g.itens.length > 0)
  }, [orcamento])

  if (grupos.length === 0) return null

  return (
    <div className="mt-6 space-y-5">
      <h2 className="font-serif text-xl text-[#2d2620]">
        Quanto de vida ainda cabe
      </h2>

      {grupos.map(({ caixa, itens }) => (
        <div key={caixa} className="space-y-3">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: CAIXAS[caixa].cor }}
          >
            {CAIXAS[caixa].nome}
          </p>
          {itens.map((item) => (
            <LinhaEspelho
              key={item.id}
              item={item}
              gasto={gastoDoItemNoMes(item.id, gastos)}
              vh={orcamento.vh}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function LinhaEspelho({
  item,
  gasto,
  vh,
}: {
  item: ItemOrcamento
  gasto: number
  vh: number
}) {
  const cor = CAIXAS[item.caixa].cor
  const ehDesperdicio = item.caixa === 'desperdicio'
  const temReserva = item.orcado > 0
  const acima = temReserva && gasto > item.orcado
  const pct = temReserva ? (gasto / item.orcado) * 100 : gasto > 0 ? 100 : 0
  const gastoH = horasDeVida(gasto, vh)
  const reservadoH = horasDeVida(item.orcado, vh)
  const restanteH = horasDeVida(item.orcado - gasto, vh)

  return (
    <div className="bg-white border border-[#e8d8ce] rounded-xl p-4 space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[#2d2620] font-medium">{item.nome}</span>
        <span className="text-xs text-[#8b6f5c]">
          {formatarReais(gasto)}
          {temReserva && <> de {formatarReais(item.orcado)}</>}
        </span>
      </div>
      <div className="h-1.5 bg-[#f5d9c8] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(100, pct)}%`,
            background: ehDesperdicio || acima ? '#a32d2d' : cor,
          }}
        />
      </div>
      {ehDesperdicio ? (
        <p className="text-sm text-[#8b6f5c]">
          {gasto > 0 ? (
            <>
              Escapou{' '}
              <strong className="text-[#a32d2d]">{formatarHoras(gastoH)}</strong>{' '}
              de vida em atrito neste mês.
            </>
          ) : (
            'Nada escapou aqui ainda. Que continue assim.'
          )}
        </p>
      ) : acima ? (
        <p className="text-sm text-[#a32d2d]">
          Você já viveu as {formatarHoras(reservadoH)} que reservou aqui — e
          seguiu{' '}
          <strong>{formatarHoras(horasDeVida(gasto - item.orcado, vh))}</strong>{' '}
          além.
        </p>
      ) : temReserva ? (
        <p className="text-sm text-[#8b6f5c]">
          Restam{' '}
          <strong className="text-[#2d7a4a]">{formatarHoras(restanteH)}</strong>{' '}
          de vida aqui neste mês.
        </p>
      ) : (
        <p className="text-sm text-[#8b6f5c]">
          Você viveu{' '}
          <strong className="text-[#2d2620]">{formatarHoras(gastoH)}</strong>{' '}
          aqui — sem reserva definida.
        </p>
      )}
    </div>
  )
}

// ------------------------------------------------------------
// Gastos recentes
// ------------------------------------------------------------

function Recentes({
  gastos,
  vh,
  onRemover,
}: {
  gastos: Gasto[]
  vh: number
  onRemover: (id: string) => void
}) {
  const doMes = gastos.filter((g) => mesmoMes(g.data)).slice(0, 12)
  if (doMes.length === 0) return null

  return (
    <div className="mt-6 space-y-2">
      <h2 className="font-serif text-xl text-[#2d2620] mb-1">Registros recentes</h2>
      {doMes.map((g) => (
        <div
          key={g.id}
          className="flex items-center justify-between gap-3 bg-white border border-[#e8d8ce] rounded-xl px-4 py-2.5"
        >
          <div className="min-w-0">
            <span className="text-sm text-[#2d2620] font-medium">{g.nome}</span>
            <span className="text-xs text-[#8b6f5c] ml-2">
              {new Date(g.data).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-sm text-[#2d2620] font-semibold">
                {formatarReais(g.valor)}
              </p>
              <p className="text-[11px] text-[#8b6f5c]">
                {formatarHoras(horasDeVida(g.valor, vh))}
              </p>
            </div>
            <button
              onClick={() => onRemover(g.id)}
              aria-label="Remover registro"
              className="text-[#8b6f5c] hover:text-[#a32d2d]"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
