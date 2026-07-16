import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t-4 border-purple-600 pt-16 pb-8 font-sans text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* 1. Logo e Sobre */}
        <div>
          <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white block mb-4">
            PORTAL<span className="text-purple-500">MF</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            O seu portal para um destino com as últimas notícias, críticas e resenhas. Acompanhe os maiores lançamentos do cinema, literatura, séries e o mundo dos games.
          </p>
        </div>

        {/* 2. Links Rápidos */}
        <div>
          <h3 className="text-white font-extrabold uppercase tracking-widest mb-6 border-b border-gray-800 pb-2 text-sm">
            Navegue
          </h3>
          <ul className="space-y-3 text-sm font-semibold">
            <li>
              <Link href="/noticias" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                <span className="text-purple-600">▪</span> Últimas Notícias
              </Link>
            </li>
            <li>
              <Link href="/resenhas-e-criticas" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                <span className="text-purple-600">▪</span> Resenhas e Críticas
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                <span className="text-purple-600">▪</span> Eventos e Coberturas
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Redes Sociais e Contato */}
        <div>
          <h3 className="text-white font-extrabold uppercase tracking-widest mb-6 border-b border-gray-800 pb-2 text-sm">
            Siga o Portal
          </h3>
          <div className="flex gap-3 mb-6">
            <a href="#" className="w-10 h-10 rounded bg-gray-900 flex items-center justify-center hover:bg-pink-600 transition-colors text-white font-bold">
              ig
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Contato: <a href="mailto:milenafelix.omdq@gmail.com" className="hover:text-purple-400 transition-colors">milenafelix.omdq@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Direitos Autorais e Assinatura */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-900 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Portal<span className="text-purple-500">MF</span>. Todos os direitos reservados.</p>
        <p className="mt-2 md:mt-0 font-medium">
          Desenvolvido por Milena Félix com <span className="text-purple-500">💜</span> e Next.js
        </p>
      </div>
    </footer>
  )
}