
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ExpenseSummaryCard } from "@/components/expense-detail/ExpenseSummaryCard";
import { ParticipantsList } from "@/components/expense-detail/ParticipantsList";
import { SettleButton } from "@/components/expense-detail/SettleButton";
import { useExpenseDetail } from "@/hooks/useExpenseDetail";

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expense, isSettling, handleMarkAsSettled } = useExpenseDetail(id);
  
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
        <ExpenseSummaryCard expense={expense} />
        <ParticipantsList expense={expense} />
        <SettleButton 
          status={expense.status} 
          isSettling={isSettling} 
          onSettle={handleMarkAsSettled} 
        />
      </div>
    </div>
  );
};

export default ExpenseDetail;
