import { useNavigate } from '@tanstack/react-router';
import type { BlogPost } from '../backend';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface Props {
  post: BlogPost;
}

function formatDate(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostCard({ post }: Props) {
  const navigate = useNavigate();

  return (
    <article
      className="bg-card rounded-xl border border-border p-5 shadow-xs card-hover cursor-pointer group"
      onClick={() => navigate({ to: '/blogs/$id', params: { id: post.id.toString() } })}
    >
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
        <Calendar size={12} />
        <span>{formatDate(post.publicationDate)}</span>
      </div>
      <h3 className="font-serif font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
        {post.content.slice(0, 180)}{post.content.length > 180 ? '…' : ''}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
