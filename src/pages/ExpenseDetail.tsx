
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarGroup } from "@/components/AvatarGroup";
import { ChevronLeft, Receipt, Calendar, Users, Check, ArrowLeftRight } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";

// Mock data para demostración
const mockExpenseData = {
  id: "1",
  description: "Cena en El Carnal",
  amount: 85.50,
  paidBy: { name: "Carlos", id: "1" },
  participants: [
    { name: "Carlos", id: "1" },
    { name: "Ana", id: "2" },
    { name: "Miguel", id: "3" },
    { name: "Laura", id: "4" },
  ],
  date: new Date(2024, 3, 2),
  notes: "Celebración de cumpleaños",
  category: "Comida",
  splitMethod: "Partes iguales",
  status: "pending" // "pending" | "settled"
};

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // En una app real, usaríamos el id para obtener los detalles del gasto
  const expense = mockExpenseData;
  
  const amountPerPerson = expense.amount / expense.participants.length;
  const timeAgo = formatDistanceToNow(expense.date, { addSuffix: true, locale: es });
  const formattedDate = format(expense.date, "PPP", { locale: es });
  
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
        <h1 className="text-2xl font-bold">Detalles del Gasto</h1>
      </header>
      
      <div className="space-y-6 animate-fade-in">
        <Card className="border-teal-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-1">{expense.description}</h2>
            <p className="text-muted-foreground mb-4">{timeAgo}</p>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">${expense.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Por persona</p>
                <p className="text-lg font-semibold">${amountPerPerson.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Receipt className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categoría</p>
                  <p className="font-medium">{expense.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Calendar className="h-5 w-5 text-teal-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <ArrowLeftRight className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Método de división</p>
                  <p className="font-medium">{expense.splitMethod}</p>
                </div>
              </div>
            </div>
            
            {expense.notes && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Notas</p>
                <p className="p-3 bg-muted rounded-md">{expense.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                  {expense.paidBy.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{expense.paidBy.name} pagó</p>
                <p className="text-sm text-muted-foreground">el {formattedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-teal-600" />
              <p className="font-medium">Participantes</p>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <AvatarGroup users={expense.participants} max={5} />
              <p className="text-muted-foreground text-sm">
                {expense.participants.length} personas
              </p>
            </div>
            
            <div className="space-y-2 mt-4">
              {expense.participants.map(participant => (
                <div key={participant.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                        {participant.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p>{participant.name}</p>
                  </div>
                  <p className="font-medium">${amountPerPerson.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full py-6 text-lg bg-accent hover:bg-amber-600 button-bounce"
          onClick={() => {
            // En una app real, esto marcaría el gasto como saldado
          }}
        >
          <Check className="h-5 w-5 mr-2" />
          Marcar como Saldado
        </Button>
      </div>
    </div>
  );
};

export default ExpenseDetail;
