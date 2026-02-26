import { useNavigate } from '@tanstack/react-router';
import type { Article } from '../backend';
import { Calendar, ArrowRight } from 'lucide-react';

interface Props {
  article: Article;
}

function formatDate(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ArticleCard({ article }: Props) {
  const navigate = useNavigate();

  return (
    <article
      className="bg-card rounded-xl border border-border overflow-hidden shadow-xs card-hover cursor-pointer group"
      onClick={() => navigate({ to: '/articles/$id', params: { id: article.id.toString() } })}
    >
      {article.coverImageUrl && (
        <div className="h-44 overflow-hidden">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Calendar size={12} />
          <span>{formatDate(article.publicationDate)}</span>
        </div>
        <h3 className="font-serif font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
          {article.content.slice(0, 200)}{article.content.length > 200 ? '…' : ''}
        </p>
        <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
          Read more <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
