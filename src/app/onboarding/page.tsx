'use client'

import { useState, useCallback } from 'react'
import { OnboardingData, OnboardingStep } from '@/types'
import { Bloco1Identidade } from '@/components/onboarding/Bloco1Identidade'
import { BlocoFontesReceita } from '@/components/onboarding/BlocoFontesReceita'
import { Bloco2Tempo } from '@/components/onboarding/Bloco2Tempo'
import { Bloco4DespesasFixas } from '@/components/onboarding/Bloco4DespesasFixas'
import { Bloco5DespesasVariaveis } from '@/components/onboarding/Bloco5DespesasVariaveis'
import { ResultadoFinal } from '@/components/onboarding/ResultadoFinal'

const DADOS_INICIAIS: OnboardingData = {
  nome: '',
  apelido: '',
  fontes: [],
  tab_sono: 8,
  tab_rotina: 2,
  despesas_fixas: [],
  despesas_variaveis: [],
  desperdicio: [],
  investimento_mensal: 0,
  renda_passiva: 0,
}

export default function OnboardingPage() {
  const [etapa, setEtapa] = useState<OnboardingStep | 'resultado'>(1)
  const [dados, setDados] = useState<OnboardingData>(DADOS_INICIAIS)

  const atualizarDados = useCallback((parcial: Partial<OnboardingData>) => {
    setDados(prev => ({ ...prev, ...parcial }))
  }, [])

  const avancar = useCallback(() => {
    if (etapa === 5) setEtapa('resultado')
    else if (typeof etapa === 'number') setEtapa((etapa + 1) as OnboardingStep)
  }, [etapa])

  const voltar = useCallback(() => {
    if (etapa === 'resultado') setEtapa(5)
    else if (typeof etapa === 'number' && etapa > 1) setEtapa((etapa - 1) as OnboardingStep)
  }, [etapa])

  const etapaNumero = etapa === 'resultado' ? 6 : etapa
  const progresso = (etapaNumero / 6) * 100

  return (
    <div className="min-h-screen bg-[#fdeee4] flex flex-col">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between max-w-lg mx-auto w-full">
        <span className="font-serif text-[#2d2620] text-xl tracking-wide">semear</span>
        {etapa !== 'resultado' && (
          <span className="text-[#8b6f5c] text-sm font-medium">
            {etapa} de 5
          </span>
        )}
      </header>

      {/* Barra de progresso */}
      {etapa !== 'resultado' && (
        <div className="px-6 max-w-lg mx-auto w-full">
          <div className="h-1 bg-[#f5d9c8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d4807a] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <main className="flex-1 px-6 pt-8 pb-10 max-w-lg mx-auto w-full">
        {etapa === 1 && (
          <Bloco1Identidade
            dados={dados}
            onChange={atualizarDados}
            onAvancar={avancar}
          />
        )}
        {etapa === 2 && (
          <BlocoFontesReceita
            dados={dados}
            onChange={atualizarDados}
            onAvancar={avancar}
            onVoltar={voltar}
          />
        )}
        {etapa === 3 && (
          <Bloco2Tempo
            dados={dados}
            onChange={atualizarDados}
            onAvancar={avancar}
            onVoltar={voltar}
          />
        )}
        {etapa === 4 && (
          <Bloco4DespesasFixas
            dados={dados}
            onChange={atualizarDados}
            onAvancar={avancar}
            onVoltar={voltar}
          />
        )}
        {etapa === 5 && (
          <Bloco5DespesasVariaveis
            dados={dados}
            onChange={atualizarDados}
            onAvancar={avancar}
            onVoltar={voltar}
          />
        )}
        {etapa === 'resultado' && (
          <ResultadoFinal
            dados={dados}
            onVoltar={voltar}
          />
        )}
      </main>
    </div>
  )
}
