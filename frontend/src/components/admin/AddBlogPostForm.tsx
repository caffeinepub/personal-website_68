import { useState } from 'react';
import { useCreateBlogPost } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, X } from 'lucide-react';

export default function AddBlogPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useCreateBlogPost();

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, content, tags }, {
      onSuccess: () => {
        setTitle(''); setContent(''); setTags([]); setTagInput('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="blog-title">Title</Label>
        <Input id="blog-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="blog-content">Content</Label>
        <Textarea id="blog-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." rows={6} required />
      </div>
      <div className="space-y-1.5">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
          />
          <Button type="button" variant="outline" onClick={addTag} size="icon"><Plus size={16} /></Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}><X size={12} /></button>
              </span>
            ))}
          </div>
        )}
      </div>
      {success && <p className="text-sm text-primary font-medium">✓ Blog post published!</p>}
      <Button type="submit" disabled={isPending || !title || !content} className="w-full">
        {isPending ? <><Loader2 size={16} className="animate-spin mr-2" />Publishing…</> : 'Publish Post'}
      </Button>
    </form>
  );
}
