'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ProtectedPage from '@/components/ProtectedPage';
import AppHeader from '@/components/AppHeader';
import * as XLSX from 'xlsx';

export const metadata = {
  manifest: '/manifest.json',
};

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

  const printableRef = useRef<HTMLDivElement>(null);

  const handleStatusChange = (id: string, newStatus: Payment['status']) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, status: newStatus } : payment
      )
    );
  };

  const handlePrint = () => {
    if (printableRef.current) {
      const printContents = printableRef.current.innerHTML;
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <html>
            <head><title>Payments Report</title></head>
            <body>${printContents}</body>
          </html>
        `);
        win.document.close();
        win.focus();
        win.print();
        win.close();
      }
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(payments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
    XLSX.writeFile(workbook, 'payments_report.xlsx');
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch((err) => {
        console.error('Service worker registration failed:', err);
      });
    }
  }, []);

  return (
    <ProtectedPage>
      <AppHeader />
      <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100 dark:bg-gray-900">
        <section className="max-w-6xl mx-auto mb-4 flex flex-col sm:flex-row justify-end gap-4">
          <Button onClick={handlePrint}>Print Report</Button>
          <Button onClick={handleExport}>Export XLSX</Button>
        </section>
        <section ref={printableRef} className="max-w-6xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Payment Tracking</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <Table className="min-w-[600px]">
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
                        <Select
                          value={payment.status}
                          onValueChange={(value) => handleStatusChange(payment.id, value as Payment['status'])}
                        >
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
        </section>
      </main>
    </ProtectedPage>
  );
};

export default PaymentsPage;
