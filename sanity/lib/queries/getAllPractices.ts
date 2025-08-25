import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllPractices = async () => {
  const ALL_PRACTICES_QUERY = defineQuery(
    `*[_type == "practice"] {
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
    } | order(_createdAt desc)`
  );
  
  try {
    const practices = await sanityFetch({
      query: ALL_PRACTICES_QUERY,
    });
    return practices.data || [];
  } catch (error) {
    console.error("Error fetching all practices", error);
    return [];
  }
};