import { Image } from 'lucide-react';
import { useGetAllMemories } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import MemoryCard from '@/components/MemoryCard';
import { useAdmin } from '@/contexts/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';

export default function MemoriesPage() {
  const { data: memories = [], isLoading } = useGetAllMemories();
  const { isAdmin } = useAdmin();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Memories</h1>
        <p className="text-muted-foreground">A gallery of cherished moments.</p>
      </div>

      {isAdmin && <AdminPanel />}

      {isLoading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-full rounded-xl" style={{ height: `${180 + (i % 3) * 60}px` }} />
          ))}
        </div>
      ) : memories.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Image size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-serif text-xl mb-2">No memories yet</p>
          <p className="text-sm">{isAdmin ? 'Use the admin panel above to add your first memory.' : 'Check back soon!'}</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {memories.map((memory) => (
            <div key={memory.id.toString()} className="break-inside-avoid">
              <MemoryCard memory={memory} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
