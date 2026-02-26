import { useState } from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import { useGetAllStudyMaterials } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import StudyMaterialCard from '@/components/StudyMaterialCard';
import { useStudyMaterialFilter } from '@/hooks/useStudyMaterialFilter';
import { useAdmin } from '@/contexts/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { StudyMaterial } from '../backend';

export default function StudyMaterialPage() {
  const { data: materials = [], isLoading } = useGetAllStudyMaterials();
  const { filtered, subjects, selectedSubject, setSelectedSubject } = useStudyMaterialFilter(materials);
  const { isAdmin } = useAdmin();
  const [selected, setSelected] = useState<StudyMaterial | null>(null);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Kids' Study Material</h1>
        <p className="text-muted-foreground">Educational resources I've created for my children.</p>
      </div>

      {isAdmin && <AdminPanel />}

      {/* Subject Filter */}
      {subjects.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                selectedSubject === subject
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-44 rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <GraduationCap size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-serif text-xl mb-2">
            {selectedSubject === 'All' ? 'No study materials yet' : `No materials for ${selectedSubject}`}
          </p>
          <p className="text-sm">{isAdmin ? 'Use the admin panel above to add study materials.' : 'Check back soon!'}</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((material) => (
            <StudyMaterialCard
              key={material.id.toString()}
              material={material}
              onClick={() => setSelected(material)}
            />
          ))}
        </div>
      )}

      {/* Material Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    {selected.subject}
                  </span>
                </div>
                <DialogTitle className="font-serif text-2xl">{selected.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 prose prose-stone max-w-none">
                {selected.content.split('\n').map((para, i) =>
                  para.trim() ? <p key={i} className="text-foreground/85 leading-relaxed mb-3">{para}</p> : <br key={i} />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
