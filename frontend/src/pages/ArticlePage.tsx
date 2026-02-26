import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useGetArticle } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

function formatDate(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticlePage() {
  const { id } = useParams({ from: '/articles/$id' });
  const { data: article, isLoading, isError } = useGetArticle(BigInt(id));

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/articles"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={15} /> Back to Articles
      </Link>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-5 w-1/3 rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : isError || !article ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="font-serif text-xl">Article not found.</p>
        </div>
      ) : (
        <article>
          {article.coverImageUrl && (
            <div className="rounded-xl overflow-hidden mb-8 aspect-[16/7]">
              <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}
          <header className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4 leading-tight">{article.title}</h1>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={14} />
              <span>{formatDate(article.publicationDate)}</span>
            </div>
          </header>
          <div className="prose prose-stone max-w-none">
            {article.content.split('\n').map((para, i) =>
              para.trim() ? <p key={i} className="text-foreground/85 leading-relaxed mb-4">{para}</p> : <br key={i} />
            )}
          </div>
        </article>
      )}
    </main>
  );
}
