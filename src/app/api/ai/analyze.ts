'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIReportAssistantProps {
  dailyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  mostPopularServiceLastMonth: string;
  clients: { id: string; name: string; registeredAt: string }[];
  services: { id: string; name: string; price: number }[];
  transactions: { client: string; service: string; amount: number; status: string; date: string }[];
}

export default function AIReportAssistant({
  dailyRevenue,
  monthlyRevenue,
  yearlyRevenue,
  mostPopularServiceLastMonth,
  clients,
  services,
  transactions,
}: AIReportAssistantProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const contextString = `
        Daily Revenue: $${dailyRevenue}
        Monthly Revenue: $${monthlyRevenue}
        Yearly Revenue: $${yearlyRevenue}
        Most Popular Service Last Month: ${mostPopularServiceLastMonth}

        Clients:
        ${clients.map((c) => `- ${c.name} (Registered: ${c.registeredAt})`).join('\n')}

        Services:
        ${services.map((s) => `- ${s.name}: $${s.price}`).join('\n')}

        Transactions:
        ${transactions.map((t) => `- ${t.client} - ${t.service} - $${t.amount} - ${t.status} on ${t.date}`).join('\n')}
      `;

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `You are an AI assistant for a barbershop business. Based on the following data, answer this question:
      
      ${contextString}

      Question: ${question}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      setAnswer(text);
    } catch (err: any) {
      console.error(err);
      setAnswer('An error occurred while processing your question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Ask AI About Your Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Ask something about your business..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleAsk} disabled={loading || !question.trim()}>
          {loading ? 'Thinking...' : 'Ask'}
        </Button>
        {answer && (
          <div className="border rounded-md p-4 bg-muted text-sm whitespace-pre-wrap">
            {answer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
