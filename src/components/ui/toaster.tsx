'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (data: Toast) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (data: Toast) => {
    setToasts((prev) => [...prev, data]);
    console.log('Toast:', data.title, data.description); // aqui pode renderizar um toast real
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Aqui você pode mostrar os toasts visuais */}
      {/* Exemplo básico: */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t, i) => (
          <div key={i} className="bg-gray-800 text-white p-3 rounded shadow">
            <strong>{t.title}</strong>
            {t.description && <p>{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
