'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AIReportAssistant from '@/components/AIReportAssistant';
import ProtectedPage from '@/components/ProtectedPage';
import AppHeader from '@/components/AppHeader';

const initialRevenueData = [
  { name: 'Day 1', revenue: 4000 },
  { name: 'Day 2', revenue: 3000 },
  { name: 'Day 3', revenue: 2000 },
  { name: 'Day 4', revenue: 2780 },
  { name: 'Day 5', revenue: 1890 },
  { name: 'Day 6', revenue: 2390 },
  { name: 'Day 7', revenue: 3490 },
];

const initialClients = [
  { id: '1', name: 'João Silva', registeredAt: '2024-04-01' },
  { id: '2', name: 'Maria Oliveira', registeredAt: '2024-04-03' },
];

const initialServices = [
  { id: '1', name: 'Haircut', price: 30 },
  { id: '2', name: 'Beard Trim', price: 20 },
];

const initialTransactions = [
  { client: 'João Silva', service: 'Haircut', amount: 30, status: 'paid', date: '2024-04-01' },
  { client: 'Maria Oliveira', service: 'Beard Trim', amount: 20, status: 'pending', date: '2024-04-02' },
];

export default function Dashboard() {
  const [showAI, setShowAI] = useState(false);
  const [dailyRevenue] = useState(150);
  const [monthlyRevenue] = useState(4500);
  const [yearlyRevenue] = useState(54000);
  const [mostPopularServiceLastMonth] = useState('Haircut');
  const [revenueData] = useState(initialRevenueData);
  const [clients] = useState(initialClients);
  const [services] = useState(initialServices);
  const [transactions] = useState(initialTransactions);

  return (
    <ProtectedPage>
      <AppHeader />
      <main className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-6">
        <section className="max-w-6xl mx-auto mb-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Revenue Overview</CardTitle>
                <CardDescription>Key metrics at a glance</CardDescription>
              </div>
              <Input placeholder="Search..." className="w-60 mt-4 sm:mt-0" />
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>${monthlyRevenue}</CardTitle>
                  <CardDescription>Monthly Revenue</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>${yearlyRevenue}</CardTitle>
                  <CardDescription>Yearly Revenue</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{mostPopularServiceLastMonth}</CardTitle>
                  <CardDescription>Most Popular Service</CardDescription>
                </CardHeader>
              </Card>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Revenue Report</CardTitle>
              <CardDescription>Revenue data visualized</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Floating AI Assistant Button */}
        <Button
          onClick={() => setShowAI(true)}
          variant="outline"
          className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 border shadow-md rounded-full p-4 hover:bg-blue-100"
        >
          <Sparkles className="h-6 w-6 text-blue-600" />
        </Button>

        <Dialog open={showAI} onOpenChange={setShowAI}>
          <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-900 shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">AI Revenue Assistant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-2">
              <AIReportAssistant
                dailyRevenue={dailyRevenue}
                monthlyRevenue={monthlyRevenue}
                yearlyRevenue={yearlyRevenue}
                mostPopularServiceLastMonth={mostPopularServiceLastMonth}
                clients={clients}
                services={services}
                transactions={transactions}
              />
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </ProtectedPage>
  );
}
