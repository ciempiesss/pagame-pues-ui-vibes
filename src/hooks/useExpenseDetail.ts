
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { ExpenseData } from "@/types/expense";

// Mock data for demonstration
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

export function useExpenseDetail(expenseId: string | undefined) {
  // In a real app, we would fetch the expense data based on the ID
  const [expense, setExpense] = useState(() => {
    const data = {...mockExpenseData};
    // Add the computed timeAgo property
    const timeAgo = formatDistanceToNow(data.date, { addSuffix: true, locale: es });
    return { ...data, timeAgo };
  });
  
  const [isSettling, setIsSettling] = useState(false);
  
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

  return {
    expense,
    isSettling,
    handleMarkAsSettled
  };
}
