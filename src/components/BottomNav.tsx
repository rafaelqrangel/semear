'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Receipt, Wallet } from 'lucide-react'

const ITENS = [
  { href: '/mapa', label: 'Roda', Icon: Compass },
  { href: '/registro', label: 'Registro', Icon: Receipt },
  { href: '/economia', label: 'Economia', Icon: Wallet },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#fffaf6] border-t border-[#e8d8ce]">
      <div className="max-w-lg mx-auto flex">
        {ITENS.map(({ href, label, Icon }) => {
          const ativo = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-1 py-2.5"
              style={{ color: ativo ? '#d4807a' : '#8b6f5c' }}
            >
              <Icon size={20} strokeWidth={ativo ? 2.4 : 1.8} />
              <span
                className="text-[11px]"
                style={{ fontWeight: ativo ? 700 : 500 }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
