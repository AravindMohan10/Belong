import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/blog-article";
import { getFeaturedBlogPost } from "@/lib/content/blog-posts";

export const metadata: Metadata = {
  title: "Visit Two Is the Whole Product · The Belonging Notes",
  description:
    "Most people who want to belong never make it past the first visit. That is not a character flaw. It is a design problem.",
};

export default function BelongingNotesPage() {
  const post = getFeaturedBlogPost();

  return <BlogArticle post={post} />;
}
