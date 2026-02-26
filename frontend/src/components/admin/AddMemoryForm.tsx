import { useState } from 'react';
import { useAddMemory } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function AddMemoryForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useAddMemory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, description, imageUrl }, {
      onSuccess: () => {
        setTitle(''); setDescription(''); setImageUrl('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="mem-title">Title</Label>
        <Input id="mem-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Memory title" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="mem-desc">Description</Label>
        <Textarea id="mem-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe this memory..." rows={3} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="mem-img">Image URL</Label>
        <Input id="mem-img" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." type="url" />
      </div>
      {success && <p className="text-sm text-primary font-medium">✓ Memory added!</p>}
      <Button type="submit" disabled={isPending || !title} className="w-full">
        {isPending ? <><Loader2 size={16} className="animate-spin mr-2" />Saving…</> : 'Add Memory'}
      </Button>
    </form>
  );
}
