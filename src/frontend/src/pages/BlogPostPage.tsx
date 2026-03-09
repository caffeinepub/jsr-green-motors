import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPostBySlug } from "@/hooks/useQueries";
import { formatDate } from "@/utils/helpers";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { useEffect } from "react";

export default function BlogPostPage() {
  const { slug } = useParams({ strict: false });
  const {
    data: post,
    isLoading,
    isError,
  } = useBlogPostBySlug((slug as string | undefined) ?? "");

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | JSR Electric Vehicles Blog`;
    }
  }, [post]);

  if (isLoading) {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
          <Skeleton className="h-6 w-24 mb-6" />
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <div className="space-y-4">
            {Array.from({ length: 8 }, (_, i) => `sk-${i}`).map((skId) => (
              <Skeleton key={skId} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Post Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            This article may have been removed or the URL is invalid.
          </p>
          <Link to="/blog">
            <Button className="bg-brand-green hover:bg-brand-green/90 text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-12 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-green transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <Badge className="mb-4 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/55 text-sm">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {formatDate(post.published_date)}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          {/* Excerpt */}
          <div className="bg-card border-l-4 border-brand-green rounded-r-xl p-5 mb-8">
            <p className="text-muted-foreground italic leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-foreground">
            {post.content.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-foreground/80 leading-relaxed mb-5"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back CTA */}
          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
            <Link to="/blog">
              <Button
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> All Articles
              </Button>
            </Link>
            <Link to="/vehicles">
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white">
                Explore Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
