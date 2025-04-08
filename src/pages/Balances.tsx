
import React, { useState } from "react";
import { UserBalanceCard } from "@/components/UserBalanceCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank, Users, ArrowDownUp } from "lucide-react";

// Mock data - En una implementación real, esto vendría de una API o base de datos
const mockBalances = [
  { id: "2", name: "Ana", amount: 25.50, isPositive: true },
  { id: "3", name: "Miguel", amount: -15.75, isPositive: false },
  { id: "4", name: "Laura", amount: 42.30, isPositive: true },
  { id: "5", name: "Pedro", amount: 0, isPositive: true },
];

const Balances = () => {
  const [activeTab, setActiveTab] = useState<"todos" | "por-cobrar" | "por-pagar">("todos");
  
  // Filtrar balances según la pestaña seleccionada
  const filteredBalances = mockBalances.filter(balance => {
    if (activeTab === "todos") return true;
    if (activeTab === "por-cobrar") return balance.isPositive && balance.amount > 0;
    if (activeTab === "por-pagar") return !balance.isPositive && balance.amount < 0;
    return true;
  });
  
  // Calcular total por cobrar (positivos)
  const totalReceivable = mockBalances
    .filter(b => b.isPositive && b.amount > 0)
    .reduce((sum, b) => sum + b.amount, 0);
  
  // Calcular total por pagar (negativos)
  const totalPayable = mockBalances
    .filter(b => !b.isPositive && b.amount < 0)
    .reduce((sum, b) => sum + Math.abs(b.amount), 0);
  
  // Balance neto
  const netBalance = totalReceivable - totalPayable;

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Balances</h1>
        <p className="text-muted-foreground">Revisa lo que debes y te deben</p>
      </header>

      <div className="grid gap-4">
        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-2 gap-3 mb-4 animate-fade-in">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-700">Por cobrar</p>
                  <p className="text-xl font-bold text-green-700">${totalReceivable.toFixed(2)}</p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-red-700">Por pagar</p>
                  <p className="text-xl font-bold text-red-700">${totalPayable.toFixed(2)}</p>
                </div>
                <div className="p-2 rounded-full bg-red-100">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Balance neto */}
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Balance neto</p>
              <p className={`text-2xl font-bold ${
                netBalance > 0 ? "text-green-600" : 
                netBalance < 0 ? "text-red-600" : ""
              }`}>${netBalance.toFixed(2)}</p>
            </div>
            <div className={`p-3 rounded-full ${
              netBalance > 0 ? "bg-green-100" : 
              netBalance < 0 ? "bg-red-100" : "bg-gray-100"
            }`}>
              <ArrowDownUp className={`h-6 w-6 ${
                netBalance > 0 ? "text-green-600" : 
                netBalance < 0 ? "text-red-600" : "text-gray-600"
              }`} />
            </div>
          </CardContent>
        </Card>
        
        {/* Pestañas para filtrar balances */}
        <Tabs defaultValue="todos" className="mb-6" onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="por-cobrar">Por cobrar</TabsTrigger>
            <TabsTrigger value="por-pagar">Por pagar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos" className="space-y-4">
            {filteredBalances.map((balance) => (
              <UserBalanceCard 
                key={balance.id}
                otherUser={{ id: balance.id, name: balance.name }}
                amount={balance.amount}
                isPositive={balance.isPositive}
              />
            ))}
            {filteredBalances.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No hay balances para mostrar
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="por-cobrar" className="space-y-4">
            {filteredBalances.map((balance) => (
              <UserBalanceCard 
                key={balance.id}
                otherUser={{ id: balance.id, name: balance.name }}
                amount={balance.amount}
                isPositive={balance.isPositive}
              />
            ))}
            {filteredBalances.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No hay deudas por cobrar
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="por-pagar" className="space-y-4">
            {filteredBalances.map((balance) => (
              <UserBalanceCard 
                key={balance.id}
                otherUser={{ id: balance.id, name: balance.name }}
                amount={balance.amount}
                isPositive={balance.isPositive}
              />
            ))}
            {filteredBalances.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No hay deudas por pagar
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Balances;
