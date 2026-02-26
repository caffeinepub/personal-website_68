import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'personal-website');

  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif text-base font-semibold text-foreground">Bhupesh Chaudhary</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              IAS Officer · Ladakh — A digital home for thoughts, memories, and learning.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-xs text-muted-foreground">
              © {year} Bhupesh Chaudhary · All rights reserved
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Built with{' '}
              <Heart size={11} className="text-accent fill-accent" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
