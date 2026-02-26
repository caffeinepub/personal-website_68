import { GraduationCap, Wrench, User } from 'lucide-react';
import { useGetResume } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import WorkExperienceTimeline from '@/components/WorkExperienceTimeline';
import { useAdmin } from '@/contexts/AdminContext';
import AdminPanel from '@/components/admin/AdminPanel';
import { Badge } from '@/components/ui/badge';

export default function ResumePage() {
  const { data: resume, isLoading } = useGetResume();
  const { isAdmin } = useAdmin();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Resume</h1>
        <p className="text-muted-foreground">My professional background and expertise.</p>
      </div>

      {isAdmin && <AdminPanel />}

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      ) : !resume ? (
        <div className="text-center py-20 text-muted-foreground">
          <User size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-serif text-xl mb-2">No resume yet</p>
          <p className="text-sm">{isAdmin ? 'Use the admin panel above to add your resume.' : 'Check back soon!'}</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Summary */}
          {resume.summary && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <User size={18} className="text-primary" />
                <h2 className="font-serif text-xl font-semibold text-foreground">About Me</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 shadow-xs">
                <p className="text-muted-foreground leading-relaxed">{resume.summary}</p>
              </div>
            </section>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={18} className="text-primary" />
                <h2 className="font-serif text-xl font-semibold text-foreground">Skills</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 shadow-xs">
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Work Experience */}
          {resume.workExperience.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 border-primary" />
                </div>
                <h2 className="font-serif text-xl font-semibold text-foreground">Work Experience</h2>
              </div>
              <WorkExperienceTimeline experiences={resume.workExperience} />
            </section>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={18} className="text-primary" />
                <h2 className="font-serif text-xl font-semibold text-foreground">Education</h2>
              </div>
              <div className="space-y-4">
                {resume.education.map((edu, idx) => (
                  <div key={idx} className="bg-card rounded-xl border border-border p-5 shadow-xs">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-primary text-sm font-medium">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                        {edu.graduationYear}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
