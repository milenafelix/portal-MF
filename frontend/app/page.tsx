import { client } from '../src/sanity'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'

// Configuração para extrair o link da imagem do banco de dados na Home
const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

const QUERY = `*[_type == "post"] | order(publishedAt desc)`

export default async function Home() {
  const posts = await client.fetch(QUERY)

  // Separando os posts para alimentar as diferentes áreas do design
  const destaquePrincipal = posts[0] // O post mais recente vai para o banner grande
  const ultimasNoticias = posts.slice(1, 5) // Os próximos 4 posts vão para a barra lateral
  // Filtra os posts para pegar apenas Resenhas ou Críticas, e depois limita a 4 resultados
  const resenhasECriticas = posts
    .filter((post: any) => post.contentType === 'Resenha' || post.contentType === 'Crítica')
    .slice(0, 4)
  // Filtra para pegar apenas as Notícias para o novo grid
  const gridNoticias = posts
    .filter((post: any) => post.contentType === 'Notícia')
    .slice(0, 4)

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 font-sans bg-black min-h-screen">
      
      {/* SEÇÃO TOP: DESTAQUE + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        {/* Lado Esquerdo: Manchete Principal (Hero) */}
        {destaquePrincipal && (
          <Link 
            href={`/post/${destaquePrincipal.slug.current}`} 
            className="lg:col-span-2 relative h-[400px] md:h-[500px] flex items-end p-8 rounded-lg overflow-hidden group"
          >
            {destaquePrincipal.mainImage && (
              <img 
                src={urlFor(destaquePrincipal.mainImage).url()} 
                alt={destaquePrincipal.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            )}
            {/* Gradiente escuro para o texto ficar legível */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            <div className="relative z-10 w-full md:w-4/5">
              
              {/* TAGS DINÂMICAS DO DESTAQUE PRINCIPAL */}
              <div className="flex flex-wrap gap-2 mb-4">
                {destaquePrincipal.contentType && (
                   <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                     {destaquePrincipal.contentType}
                   </span>
                )}
                {destaquePrincipal.category && (
                   <span className="bg-black/60 backdrop-blur-sm border border-purple-600 text-purple-300 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                     {destaquePrincipal.category}
                   </span>
                )}
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                {destaquePrincipal.title}
              </h2>
              {destaquePrincipal.publishedAt && (
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <span>🕒 {new Date(destaquePrincipal.publishedAt).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span>POR ADMIN</span>
                </p>
              )}
            </div>
          </Link>
        )}

        {/* Lado Direito: Barra Lateral (Últimas Notícias) */}
        <div className="flex flex-col">
          {/* Abas Superiores estilo a sua imagem */}
          <div className="flex border-b border-gray-800 text-sm font-bold text-gray-400 mb-4 bg-gray-950">
            <span className="border-t-2 border-purple-500 bg-gray-900 text-white py-3 flex-1 text-center cursor-pointer">
              NOVIDADES
            </span>
            <span className="py-3 flex-1 text-center hover:text-white cursor-pointer transition-colors">
              POPULAR
            </span>
          </div>

          {/* Lista de Notícias */}
          <div className="flex flex-col gap-4 flex-1 justify-between">
            {ultimasNoticias.map((post: any) => (
              <Link key={post._id} href={`/post/${post.slug.current}`} className="flex gap-4 items-center group bg-gray-950 p-2 rounded hover:bg-gray-900 transition-colors">
                {post.mainImage ? (
                  <img 
                    src={urlFor(post.mainImage).width(200).url()} 
                    alt={post.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Sem Foto</div>
                )}
                
                <div className="flex-1">
                  
                  {/* TAGS DINÂMICAS DA BARRA LATERAL */}
                  <div className="flex gap-2 mb-1">
                    {post.contentType && (
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                        {post.contentType}
                      </span>
                    )}
                    {post.category && (
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                        • {post.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-200 group-hover:text-purple-400 transition-colors text-sm leading-snug line-clamp-3">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


      {/* ========================================= */}
      {/* NOVA SEÇÃO: NOTÍCIAS */}
      {/* ========================================= 
      <div className="border-b-2 border-purple-600 mb-6 flex justify-between items-end">
        <div className="bg-purple-600 text-white px-6 py-2 uppercase font-extrabold tracking-widest skew-x-[-12deg] origin-bottom-left -ml-2">
          <span className="skew-x-[12deg] block ml-2 text-sm">Últimas Notícias</span>
        </div>
        <Link href="/noticias" className="text-purple-400 hover:text-purple-300 text-sm font-bold mb-1 transition-colors">
          Ver tudo →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {gridNoticias.map((post: any) => (
          <Link key={post._id} href={`/post/${post.slug.current}`} className="relative h-[250px] flex items-end p-4 rounded overflow-hidden group">
            {post.mainImage && (
              <img 
                src={urlFor(post.mainImage).url()} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="relative z-10 w-full">
              
              <div className="flex flex-wrap gap-2 mb-2">
                {post.contentType && (
                   <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                     {post.contentType}
                   </span>
                )}
                {post.category && (
                   <span className="bg-black/80 border border-purple-600 text-purple-300 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                     {post.category}
                   </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
                {post.title}
              </h3>
              {post.publishedAt && (
                <p className="text-gray-400 text-[11px] mt-2 flex items-center gap-1">
                  🕒 {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>*/}
      {/* ========================================= */}

      {/* TÍTULO DA SEÇÃO INCLINADO COM BOTÃO VER TUDO */}
      <div className="border-b-2 border-purple-600 mb-6 flex justify-between items-end">
        <div className="bg-purple-600 text-white px-6 py-2 uppercase font-extrabold tracking-widest skew-x-[-12deg] origin-bottom-left -ml-2">
          <span className="skew-x-[12deg] block ml-2 text-sm">Resenhas e Críticas</span>
        </div>
        <Link href="/resenhas-e-criticas" className="text-purple-400 hover:text-purple-300 text-sm font-bold mb-1 transition-colors">
          Ver tudo →
        </Link>
      </div>

      {/* GRID INFERIOR DE NOTÍCIAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resenhasECriticas.map((post: any) => (
          <Link key={post._id} href={`/post/${post.slug.current}`} className="relative h-[250px] flex items-end p-4 rounded overflow-hidden group">
            {post.mainImage && (
              <img 
                src={urlFor(post.mainImage).url()} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="relative z-10 w-full">
              
              {/* TAGS DINÂMICAS DO GRID INFERIOR */}
              <div className="flex flex-wrap gap-2 mb-2">
                {post.contentType && (
                   <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                     {post.contentType}
                   </span>
                )}
                {post.category && (
                   <span className="bg-black/80 border border-purple-600 text-purple-300 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                     {post.category}
                   </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
                {post.title}
              </h3>
              {post.publishedAt && (
                <p className="text-gray-400 text-[11px] mt-2 flex items-center gap-1">
                  🕒 {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

    </main>
  )
}