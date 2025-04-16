'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import ProtectedPage from '@/components/ProtectedPage';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  services: string[];
}

const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'João Silva', phone: '123-456-7890', email: 'joao@example.com', services: ['Haircut', 'Beard Trim'] },
    { id: '2', name: 'Maria Oliveira', phone: '987-654-3210', email: 'maria@example.com', services: ['Haircut'] },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleRegisterClient = () => {
    if (newClientName && newClientPhone && newClientEmail) {
      const newClient: Client = {
        id: String(Date.now()),
        name: newClientName,
        phone: newClientPhone,
        email: newClientEmail,
        services: [],
      };
      setClients([...clients, newClient]);
      setNewClientName('');
      setNewClientPhone('');
      setNewClientEmail('');
      setOpen(false);
      toast({ title: 'Client Registered', description: `Client ${newClient.name} has been successfully registered.` });
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedPage>
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="grid grid-cols-[250px,1fr] gap-6">
          <nav className="bg-white shadow rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-xl">Barber Shop</h2>
            <ul className="space-y-2 text-gray-500">
              <li><a href="/">Dashboard</a></li>
              <li className="font-semibold text-blue-600">Clients</li>
              <li><a href="/employees">Employees</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/payments">Payments</a></li>
            </ul>
          </nav>

          <Card className="shadow-xl">
            <CardHeader className="flex-row justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Client Management</CardTitle>
                <CardDescription>Effortlessly manage your client list.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-60"
                />
                <Button onClick={() => setOpen(true)}>Add Client</Button>
              </div>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map(client => (
                      <TableRow key={client.id} className="hover:bg-gray-200 cursor-pointer" onClick={() => setSelectedClient(client)}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Name" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} />
              <Input placeholder="Phone" value={newClientPhone} onChange={(e) => setNewClientPhone(e.target.value)} />
              <Input placeholder="Email" type="email" value={newClientEmail} onChange={(e) => setNewClientEmail(e.target.value)} />
            </div>
            <Button onClick={handleRegisterClient}>Register</Button>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedClient?.name}'s Services</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[200px]">
              {selectedClient?.services.length ? (
                selectedClient.services.map((service, idx) => <div key={idx} className="p-2 border-b">{service}</div>)
              ) : <p className="p-4">No services recorded.</p>}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedPage>
  );
};

export default ClientManagement;
