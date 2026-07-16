import { client } from '../sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { Post, PostSummary } from '../types/post';

const builder = imageUrlBuilder(client);

export function urlFor(source: PostSummary['mainImage']) {
  return builder.image(source as never);
}

export async function getPosts(query: string): Promise<PostSummary[]> {
  return client.fetch<PostSummary[]>(query);
}

export async function getPostBySlug(identifier: string): Promise<Post | null> {
  const query = `*[_type == "post" && (slug.current == $identifier || _id == $identifier)][0]`;
  return client.fetch<Post | null>(query, { identifier });
}
