import { getBlogData } from "@/libs/blogData"
import BlogLayout from "./BlogLayout"

// This would typically fetch data based on the slug
export default function BlogPost({ params }) {
  // For now, using sample data - you can replace this with actual data fetching
  const blogData = getBlogData(params.slug)

  return <BlogLayout blogData={blogData} />
}
