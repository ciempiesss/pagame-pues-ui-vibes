
export interface User {
  name: string;
  id: string;
}

export interface ExpenseData {
  id: string;
  description: string;
  amount: number;
  paidBy: User;
  participants: User[];
  date: Date;
  notes: string;
  category: string;
  splitMethod: string;
  status: "pending" | "settled";
  timeAgo: string;
}
