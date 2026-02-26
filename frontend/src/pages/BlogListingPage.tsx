import { BookOpen } from 'lucide-react';
import { useGetAllBlogPosts } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import BlogPostCard from '@/components/BlogPostCard';
import { useAdmin } from '@/contexts/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';

export default function BlogListingPage() {
  const { data: posts = [], isLoading } = useGetAllBlogPosts();
  const { isAdmin } = useAdmin();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Blog</h1>
        <p className="text-muted-foreground">Thoughts, stories, and reflections.</p>
      </div>

      {isAdmin && <AdminPanel />}

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-serif text-xl mb-2">No posts yet</p>
          <p className="text-sm">{isAdmin ? 'Use the admin panel above to write your first post.' : 'Check back soon!'}</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => <BlogPostCard key={post.id.toString()} post={post} />)}
        </div>
      )}
    </main>
  );
}
