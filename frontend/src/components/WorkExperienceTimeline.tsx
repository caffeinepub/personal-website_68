import type { WorkExperience } from '../backend';
import { Briefcase } from 'lucide-react';

interface Props {
  experiences: WorkExperience[];
}

export default function WorkExperienceTimeline({ experiences }: Props) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border" />
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-12">
            {/* Dot */}
            <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
              <Briefcase size={14} className="text-primary" />
            </div>
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs card-hover">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-serif font-semibold text-foreground text-lg">{exp.position}</h3>
                  <p className="text-primary font-medium text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full whitespace-nowrap">
                  {exp.startDate} — {exp.endDate || 'Present'}
                </span>
              </div>
              {exp.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{exp.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
