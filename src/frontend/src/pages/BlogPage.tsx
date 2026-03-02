import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllBlogPosts } from "@/hooks/useQueries";
import { formatDate } from "@/utils/helpers";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useEffect } from "react";

export default function BlogPage() {
  const { data: posts, isLoading } = useAllBlogPosts();

  useEffect(() => {
    document.title = "Blog | JSR Green Motors";
  }, []);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-16 section-gradient">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Badge className="mb-3 bg-brand-green/20 text-brand-green border-brand-green/30 text-xs uppercase tracking-widest">
            EV Knowledge Hub
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Blog & News
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto">
            Stay informed about the latest EV technology, government policies,
            incentives, and insights from the electric vehicle world.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((skId) => (
                <div
                  key={skId}
                  className="rounded-2xl overflow-hidden border border-border"
                >
                  <Skeleton className="h-40 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id.toString()}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-brand-green/40 hover:shadow-card-hover transition-all duration-300 group flex flex-col"
                >
                  {/* Category banner */}
                  <div className="h-3 bg-brand-green" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <h2 className="font-semibold text-foreground text-lg mb-3 group-hover:text-brand-green transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.published_date)}
                        </span>
                      </div>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="flex items-center gap-1 text-brand-green hover:text-brand-green/80 font-medium transition-colors"
                      >
                        Read More <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Posts Yet
              </h3>
              <p className="text-muted-foreground">
                Check back soon for EV news, tips, and guides.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
