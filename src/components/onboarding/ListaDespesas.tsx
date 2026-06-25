'use client'

import { useState } from 'react'
import { DespesaItem } from '@/types'
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react'
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
  const [editId, setEditId] = useState<string | null>(null)
  const [editNome, setEditNome] = useState('')
  const [editValor, setEditValor] = useState('')

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

  const iniciarEdicao = (item: DespesaItem) => {
    setEditId(item.id)
    setEditNome(item.nome)
    setEditValor(item.valor.toLocaleString('pt-BR'))
  }

  const salvarEdicao = () => {
    const nome = editNome.trim()
    const valor = parseInt(editValor.replace(/\D/g, '') || '0', 10)
    if (!nome || valor <= 0) return
    onChange(itens.map(i => (i.id === editId ? { ...i, nome, valor } : i)))
    setEditId(null)
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
          {itens.map(item =>
            editId === item.id ? (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-white border border-[#d4807a] rounded-xl px-3 py-2"
              >
                <input
                  type="text"
                  value={editNome}
                  onChange={e => setEditNome(e.target.value)}
                  className="flex-1 min-w-0 bg-[#fdeee4] border border-[#e8d8ce] rounded-lg px-2 py-1.5 text-[#2d2620] text-sm outline-none focus:border-[#d4807a]"
                />
                <div className="flex items-center bg-[#fdeee4] border border-[#e8d8ce] rounded-lg px-2">
                  <span className="text-[#8b6f5c] text-xs mr-1">R$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editValor}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '')
                      setEditValor(raw ? parseInt(raw, 10).toLocaleString('pt-BR') : '')
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') salvarEdicao()
                    }}
                    className="w-16 bg-transparent text-[#2d2620] text-sm outline-none py-1.5"
                  />
                </div>
                <button
                  type="button"
                  onClick={salvarEdicao}
                  aria-label="Salvar"
                  className="text-[#2d7a4a] hover:text-[#1f5733] shrink-0"
                >
                  <Check size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  aria-label="Cancelar"
                  className="text-[#8b6f5c] hover:text-[#2d2620] shrink-0"
                >
                  <X size={17} />
                </button>
              </div>
            ) : (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border border-[#e8d8ce] rounded-xl px-4 py-3"
              >
                <span className="text-[#2d2620] text-sm font-medium flex-1 truncate">{item.nome}</span>
                <span className="text-[#2d2620] text-sm font-semibold mx-3">{formatarReais(item.valor)}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => iniciarEdicao(item)}
                    aria-label="Editar"
                    className="text-[#8b6f5c] hover:text-[#2d2620] transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removerItem(item.id)}
                    aria-label="Remover"
                    className="text-[#8b6f5c] hover:text-[#a32d2d] transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ),
          )}
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
