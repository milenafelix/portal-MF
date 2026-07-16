import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Notícia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Matéria',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true, 
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
    }),

    defineField({
      name: 'contentType',
      title: 'Tipo de Conteúdo',
      type: 'string',
      options: {
        list: [
          { title: 'Notícia', value: 'Notícia' },
          { title: 'Crítica', value: 'Crítica' },
          { title: 'Resenha', value: 'Resenha' },
          { title: 'Review', value: 'Review' },
        ],
        layout: 'radio' // Mostra como bolinhas de marcar no painel para ser mais rápido
      }
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Literatura', value: 'Literatura' },
          { title: 'Séries', value: 'Séries' },
          { title: 'Filmes', value: 'Filmes' },
          { title: 'Games', value: 'Games' },
          { title: 'Eventos', value: 'Eventos' },
        ],
        layout: 'radio'
      }
    }),

    defineField({
      name: 'body',
      title: 'Texto da Notícia',
      type: 'array',
      of: [
        { 
          type: 'block',
          // AQUI DEFINIMOS OS ESTILOS DE TEXTO DISPONÍVEIS
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título 1', value: 'h1' },
            { title: 'Título 2', value: 'h2' },
            { title: 'Título 3', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
            { title: 'Centralizado', value: 'center' } // <- NOSSO NOVO ESTILO
          ]
        },
        { type: 'image', options: { hotspot: true } }
      ],
    }),
  ],
})