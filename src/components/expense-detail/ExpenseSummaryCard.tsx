
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt, Calendar, ArrowLeftRight, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ExpenseData } from "@/types/expense";

interface ExpenseSummaryCardProps {
  expense: ExpenseData;
}

export function ExpenseSummaryCard({ expense }: ExpenseSummaryCardProps) {
  const amountPerPerson = expense.amount / expense.participants.length;
  const formattedDate = format(expense.date, "PPP", { locale: es });
  
  return (
    <Card className={`border-teal-100 relative ${expense.status === "settled" ? "bg-green-50" : ""}`}>
      {expense.status === "settled" && (
        <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Saldado
        </div>
      )}
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-1">{expense.description}</h2>
        <p className="text-muted-foreground mb-4">{expense.timeAgo}</p>
        
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
  );
}
