import { client } from '../../../src/sanity'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

// Construtor de imagens do Sanity
const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

// NOVA REGRA: Ensinando o PortableText a renderizar as imagens do meio da matéria
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <img
          src={urlFor(value).url()}
          alt={value.alt || 'Imagem da matéria'}
          className="w-full h-auto rounded-xl my-8 object-cover"
        />
      )
    }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params
  const slug = resolvedParams.slug

  /// NOVA CONSULTA: Busca o post atual (trazendo o nome do autor) E os 4 últimos posts
  const QUERY = `{
    "post": *[_type == "post" && slug.current == $slug][0]{
      ...,
      "authorName": author->name
    },
    "related": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...4]
  }`
  
  const data = await client.fetch(QUERY, { slug: slug })
  const post = data.post
  const relatedPosts = data.related

  if (!post) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans">
        <h1 className="text-4xl font-bold mb-4">404 - Post não encontrado</h1>
        <Link href="/" className="text-purple-500 hover:underline">Voltar para a Home</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black font-sans pb-20">
      
      {/* CABEÇALHO DO POST (IMAGEM PRINCIPAL E TÍTULO) */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).url()} 
            alt={post.title}
            className="w-full h-full object-cover opacity-60" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full max-w-4xl mx-auto px-6 pb-12 right-0">
          <div className="flex gap-2 mb-4">
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">
              {post.contentType || 'Conteúdo'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-gray-400 text-sm mt-6">
              Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </div>

      {/* CORPO DO TEXTO (RESENHA/NOTÍCIA) */}
      <div className="max-w-4xl mx-auto px-6 mt-12 text-gray-300 text-lg leading-relaxed">
        <div className="prose prose-invert prose-lg prose-purple max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
          ) : (
            <p>Conteúdo não disponível.</p>
          )}
        </div>
      </div>

      {/* ========================================= */}
      {/* SEÇÃO DO AUTOR E MAIS CONTEÚDO */}
      {/* ========================================= */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        
        {/* CAIXA DO AUTOR */}
        <div className="border border-purple-600/30 bg-gray-950 p-6 sm:p-8 rounded-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-16 shadow-lg shadow-purple-900/10">
          <img 
            src="https://github.com/milenafelix.png" 
            alt="Milena Félix" 
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-600"
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Milena Félix</h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Desenvolvi esse site e escrevo essas matérias... E isso nem é o mais interessante sobre mim.
            </p>
            <Link href="/" className="inline-block border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors px-6 py-2 rounded text-sm font-bold">
              Meus posts
            </Link>
          </div>
        </div>

        {/* GRID DE MAIS CONTEÚDO */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-6 uppercase tracking-wider border-l-4 border-purple-600 pl-3">
              Conteúdo Relacionado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((rel: any) => (
                <Link key={rel._id} href={`/post/${rel.slug.current}`} className="group block">
                  <div className="w-full h-32 mb-3 overflow-hidden rounded border border-gray-800">
                    {rel.mainImage ? (
                      <img 
                        src={urlFor(rel.mainImage).url()} 
                        alt={rel.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center text-xs text-gray-600">Sem Foto</div>
                    )}
                  </div>
                  <h3 className="text-gray-300 font-bold text-sm leading-snug group-hover:text-purple-400 transition-colors line-clamp-3">
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
      
    </main>
  )
}