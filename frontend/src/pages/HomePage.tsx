import { Link } from '@tanstack/react-router';
import { Briefcase, BookOpen, Image, FileText, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  {
    to: '/resume',
    icon: Briefcase,
    title: 'Resume',
    description: 'My professional journey, skills, and administrative experience.',
    color: 'bg-primary/10 text-primary',
  },
  {
    to: '/blogs',
    icon: BookOpen,
    title: 'Blog',
    description: 'Thoughts, stories, and reflections from life in Ladakh and beyond.',
    color: 'bg-accent/10 text-accent',
  },
  {
    to: '/memories',
    icon: Image,
    title: 'Memories',
    description: 'A gallery of cherished moments from the valleys of Ladakh.',
    color: 'bg-chart-4/20 text-chart-4',
  },
  {
    to: '/articles',
    icon: FileText,
    title: 'Articles',
    description: 'Long-form writing on governance, policy, and public service.',
    color: 'bg-chart-2/20 text-chart-2',
  },
  {
    to: '/study-material',
    icon: GraduationCap,
    title: "Kids' Study",
    description: 'Educational materials I create for my children.',
    color: 'bg-chart-5/20 text-chart-5',
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1440x600.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4 py-20 max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/80 mb-4">
            IAS Officer · Ladakh
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Bhupesh Chaudhary
          </h1>
          <p className="text-lg text-primary-foreground/85 leading-relaxed mb-8 max-w-xl mx-auto">
            Serving the people of Ladakh with dedication and integrity. Here I share my professional journey, personal stories, cherished memories from the Himalayas, and learning materials for my kids.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/blogs">Read My Blog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
              <Link to="/resume">View Resume</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sections Overview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">Explore My Space</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything I've built, written, remembered, and taught — all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map(({ to, icon: Icon, title, description, color }) => (
            <Link
              key={to}
              to={to}
              className="group bg-card rounded-xl border border-border p-6 shadow-xs card-hover flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-auto group-hover:gap-2 transition-all">
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote / Personal touch */}
      <section className="bg-secondary/50 border-y border-border py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <blockquote className="font-serif text-2xl italic text-foreground/80 leading-relaxed">
            "Public service is not just a profession — it is a calling to make a difference in the lives of those we serve."
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground font-medium">— Bhupesh Chaudhary, IAS</p>
        </div>
      </section>
    </main>
  );
}
