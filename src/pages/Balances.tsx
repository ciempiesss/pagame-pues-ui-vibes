
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const balances = [
  { id: "1", name: "Carlos", balance: 50.75, isPositive: true },
  { id: "2", name: "Ana", balance: -25.30, isPositive: false },
  { id: "3", name: "Miguel", balance: 10.20, isPositive: true },
  { id: "4", name: "Laura", balance: -35.65, isPositive: false },
];

const Balances = () => {
  const navigate = useNavigate();
  
  const totalPositive = balances
    .filter(balance => balance.isPositive)
    .reduce((acc, curr) => acc + curr.balance, 0);
    
  const totalNegative = balances
    .filter(balance => !balance.isPositive)
    .reduce((acc, curr) => acc + Math.abs(curr.balance), 0);
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1 text-teal-600">¿Quién Debe Qué?</h1>
        <p className="text-muted-foreground">Resumen de todas las deudas en el grupo.</p>
      </header>

      <section className="mb-8 animate-fade-in">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-center">Resumen de Balances</h2>
            
            <div className="flex justify-around mb-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Deudas Totales</p>
                <p className="font-semibold text-lg text-rose-500">${totalNegative.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Préstamos Totales</p>
                <p className="font-semibold text-lg text-emerald-500">${totalPositive.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-emerald-500"
                style={{ width: `${(totalPositive / (totalPositive + totalNegative)) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Balances Individuales</h2>
        <div className="space-y-3 animate-slide-up">
          {balances.map((person) => (
            <Card 
              key={person.id}
              className="cursor-pointer card-hover"
              onClick={() => navigate(`/balances/${person.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback
                        className={person.isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}
                      >
                        {person.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p
                        className={`text-sm ${
                          person.isPositive ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {person.isPositive ? "Te debe" : "Le debes"} ${Math.abs(person.balance).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <Button 
          className="w-full bg-accent hover:bg-amber-600 text-lg py-6 button-bounce"
          onClick={() => {
            // In a real app, this would calculate and suggest optimal settlement
          }}
        >
          <Wallet className="h-5 w-5 mr-2" />
          Saldar Cuentas Óptimamente
        </Button>
      </section>
    </div>
  );
};

export default Balances;
