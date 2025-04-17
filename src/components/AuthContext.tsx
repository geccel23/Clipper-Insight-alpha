'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento inicial (ex: carregar do localStorage futuramente)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5s pra simular

    return () => clearTimeout(timeout);
  }, []);

  const login = async (email: string, password: string) => {
    if (email === 'admin@example.com' && password === '123456') {
      setUser({ email });
      return true;
    }

    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
