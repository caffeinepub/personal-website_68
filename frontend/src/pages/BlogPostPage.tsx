import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useGetBlogPost } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

function formatDate(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage() {
  const { id } = useParams({ from: '/blogs/$id' });
  const { data: post, isLoading, isError } = useGetBlogPost(BigInt(id));

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={15} /> Back to Blog
      </Link>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-5 w-1/3 rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : isError || !post ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="font-serif text-xl">Post not found.</p>
        </div>
      ) : (
        <article>
          <header className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>{formatDate(post.publicationDate)}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </header>
          <div className="prose prose-stone max-w-none">
            {post.content.split('\n').map((para, i) =>
              para.trim() ? <p key={i} className="text-foreground/85 leading-relaxed mb-4">{para}</p> : <br key={i} />
            )}
          </div>
        </article>
      )}
    </main>
  );
}
