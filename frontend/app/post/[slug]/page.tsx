import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { getPostBySlug, urlFor } from '../../../src/lib/posts';
import type { Post, SanityImage } from '../../../src/types/post';

const ptComponents = {
  types: {
    image: ({ value }: { value?: SanityImage & { alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Imagem da matéria'}
          width={1200}
          height={800}
          className="my-8 h-auto w-full rounded-xl object-cover"
        />
      );
    },
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = await getPostBySlug(slug) as Post | null;

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
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-60"
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
                    {/* Aqui aplicamos a regra ptComponents para as imagens funcionarem */}
                    {post.body ? (
                        <PortableText value={post.body} components={ptComponents} />
                    ) : (
                        <p>Conteúdo não disponível.</p>
                    )}
                    </div>
                </div>
      
    </main>
  )
}