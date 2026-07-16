import type { PortableTextBlock } from '@portabletext/types';

export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  _type?: string;
  _ref?: string;
  asset?: {
    _ref?: string;
  };
  alt?: string;
}

export interface PostSummary {
  _id: string;
  title: string;
  slug?: SanitySlug | null;
  mainImage?: SanityImage | null;
  publishedAt?: string;
  contentType?: string;
  category?: string;
}

export interface Post extends PostSummary {
  body?: PortableTextBlock[];
}
