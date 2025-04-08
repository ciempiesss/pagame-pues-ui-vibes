
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, Calendar, Trash2, Edit, Check } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const mockExpense = {
  id: "1",
  description: "Cena en El Carnal",
  amount: 85.50,
  paidBy: { name: "Carlos", id: "1" },
  date: new Date(2024, 3, 2),
  participants: [
    { id: "1", name: "Carlos", share: 21.38, paid: true },
    { id: "2", name: "Ana", share: 21.38, paid: false },
    { id: "3", name: "Miguel", share: 21.38, paid: false },
    { id: "4", name: "Laura", share: 21.38, paid: true },
  ],
};

const ExpenseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expense] = useState(mockExpense); // In a real app, this would fetch the expense by ID

  const handleDelete = () => {
    // In a real app, this would delete the expense
    toast({
      title: "Gasto eliminado",
      description: "El gasto ha sido eliminado correctamente",
    });
    navigate('/');
  };

  const handleEdit = () => {
    // In a real app, this would navigate to the edit expense page
    navigate(`/gastos/${id}/editar`);
  };

  const handleTogglePaid = (participantId: string) => {
    // In a real app, this would update the participant's payment status
    toast({
      title: "Estado actualizado",
      description: "El estado de pago ha sido actualizado",
    });
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
        <h1 className="text-2xl font-bold">Detalle del Gasto</h1>
      </header>

      <section className="mb-8 animate-fade-in">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold mb-2">{expense.description}</h2>
              <p className="text-3xl font-bold text-teal-600">${expense.amount.toFixed(2)}</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(expense.date, "d 'de' MMMM, yyyy", {locale: es})}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Pagado por</p>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-sm">
                    {expense.paidBy.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{expense.paidBy.name}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Dividido entre</p>
              <div className="space-y-3">
                {expense.participants.map(participant => (
                  <div 
                    key={participant.id} 
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback 
                          className={`text-sm ${
                            participant.paid 
                              ? "bg-emerald-100 text-emerald-700" 
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {participant.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${participant.share.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant={participant.paid ? "outline" : "default"}
                      size="sm"
                      className={participant.paid 
                        ? "border-emerald-200 text-emerald-700 hover:bg-emerald-100" 
                        : "bg-amber-500 hover:bg-amber-600"}
                      onClick={() => handleTogglePaid(participant.id)}
                    >
                      {participant.paid ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-4 w-4" /> Pagado
                        </span>
                      ) : (
                        "Marcar Pagado"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-rose-200 text-rose-700 hover:bg-rose-100"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
              <Button 
                className="flex-1 bg-teal-500 hover:bg-teal-600"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ExpenseDetail;
