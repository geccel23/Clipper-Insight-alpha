'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProtectedPage from '@/components/ProtectedPage';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<Service, 'id'>>({ name: '', price: 0, duration: '' });

  const handleAdd = () => {
    const newService: Service = { id: Date.now().toString(), ...form };
    setServices([...services, newService]);
    setForm({ name: '', price: 0, duration: '' });
    setOpen(false);
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-100 p-6">
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl">Service Management</CardTitle>
            <Button onClick={() => setOpen(true)}>Add Service</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>${service.price.toFixed(2)}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Service Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Price" type="number" value={form.price || ''} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} />
              <Input placeholder="Duration (e.g., 30min)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              <Button onClick={handleAdd}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedPage>
  );
}
