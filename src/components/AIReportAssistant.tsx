'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          context: {
            dailyRevenue,
            monthlyRevenue,
            yearlyRevenue,
            mostPopularServiceLastMonth,
            clients,
            services,
            transactions,
          },
        }),
      });

      const data = await res.json();
      setAnswer(data.answer || 'No answer returned.');
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
