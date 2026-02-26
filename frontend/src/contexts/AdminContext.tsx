import React, { createContext, useContext, useState, useCallback } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  toggleAdmin: (pin: string) => boolean;
  exitAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PIN = '1234';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = useCallback((pin: string): boolean => {
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const exitAdmin = useCallback(() => {
    setIsAdmin(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin, exitAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
