'use client'

import { useState } from 'react'
import { DespesaItem } from '@/types'
import { Plus, Trash2 } from 'lucide-react'
import { formatarReais } from '@/lib/calculations'

interface Props {
  itens: DespesaItem[]
  onChange: (itens: DespesaItem[]) => void
  placeholder?: string
  sugestoes?: string[]
}

let contadorId = 0
function gerarId() {
  return `item-${++contadorId}-${Date.now()}`
}

export function ListaDespesas({ itens, onChange, placeholder = 'Ex: Aluguel', sugestoes = [] }: Props) {
  const [novoNome, setNovoNome] = useState('')
  const [novoValor, setNovoValor] = useState('')

  const total = itens.reduce((acc, item) => acc + item.valor, 0)

  const adicionarItem = () => {
    const nome = novoNome.trim()
    const valor = parseInt(novoValor.replace(/\D/g, '') || '0', 10)
    if (!nome || valor <= 0) return

    onChange([...itens, { id: gerarId(), nome, valor }])
    setNovoNome('')
    setNovoValor('')
  }

  const removerItem = (id: string) => {
    onChange(itens.filter(item => item.id !== id))
  }

  const adicionarSugestao = (sugestao: string) => {
    if (!itens.find(i => i.nome.toLowerCase() === sugestao.toLowerCase())) {
      setNovoNome(sugestao)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') adicionarItem()
  }

  return (
    <div className="space-y-3">
      {/* Lista existente */}
      {itens.length > 0 && (
        <div className="space-y-2">
          {itens.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white border border-[#e8d8ce] rounded-xl px-4 py-3"
            >
              <span className="text-[#2d2620] text-sm font-medium flex-1 truncate">{item.nome}</span>
              <span className="text-[#2d2620] text-sm font-semibold mx-3">{formatarReais(item.valor)}</span>
              <button
                type="button"
                onClick={() => removerItem(item.id)}
                className="text-[#8b6f5c] hover:text-[#a32d2d] transition-colors shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          {/* Total */}
          <div className="flex justify-between px-4 py-2 bg-[#f5d9c8] rounded-xl">
            <span className="text-[#8b6f5c] text-sm font-semibold uppercase tracking-wide">Total</span>
            <span className="text-[#2d2620] text-sm font-bold">{formatarReais(total)}</span>
          </div>
        </div>
      )}

      {/* Sugestões */}
      {sugestoes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sugestoes
            .filter(s => !itens.find(i => i.nome.toLowerCase() === s.toLowerCase()))
            .map(s => (
              <button
                key={s}
                type="button"
                onClick={() => adicionarSugestao(s)}
                className="text-xs px-3 py-1.5 bg-white border border-[#e8d8ce] rounded-full text-[#8b6f5c] hover:border-[#d4807a] hover:text-[#d4807a] transition-colors"
              >
                + {s}
              </button>
            ))}
        </div>
      )}

      {/* Adicionar novo */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={novoNome}
          onChange={e => setNovoNome(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-white border border-[#e8d8ce] rounded-xl px-4 py-3 text-[#2d2620] text-sm placeholder:text-[#ccc] focus:outline-none focus:border-[#d4807a] transition-colors"
        />
        <div className="flex items-center bg-white border border-[#e8d8ce] rounded-xl px-3 focus-within:border-[#d4807a] transition-colors">
          <span className="text-[#8b6f5c] text-sm mr-1">R$</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={novoValor}
            onChange={e => {
              const raw = e.target.value.replace(/\D/g, '')
              setNovoValor(raw ? parseInt(raw, 10).toLocaleString('pt-BR') : '')
            }}
            onKeyDown={handleKeyDown}
            className="w-24 bg-transparent text-[#2d2620] text-sm outline-none placeholder:text-[#ccc] py-3"
          />
        </div>
        <button
          type="button"
          onClick={adicionarItem}
          disabled={!novoNome.trim() || !novoValor}
          className="bg-[#d4807a] hover:bg-[#c46e68] text-white rounded-xl p-3 transition-colors disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}
