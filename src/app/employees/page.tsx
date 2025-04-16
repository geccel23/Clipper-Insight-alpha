'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ProtectedPage from '@/components/ProtectedPage';

interface Employee {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  hourlyRate: number;
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<Employee, 'id'>>({ name: '', surname: '', phone: '', email: '', hourlyRate: 0 });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.name || !form.surname || !form.phone || !form.email || !form.hourlyRate) return;
    const newEmployee: Employee = { id: Date.now().toString(), ...form };
    setEmployees([...employees, newEmployee]);
    setForm({ name: '', surname: '', phone: '', email: '', hourlyRate: 0 });
    setOpen(false);
    toast({ title: 'Employee added', description: `${newEmployee.name} ${newEmployee.surname}` });
  };

  const handleRemove = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen p-6 bg-gray-100">
        <Card className="max-w-5xl mx-auto shadow-xl">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Employee Management</CardTitle>
            </div>
            <Button onClick={() => setOpen(true)}>Add Employee</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Surname</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Hourly Rate</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.surname}</TableCell>
                    <TableCell>{emp.phone}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>${emp.hourlyRate.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => handleRemove(emp.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Surname" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
              <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input
                placeholder="Hourly Rate"
                type="number"
                value={form.hourlyRate || ''}
                onChange={(e) => setForm({ ...form, hourlyRate: parseFloat(e.target.value) })}
              />
              <Button onClick={handleAdd}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedPage>
  );
};

export default EmployeeManagement;
