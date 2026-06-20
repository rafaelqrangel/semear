import { redirect } from 'next/navigation'

// O mapa da vida é a porta de entrada do Semear.
// Quando tivermos auth, aqui vai verificar se o usuário já fez o
// diagnóstico e mandá-lo para /mapa ou /onboarding.
export default function Home() {
  redirect('/mapa')
}
