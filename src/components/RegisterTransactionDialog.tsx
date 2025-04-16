import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const RegisterTransactionDialog = () => {
  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState('');

  const handleRegister = () => {
    console.log("Transaction Data:", { client, service, amount, status });
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="client">Client</Label>
        <Select onValueChange={setClient}>
          <SelectTrigger id="client" className="w-full">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client1">Client 1</SelectItem>
            <SelectItem value="client2">Client 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="service">Service</Label>
        <Select onValueChange={setService}>
          <SelectTrigger id="service" className="w-full">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="service1">Service 1</SelectItem>
            <SelectItem value="service2">Service 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount || ''}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Payment Status</Label>
        <Select onValueChange={setStatus}>
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
};

export default RegisterTransactionDialog;
