'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import ProtectedPage from '@/components/ProtectedPage';

interface Payment {
  id: string;
  client: string;
  service: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([
    { id: '1', client: 'João Silva', service: 'Haircut', amount: 30, date: '2024-04-01', status: 'paid' },
    { id: '2', client: 'Maria Oliveira', service: 'Beard Trim', amount: 20, date: '2024-04-02', status: 'pending' },
  ]);

  const handleStatusChange = (id: string, newStatus: Payment['status']) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, status: newStatus } : payment
      )
    );
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen p-6 bg-gray-100">
        <Card className="max-w-5xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Payment Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.client}</TableCell>
                    <TableCell>{payment.service}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Select value={payment.status} onValueChange={(value) => handleStatusChange(payment.id, value as Payment['status'])}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedPage>
  );
};

export default PaymentsPage;
