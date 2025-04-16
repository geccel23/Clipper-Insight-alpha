import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Client {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  services?: string[];
}

export interface Service {
  id: string;
  name: string;
  price?: number;
  duration?: number;
}

interface AppDataContextType {
  clients: Client[];
  services: Service[];
  setClients: (clients: Client[]) => void;
  setServices: (services: Service[]) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    const storedServices = localStorage.getItem('services');
    if (storedClients) setClients(JSON.parse(storedClients));
    if (storedServices) setServices(JSON.parse(storedServices));
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  return (
    <AppDataContext.Provider value={{ clients, services, setClients, setServices }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within an AppDataProvider');
  return context;
};
