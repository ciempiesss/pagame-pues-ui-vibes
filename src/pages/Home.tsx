
import React from "react";
import { BalanceSummary } from "@/components/BalanceSummary";
import { ExpenseCard } from "@/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PlusCircle, History } from "lucide-react";

// Mock data for demonstration
const mockExpenses = [
  {
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
  },
  {
    id: "2",
    description: "Compra supermercado",
    amount: 120.30,
    paidBy: { name: "Ana", id: "2" },
    participants: [
      { name: "Carlos", id: "1" },
      { name: "Ana", id: "2" },
      { name: "Miguel", id: "3" },
    ],
    date: new Date(2024, 3, 1),
  },
  {
    id: "3",
    description: "Servicios Netflix",
    amount: 15.99,
    paidBy: { name: "Miguel", id: "3" },
    participants: [
      { name: "Carlos", id: "1" },
      { name: "Ana", id: "2" },
      { name: "Miguel", id: "3" },
      { name: "Laura", id: "4" },
    ],
    date: new Date(2024, 2, 25),
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1 text-teal-600">¡Bienvenido a Casa Juárez!</h1>
        <p className="text-muted-foreground">Veamos las cuentas de tu hogar.</p>
      </header>

      <section className="mb-8 animate-fade-in">
        <BalanceSummary youOwe={85.20} youAreOwed={120.30} />
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Gastos Recientes</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            <History className="h-4 w-4" /> Ver todos
          </Button>
        </div>

        <div className="space-y-3 animate-slide-up">
          {mockExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              {...expense}
              onClick={() => navigate(`/gastos/${expense.id}`)}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <Card className="bg-teal-50 border-teal-100">
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-teal-700">¿Nuevo gasto?</h3>
              <p className="text-sm text-teal-600">Regístralo y divídelo fácilmente</p>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600 button-bounce" onClick={() => navigate('/agregar')}>
              <PlusCircle className="h-5 w-5 mr-1" />
              Agregar
            </Button>
          </div>
        </Card>
      </section>

      <Button 
        className="fixed right-5 bottom-20 rounded-full w-14 h-14 shadow-lg bg-accent hover:bg-amber-600 button-bounce"
        onClick={() => navigate('/agregar')}
      >
        <PlusCircle className="h-7 w-7" />
      </Button>
    </div>
  );
};

export default Home;
