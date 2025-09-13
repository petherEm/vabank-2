import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllWorks = async () => {
  const ALL_WORKS_QUERY = defineQuery(
    `*[_type == "work"] {
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
      order,
      "category": category {
        _ref,
        _key,
        "title": @->title
      }
    } | order(order asc, _createdAt desc)`
  );
  
  try {
    const works = await sanityFetch({
      query: ALL_WORKS_QUERY,
    });
    return works.data || [];
  } catch (error) {
    console.error("Error fetching all works", error);
    return [];
  }
};