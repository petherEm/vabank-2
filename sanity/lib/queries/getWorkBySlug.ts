import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getWorkBySlug = async (slug: string) => {
  const WORK_BY_SLUG_QUERY = defineQuery(
    `*[_type == "work" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      shortDescription,
      longDescription,
      clientName,
      url,
      tags,
      techTags,
      mainImage,
      secondaryImage,
      "category": category {
        _ref,
        _key,
        "title": @->title
      }
    }`
  );
  
  try {
    const work = await sanityFetch({
      query: WORK_BY_SLUG_QUERY,
      params: { slug }
    });
    return work.data || null;
  } catch (error) {
    console.error("Error fetching work by slug", error);
    return null;
  }
};