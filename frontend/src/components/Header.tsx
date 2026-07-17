"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const router = useRouter()

  // Atualiza o relógio digital do topo
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour12: false }))
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  // Função que dispara quando você aperta "Enter" ou "Ir"
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const menuItems = [
    { label: 'FILME', href: '/categoria/filme' },
    { label: 'SÉRIES', href: '/categoria/series' },
    { label: 'LITERATURA', href: '/categoria/literatura' },
    { label: 'GAMES', href: '/categoria/games' },
    { label: 'TECNOLOGIA', href: '/categoria/tecnologia' },
    { label: 'EVENTOS', href: '/categoria/eventos' },
  ]

  return (
    <header className="w-full bg-black font-sans">
      
      {/* BARRA SUPERIOR (Data, Hora e Redes) - CORRIGIDA */}
      <div className="border-b border-gray-900">
        {/* O max-w-7xl aqui garante que fique perfeitamente alinhado com o logo abaixo */}
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs font-bold py-2">
            <span className="text-gray-300 capitalize">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')}
            </span>
            <span className="bg-[#9333ea] text-white px-2 py-1 rounded-sm tracking-widest">
              {currentTime || '00:00:00'}
            </span>
          </div>
          <div>
            <a href="#" className="bg-pink-600 text-white text-xs font-bold px-3 py-2 uppercase inline-block hover:bg-pink-500 transition-colors">
              IG
            </a>
          </div>
        </div>
      </div>

      {/* BARRA PRINCIPAL (Logo, Menu e Busca) */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white">
          PORTAL<span className="text-purple-500">MF</span>
        </Link>

        {/* Menu de Navegação */}
        <nav className="hidden md:flex gap-6 items-center">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-white font-extrabold text-sm uppercase tracking-widest hover:text-purple-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sistema de Busca */}
        <div className="relative flex items-center">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center animate-fade-in">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar no portal..."
                autoFocus
                className="bg-gray-900 text-white border border-purple-600 rounded-l px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-500 w-48 md:w-64"
              />
              <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-r transition-colors">
                Ir
              </button>
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="ml-3 text-gray-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-purple-400 transition-colors p-2"
              aria-label="Abrir busca"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          )}
        </div>

      </div>
    </header>
  )
}