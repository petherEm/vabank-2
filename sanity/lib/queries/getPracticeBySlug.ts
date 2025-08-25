import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getPracticeBySlug = async (slug: string) => {
  const PRACTICE_BY_SLUG_QUERY = defineQuery(
    `*[_type == "practice" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      shortDescription,
      longDescription,
      url,
      tags,
      techTags,
      mainImage,
      secondaryImage,
      lastUpdated,
      progress,
      repositoryUrl,
      "category": category {
        _ref,
        _key,
        "title": @->title
      }
    }`
  );
  
  try {
    const practice = await sanityFetch({
      query: PRACTICE_BY_SLUG_QUERY,
      params: { slug }
    });
    return practice.data || null;
  } catch (error) {
    console.error("Error fetching practice by slug", error);
    return null;
  }
};