import { useState } from 'react';
import { useCreateArticle } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function AddArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useCreateArticle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, content, coverImageUrl: coverImageUrl || undefined }, {
      onSuccess: () => {
        setTitle(''); setContent(''); setCoverImageUrl('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="art-title">Title</Label>
        <Input id="art-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="art-cover">Cover Image URL (optional)</Label>
        <Input id="art-cover" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="https://..." type="url" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="art-content">Content</Label>
        <Textarea id="art-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your article..." rows={8} required />
      </div>
      {success && <p className="text-sm text-primary font-medium">✓ Article published!</p>}
      <Button type="submit" disabled={isPending || !title || !content} className="w-full">
        {isPending ? <><Loader2 size={16} className="animate-spin mr-2" />Publishing…</> : 'Publish Article'}
      </Button>
    </form>
  );
}
