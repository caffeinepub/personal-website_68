import { useState } from 'react';
import { useAddStudyMaterial } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const SUBJECTS = ['Math', 'Science', 'English', 'History', 'Geography', 'Art', 'Music', 'Other'];

export default function AddStudyMaterialForm() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useAddStudyMaterial();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, subject, description, content }, {
      onSuccess: () => {
        setTitle(''); setSubject(''); setDescription(''); setContent('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="sm-title">Title</Label>
        <Input id="sm-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Material title" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sm-subject">Subject</Label>
        <select
          id="sm-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full h-9 rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select subject…</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sm-desc">Description</Label>
        <Textarea id="sm-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description..." rows={2} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sm-content">Content</Label>
        <Textarea id="sm-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content or notes..." rows={5} required />
      </div>
      {success && <p className="text-sm text-primary font-medium">✓ Study material added!</p>}
      <Button type="submit" disabled={isPending || !title || !subject || !description || !content} className="w-full">
        {isPending ? <><Loader2 size={16} className="animate-spin mr-2" />Saving…</> : 'Add Material'}
      </Button>
    </form>
  );
}
