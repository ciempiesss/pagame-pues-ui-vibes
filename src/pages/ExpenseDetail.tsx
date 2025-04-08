
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarGroup } from "@/components/AvatarGroup";
import { ChevronLeft, Receipt, Calendar, Users, Check, ArrowLeftRight, CheckCircle } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

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
  const [expense, setExpense] = useState(mockExpenseData);
  const [isSettling, setIsSettling] = useState(false);
  
  const amountPerPerson = expense.amount / expense.participants.length;
  const timeAgo = formatDistanceToNow(expense.date, { addSuffix: true, locale: es });
  const formattedDate = format(expense.date, "PPP", { locale: es });
  
  const handleMarkAsSettled = () => {
    setIsSettling(true);
    setTimeout(() => {
      setExpense({
        ...expense,
        status: "settled"
      });
      setIsSettling(false);
      toast.success("¡Gasto marcado como saldado!");
    }, 800);
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
        <h1 className="text-2xl font-bold">Detalles del Gasto</h1>
      </header>
      
      <div className="space-y-6 animate-fade-in">
        <Card className={`border-teal-100 relative ${expense.status === "settled" ? "bg-green-50" : ""}`}>
          {expense.status === "settled" && (
            <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Saldado
            </div>
          )}
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
        
        {expense.status === "pending" ? (
          <Button 
            className="w-full py-6 text-lg bg-accent hover:bg-amber-600 button-bounce"
            onClick={handleMarkAsSettled}
            disabled={isSettling}
          >
            {isSettling ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            ) : (
              <>
                <Check className="h-5 w-5 mr-2" />
                Marcar como Saldado
              </>
            )}
          </Button>
        ) : (
          <Button 
            className="w-full py-6 text-lg bg-green-100 text-green-800 hover:bg-green-200 cursor-default"
            disabled
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Gasto Saldado
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetail;
