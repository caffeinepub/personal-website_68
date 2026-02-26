import type { StudyMaterial } from '../backend';
import { BookOpen } from 'lucide-react';

interface Props {
  material: StudyMaterial;
  onClick: () => void;
}

const subjectColors: Record<string, string> = {
  Math: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Science: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  English: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  History: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Geography: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  Art: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Music: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
};

function getSubjectColor(subject: string): string {
  return subjectColors[subject] || 'bg-secondary text-secondary-foreground';
}

export default function StudyMaterialCard({ material, onClick }: Props) {
  return (
    <div
      className="bg-card rounded-2xl border-2 border-border p-5 shadow-xs card-hover cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getSubjectColor(material.subject)}`}>
          {material.subject}
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <BookOpen size={14} className="text-primary" />
        </div>
      </div>
      <h3 className="font-serif font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {material.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{material.description}</p>
    </div>
  );
}
