
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/AvatarGroup";
import { Users } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ExpenseData } from "@/types/expense";

interface ParticipantsListProps {
  expense: ExpenseData;
}

export function ParticipantsList({ expense }: ParticipantsListProps) {
  const amountPerPerson = expense.amount / expense.participants.length;
  const formattedDate = format(expense.date, "PPP", { locale: es });
  
  return (
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
  );
}
