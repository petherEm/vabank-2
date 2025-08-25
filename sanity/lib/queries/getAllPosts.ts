import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllPosts = async () => {
  const ALL_POSTS_QUERY = defineQuery(
    `*[_type == "post"] {
      _id,
      title,
      slug,
      "author": author->{
        name,
        _id
      },
      mainImage{
        asset,
        alt
      },
      "categories": categories[]->title,
      publishedAt,
      isFeatured,
      readingTime,
      body
    } | order(publishedAt desc)`
  );
  
  try {
    const posts = await sanityFetch({
      query: ALL_POSTS_QUERY,
    });
    return posts.data || [];
  } catch (error) {
    console.error("Error fetching all posts", error);
    return [];
  }
};