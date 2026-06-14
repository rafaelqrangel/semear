'use client'

interface Props {
  label: string
  value: number
  onChange: (value: number) => void
  placeholder?: string
  hint?: string
  highlight?: boolean
}

export function MoneyInput({ label, value, onChange, placeholder = '0', hint, highlight }: Props) {
  // Formata para exibição enquanto digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const num = raw ? parseInt(raw, 10) : 0
    onChange(num)
  }

  const displayValue = value > 0 ? value.toLocaleString('pt-BR') : ''

  return (
    <div className="space-y-2">
      <label className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest block">
        {label}
      </label>
      {hint && <p className="text-[#8b6f5c] text-xs mt-0">{hint}</p>}
      <div className={`
        flex items-center bg-white border rounded-xl px-4 py-3 gap-2 transition-colors
        ${highlight
          ? 'border-[#d4807a] shadow-sm shadow-[#d4807a]/20'
          : 'border-[#e8d8ce] focus-within:border-[#d4807a]'
        }
      `}>
        <span className="text-[#8b6f5c] font-medium text-base shrink-0">R$</span>
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[#2d2620] text-xl font-light outline-none placeholder:text-[#ccc]"
        />
      </div>
    </div>
  )
}
