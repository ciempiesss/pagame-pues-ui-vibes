
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Calendar, Users, Receipt, ArrowLeftRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock data
const groupMembers = [
  { id: '1', name: 'Carlos' },
  { id: '2', name: 'Ana' },
  { id: '3', name: 'Miguel' },
  { id: '4', name: 'Laura' },
];

const AddExpense = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('1'); // Default to first user
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    groupMembers.map(member => member.id)
  );

  const handleParticipantToggle = (memberId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the expense
    navigate('/');
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <header className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Agregar Gasto</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="text-teal-500" />
            <h2 className="text-lg font-semibold">Detalles del Gasto</h2>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="¿En qué gastaste?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute right-3 top-2.5 text-muted-foreground h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
            />
            <Label htmlFor="recurring">Gasto recurrente (renta, servicios)</Label>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="text-teal-500" />
              <h2 className="text-lg font-semibold">¿Quién Pagó?</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {groupMembers.map(member => (
                <Button
                  key={member.id}
                  type="button"
                  variant={paidBy === member.id ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    paidBy === member.id ? "bg-teal-500 hover:bg-teal-600" : ""
                  }`}
                  onClick={() => setPaidBy(member.id)}
                >
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                      {member.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {member.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="text-teal-500" />
              <h2 className="text-lg font-semibold">Participantes</h2>
            </div>
            
            <div className="space-y-2">
              {groupMembers.map(member => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`member-${member.id}`}
                    checked={selectedParticipants.includes(member.id)}
                    onCheckedChange={() => handleParticipantToggle(member.id)}
                  />
                  <Label htmlFor={`member-${member.id}`} className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {member.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-amber-600 text-lg py-6"
        >
          ¡Dividir Gasto!
        </Button>
      </form>
    </div>
  );
};

export default AddExpense;
