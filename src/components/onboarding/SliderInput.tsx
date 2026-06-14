'use client'

interface Props {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
  hint?: string
}

export function SliderInput({ label, value, min, max, step, unit, onChange, hint }: Props) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label className="text-[#8b6f5c] text-xs font-semibold uppercase tracking-widest block mb-0.5">
            {label}
          </label>
          {hint && <p className="text-[#8b6f5c] text-xs font-normal normal-case tracking-normal">{hint}</p>}
        </div>
        <span className="text-[#2d2620] text-xl font-light whitespace-nowrap shrink-0">
          {value}<span className="text-sm text-[#8b6f5c] ml-1">{unit}</span>
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 appearance-none rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #d4807a ${pct}%, #e8d8ce ${pct}%)`,
          }}
        />
      </div>
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #d4807a;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(45, 38, 32, 0.2);
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #d4807a;
          border: 3px solid white;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
