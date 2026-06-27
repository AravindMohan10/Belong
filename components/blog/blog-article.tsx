import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { BlogPost, BlogSection } from "@/lib/content/blog-posts";

function BlogSectionBlock({ section }: { section: BlogSection }) {
  if (section.type === "heading") {
    return (
      <h2 className="font-display mt-12 text-2xl leading-tight text-ink first:mt-0 sm:text-[1.75rem]">
        {section.text}
      </h2>
    );
  }

  if (section.type === "quote") {
    return (
      <blockquote className="my-8 border-l-2 border-rust/50 pl-5 font-display text-xl italic leading-relaxed text-ink-soft">
        {section.text}
      </blockquote>
    );
  }

  if (section.type === "list") {
    return (
      <ul className="my-6 space-y-3">
        {section.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-base leading-relaxed text-ink-soft"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lamp" />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mt-6 text-base leading-[1.75] text-ink-soft first:mt-0">
      {section.text}
    </p>
  );
}

type BlogArticleProps = {
  post: BlogPost;
};

export function BlogArticle({ post }: BlogArticleProps) {
  const published = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="grain border-t border-lamp/8 bg-night-soft text-cream">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <Link
          href="/"
          className="font-hand text-lg text-lamp/80 transition-colors hover:text-lamp"
        >
          ← Back home
        </Link>

        <header className="mt-8">
          <p className="font-hand text-2xl text-lamp">The Belonging Notes</p>
          <h1 className="font-display mt-3 text-4xl leading-[1.08] text-cream sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-cream/70">{post.dek}</p>
          <p className="mt-4 text-sm text-cream/45">
            {published} · {post.readTime}
          </p>
        </header>

        <div className="artifact artifact-journal artifact-journal--flat relative mt-12 px-6 py-8 sm:px-10 sm:py-10">
          {post.sections.map((section, index) => (
            <BlogSectionBlock key={`${section.type}-${index}`} section={section} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-end gap-x-6 gap-y-3 overflow-visible pt-1">
          <Button href="/#clubs">Check out the clubs</Button>
          <Button href="/#how-it-works" variant="secondary">
            How it works
          </Button>
        </div>
      </div>
    </article>
  );
}
