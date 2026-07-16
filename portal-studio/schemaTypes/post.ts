import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de capa',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'contentType',
      title: 'Tipo de conteúdo',
      type: 'string',
      options: {
        list: [
          { title: 'Notícia', value: 'Notícia' },
          { title: 'Crítica', value: 'Crítica' },
          { title: 'Resenha', value: 'Resenha' },
          { title: 'Review', value: 'Review' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
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
        layout: 'radio',
      },
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título 1', value: 'h1' },
            { title: 'Título 2', value: 'h2' },
            { title: 'Título 3', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
            { title: 'Centralizado', value: 'center' },
          ],
        },
        { type: 'image', options: { hotspot: true } },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contentType',
      media: 'mainImage',
    },
  },
});