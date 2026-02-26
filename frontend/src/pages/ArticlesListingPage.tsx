import { FileText } from 'lucide-react';
import { useGetAllArticles } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '@/components/ArticleCard';
import { useAdmin } from '@/contexts/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';

export default function ArticlesListingPage() {
  const { data: articles = [], isLoading } = useGetAllArticles();
  const { isAdmin } = useAdmin();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Articles</h1>
        <p className="text-muted-foreground">Long-form writing on topics I care about.</p>
      </div>

      {isAdmin && <AdminPanel />}

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <FileText size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-serif text-xl mb-2">No articles yet</p>
          <p className="text-sm">{isAdmin ? 'Use the admin panel above to publish your first article.' : 'Check back soon!'}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => <ArticleCard key={article.id.toString()} article={article} />)}
        </div>
      )}
    </main>
  );
}
