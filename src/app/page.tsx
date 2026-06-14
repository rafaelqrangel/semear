import { redirect } from 'next/navigation'

// Por enquanto, redireciona direto para o onboarding.
// Quando tivermos auth, aqui vai verificar se o usuário
// já tem conta e redirecionar para /dashboard ou /onboarding.
export default function Home() {
  redirect('/onboarding')
}
