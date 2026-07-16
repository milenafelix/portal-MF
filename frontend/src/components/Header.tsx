"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [dataAtual, setDataAtual] = useState(new Date())
  const [mounted, setMounted] = useState(false) // <- Cria o estado para saber se já carregou no navegador

  // Atualiza o relógio a cada segundo e avisa que o componente montou
  useEffect(() => {
    setMounted(true) // <- Avisa: "Ok, já estamos no navegador!"
    const timer = setInterval(() => setDataAtual(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Formata a data (Ex: Qui, 16 Jul 2026) e a hora
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '')
  const horaFormatada = dataAtual.toLocaleTimeString('pt-BR')

  return (
    <header className="w-full font-sans">
      
      {/* 1. BARRA SUPERIOR: Data, Hora e Redes Sociais */}
      <div className="bg-black text-gray-300 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-10">
          
          {/* Lado Esquerdo: Data e Relógio roxo */}
          <div className="flex items-center gap-3">
            {/* O SEGREDO ESTÁ AQUI: Só mostra o relógio se o site já montou no navegador */}
            {mounted ? (
              <>
                <span className="capitalize">{dataFormatada}</span>
                <span className="bg-purple-600 text-white font-bold px-2 py-1 rounded-sm">
                  {horaFormatada}
                </span>
              </>
            ) : (
              // Um espaço vazio invisível para não quebrar o layout enquanto o relógio não aparece
              <div className="w-32 h-6"></div> 
            )}
          </div>

          {/* Lado Direito: Redes Sociais */}
          <div className="flex h-full">
            {/* <a href="#" className="w-10 h-full flex items-center justify-center bg-blue-600 text-white hover:opacity-80 transition-opacity">
               <span className="font-bold">f</span>
            </a> 
            <a href="#" className="w-10 h-full flex items-center justify-center bg-sky-500 text-white hover:opacity-80 transition-opacity">
               <span className="font-bold">tw</span>
            </a> */}
            <a href="#" className="w-10 h-full flex items-center justify-center bg-pink-600 text-white hover:opacity-80 transition-opacity">
               <span className="font-bold">IG</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. BARRA PRINCIPAL: Logo e Navegação */}
      <div className="bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex h-16 items-center">
          
          {/* Botão Home roxo */}
          <Link href="/" className="h-full w-16 bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>

          {/* O Logo do Site */}
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white ml-6 mr-10">
            PORTAL<span className="text-purple-500">MF</span>
          </Link>
          
          {/* Menu de Categorias */}
          <nav className="hidden md:flex space-x-6 text-sm font-extrabold text-gray-200 tracking-wider">
            <Link href="/resenhas-e-criticas" className="hover:text-purple-400 transition-colors py-5">
              ANÁLISES ▾
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors py-5">
              FILMES
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors py-5">
              SÉRIES
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors py-5">
              GAMES
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors py-5">
              EVENTOS
            </Link>
          </nav>

          {/* Ícone de Busca */}
          <div className="ml-auto mr-4 flex items-center cursor-pointer text-gray-300 hover:text-purple-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

        </div>
      </div>
    </header>
  )
}