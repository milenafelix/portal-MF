import Image from 'next/image';
import Link from 'next/link';
import { getPosts, urlFor } from '../../src/lib/posts';
import type { PostSummary } from '../../src/types/post';

const QUERY = `*[_type == "post" && (contentType == "Resenha" || contentType == "Crítica")] | order(publishedAt desc)`;

export default async function ResenhasECriticas() {
  const posts = await getPosts(QUERY);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 font-sans bg-black min-h-screen">
      
      {/* CABEÇALHO DA PÁGINA */}
      <div className="border-b-2 border-purple-600 mb-10 pb-4">
        <h1 className="text-4xl font-extrabold text-white">Resenhas e Críticas</h1>
      </div>

      {/* GRID DE NOTÍCIAS COMPLETO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post: PostSummary) => (
          <Link key={post._id} href={`/post/${encodeURIComponent(post.slug?.current ?? post._id)}`} className="relative h-[280px] flex items-end p-4 rounded-lg overflow-hidden group shadow-lg">
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            
            <div className="relative z-10 w-full">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                  {post.contentType || 'ANÁLISE'}
                </span>
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