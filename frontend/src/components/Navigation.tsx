import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, BookOpen, Briefcase, Image, FileText, GraduationCap, Home, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import AdminToggle from './AdminToggle';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/resume', label: 'Resume', icon: Briefcase },
  { to: '/blogs', label: 'Blog', icon: BookOpen },
  { to: '/memories', label: 'Memories', icon: Image },
  { to: '/articles', label: 'Articles', icon: FileText },
  { to: '/study-material', label: "Kids' Study", icon: GraduationCap },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAdminToggle, setShowAdminToggle] = useState(false);
  const { isAdmin, exitAdmin } = useAdmin();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                My Space
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Admin controls */}
            <div className="hidden md:flex items-center gap-2">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                    Admin Mode
                  </span>
                  <Button variant="ghost" size="icon" onClick={exitAdmin} title="Exit admin mode">
                    <LogOut size={16} />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAdminToggle(true)}
                  title="Admin login"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Settings size={16} />
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card animate-fade-in">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-1">
                {isAdmin ? (
                  <button
                    onClick={() => { exitAdmin(); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-accent hover:bg-accent/10 transition-colors w-full"
                  >
                    <LogOut size={16} />
                    Exit Admin Mode
                  </button>
                ) : (
                  <button
                    onClick={() => { setShowAdminToggle(true); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors w-full"
                  >
                    <Settings size={16} />
                    Admin Login
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {showAdminToggle && (
        <AdminToggle onClose={() => setShowAdminToggle(false)} />
      )}
    </>
  );
}
