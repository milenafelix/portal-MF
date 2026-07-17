import { client } from '../../src/sanity' 
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const resolvedParams = await searchParams
  const query = resolvedParams.q || ''

  // 1. Normaliza a busca do usuário (tira acentos e coloca em minúsculo)
  const normalizedQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  // 2. Trazemos todos os posts do Sanity, extraindo o texto puro do body (pt::text)
  const QUERY = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    contentType,
    publishedAt,
    "plainText": pt::text(body)
  }`
  
  const allPosts = await client.fetch(QUERY)

  // 3. O PULO DO GATO: Filtramos via JavaScript no servidor do Next.js
  const posts = allPosts.filter((post: any) => {
    // Normaliza o título e o texto da matéria vinda do banco
    const titleNormalized = (post.title || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const bodyNormalized = (post.plainText || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    
    // Verifica se a palavra digitada está no título ou no texto
    return titleNormalized.includes(normalizedQuery) || bodyNormalized.includes(normalizedQuery)
  })

  return (
    <main className="min-h-screen bg-black font-sans pt-12 pb-24 px-4 max-w-7xl mx-auto">
      
      <div className="border-b-2 border-purple-600 mb-10 pb-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
          Resultados da busca
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Você procurou por: <span className="text-purple-400 font-bold">"{query}"</span>
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-gray-950 border border-gray-800 p-10 rounded-lg text-center">
          <p className="text-gray-400 text-xl">Nenhuma matéria encontrada com esse termo.</p>
          <Link href="/" className="inline-block mt-6 bg-purple-600 text-white font-bold px-6 py-3 rounded hover:bg-purple-500 transition-colors">
            Voltar para a Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post: any) => (
            <Link key={post._id} href={`/post/${post.slug.current}`} className="group flex flex-col h-full bg-gray-950 rounded overflow-hidden border border-gray-900 hover:border-purple-600 transition-colors">
              <div className="relative h-48 w-full overflow-hidden">
                {post.mainImage ? (
                  <img 
                    src={urlFor(post.mainImage).url()} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-600">Sem Imagem</div>
                )}
                {post.contentType && (
                  <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider z-10">
                    {post.contentType}
                  </span>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h3 className="text-lg font-bold text-white leading-tight line-clamp-3 group-hover:text-purple-400 transition-colors mb-4">
                  {post.title}
                </h3>
                {post.publishedAt && (
                  <p className="text-gray-500 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}