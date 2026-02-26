import type { Memory } from '../backend';
import { ImageOff } from 'lucide-react';

interface Props {
  memory: Memory;
}

export default function MemoryCard({ memory }: Props) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-xs card-hover group">
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        {memory.imageUrl ? (
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ImageOff size={32} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif font-semibold text-foreground mb-1 line-clamp-1">{memory.title}</h3>
        {memory.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{memory.description}</p>
        )}
      </div>
    </div>
  );
}
