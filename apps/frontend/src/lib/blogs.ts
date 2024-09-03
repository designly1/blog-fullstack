import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Blog, Photo } from "$/payload-types";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export type PhotoCover = Pick<Photo, "url" | "title">;

export type BlogListItem = Pick<
  Blog,
  "id" | "slug" | "title" | "excerpt" | "createdAt"
> & { coverPhoto: PhotoCover };

export type BlogPost = Pick<
  Blog,
  "id" | "title" | "slug" | "excerpt" | "content" | "createdAt"
> & { coverPhoto: PhotoCover };

export async function getBlogs(): Promise<BlogListItem[]> {
  const query = gql`
    query GetBlogs {
      Blogs(where: { status: { equals: published } }) {
        docs {
          id
          slug
          title
          excerpt
          coverPhoto {
            url
            title
          }
          createdAt
        }
      }
    }
  `;

  const { data } = await client.query<{ Blogs: { docs: BlogListItem[] } }>({
    query,
  });

  return data?.Blogs?.docs || [];
}

export async function getBlog(slug: string): Promise<BlogPost | null> {
  const query = gql`
    query GetBlogBySlug($slug: String!) {
      Blogs(where: { slug: { equals: $slug }, status: { equals: published } }) {
        docs {
          id
          title
          slug
          coverPhoto {
            url
            title
          }
          excerpt
          content
          createdAt
        }
      }
    }
  `;

  const { data } = await client.query<{ Blogs: { docs: BlogPost[] } }>({
    query,
    variables: { slug },
  });

  return data?.Blogs?.docs[0] || null;
}

export async function getAllSlugs(): Promise<string[]> {
  const query = gql`
    query GetAllSlugs {
      Blogs(where: { status: { equals: published } }) {
        docs {
          slug
        }
      }
    }
  `;

  const { data } = await client.query<{ Blogs: { docs: { slug: string }[] } }>({
    query,
  });

  return data?.Blogs?.docs.map((doc) => doc.slug) || [];
}
