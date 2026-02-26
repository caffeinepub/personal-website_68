import { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';

interface AdminToggleProps {
  onClose: () => void;
}

export default function AdminToggle({ onClose }: AdminToggleProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const { toggleAdmin } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = toggleAdmin(pin);
    if (success) {
      onClose();
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-warm-lg border border-border p-6 w-full max-w-sm mx-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock size={16} className="text-primary" />
            </div>
            <h2 className="font-serif text-lg font-semibold text-foreground">Admin Access</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your PIN to access content management.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            className="text-center tracking-widest text-lg"
            maxLength={8}
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={!pin}>
            Unlock
          </Button>
        </form>
      </div>
    </div>
  );
}
