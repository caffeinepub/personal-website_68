import { useState, useEffect } from 'react';
import { useGetResume, useUpdateResume } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import type { WorkExperience, Education } from '../../backend';

export default function EditResumeForm() {
  const { data: resume } = useGetResume();
  const { mutate, isPending } = useUpdateResume();
  const [success, setSuccess] = useState(false);

  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    if (resume) {
      setSummary(resume.summary);
      setSkills(resume.skills.join(', '));
      setWorkExperience(resume.workExperience);
      setEducation(resume.education);
    }
  }, [resume]);

  const addWork = () => setWorkExperience([...workExperience, { position: '', company: '', startDate: '', endDate: '', description: '' }]);
  const removeWork = (i: number) => setWorkExperience(workExperience.filter((_, idx) => idx !== i));
  const updateWork = (i: number, field: keyof WorkExperience, value: string) => {
    const updated = [...workExperience];
    updated[i] = { ...updated[i], [field]: value };
    setWorkExperience(updated);
  };

  const addEdu = () => setEducation([...education, { degree: '', institution: '', graduationYear: '' }]);
  const removeEdu = (i: number) => setEducation(education.filter((_, idx) => idx !== i));
  const updateEdu = (i: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[i] = { ...updated[i], [field]: value };
    setEducation(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      summary,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      workExperience,
      education,
    }, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="res-summary">Professional Summary</Label>
        <Textarea id="res-summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Your professional summary..." rows={4} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="res-skills">Skills (comma-separated)</Label>
        <Input id="res-skills" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, TypeScript, Node.js..." />
      </div>

      {/* Work Experience */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Work Experience</Label>
          <Button type="button" variant="outline" size="sm" onClick={addWork}><Plus size={14} className="mr-1" />Add</Button>
        </div>
        {workExperience.map((exp, i) => (
          <div key={i} className="border border-border rounded-lg p-4 space-y-3 bg-secondary/30">
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeWork(i)} className="text-destructive h-7 w-7"><Trash2 size={14} /></Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label className="text-xs">Position</Label><Input value={exp.position} onChange={(e) => updateWork(i, 'position', e.target.value)} placeholder="Job title" /></div>
              <div className="space-y-1"><Label className="text-xs">Company</Label><Input value={exp.company} onChange={(e) => updateWork(i, 'company', e.target.value)} placeholder="Company name" /></div>
              <div className="space-y-1"><Label className="text-xs">Start Date</Label><Input value={exp.startDate} onChange={(e) => updateWork(i, 'startDate', e.target.value)} placeholder="Jan 2020" /></div>
              <div className="space-y-1"><Label className="text-xs">End Date</Label><Input value={exp.endDate} onChange={(e) => updateWork(i, 'endDate', e.target.value)} placeholder="Present" /></div>
            </div>
            <div className="space-y-1"><Label className="text-xs">Description</Label><Textarea value={exp.description} onChange={(e) => updateWork(i, 'description', e.target.value)} placeholder="Role description..." rows={2} /></div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Education</Label>
          <Button type="button" variant="outline" size="sm" onClick={addEdu}><Plus size={14} className="mr-1" />Add</Button>
        </div>
        {education.map((edu, i) => (
          <div key={i} className="border border-border rounded-lg p-4 space-y-3 bg-secondary/30">
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeEdu(i)} className="text-destructive h-7 w-7"><Trash2 size={14} /></Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 col-span-2"><Label className="text-xs">Degree</Label><Input value={edu.degree} onChange={(e) => updateEdu(i, 'degree', e.target.value)} placeholder="B.Sc. Computer Science" /></div>
              <div className="space-y-1"><Label className="text-xs">Institution</Label><Input value={edu.institution} onChange={(e) => updateEdu(i, 'institution', e.target.value)} placeholder="University name" /></div>
              <div className="space-y-1"><Label className="text-xs">Graduation Year</Label><Input value={edu.graduationYear} onChange={(e) => updateEdu(i, 'graduationYear', e.target.value)} placeholder="2018" /></div>
            </div>
          </div>
        ))}
      </div>

      {success && <p className="text-sm text-primary font-medium">✓ Resume updated!</p>}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <><Loader2 size={16} className="animate-spin mr-2" />Saving…</> : 'Save Resume'}
      </Button>
    </form>
  );
}
