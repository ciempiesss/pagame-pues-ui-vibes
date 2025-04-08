
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, CreditCard, Check } from "lucide-react";
import { toast } from "sonner";

// Mock data para demostración
const mockUserData = {
  "2": { id: "2", name: "Ana", amount: 25.50, isPositive: true },
  "3": { id: "3", name: "Miguel", amount: -15.75, isPositive: false },
  "4": { id: "4", name: "Laura", amount: 42.30, isPositive: true },
  "5": { id: "5", name: "Pedro", amount: 0, isPositive: true },
};

const SettleDebt = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userData = userId ? mockUserData[userId as keyof typeof mockUserData] : null;
  
  const [amount, setAmount] = useState(userData ? Math.abs(userData.amount).toString() : "0");
  const [note, setNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!userData) {
    return (
      <div className="p-4 max-w-md mx-auto text-center pt-10">
        <p>Usuario no encontrado</p>
        <Button onClick={() => navigate("/balances")} className="mt-4">
          Volver a Balances
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulamos un proceso de pago
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`¡Pago ${userData.isPositive ? "recibido" : "realizado"} con éxito!`);
      navigate("/balances");
    }, 1500);
  };

  const title = userData.isPositive 
    ? `Recibir pago de ${userData.name}` 
    : `Realizar pago a ${userData.name}`;

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <header className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={() => navigate('/balances')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>

      <Card className="mb-6 animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className={userData.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} style={{ fontSize: "1.5rem" }}>
                {userData.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className={`font-medium ${userData.isPositive ? "text-green-600" : "text-red-600"}`}>
                {userData.isPositive ? "Te debe" : "Le debes"} ${Math.abs(userData.amount).toFixed(2)}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                Monto a {userData.isPositive ? "recibir" : "pagar"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="note" className="block text-sm font-medium mb-1">
                Nota (opcional)
              </label>
              <Textarea
                id="note"
                placeholder={`Nota para este ${userData.isPositive ? "cobro" : "pago"}`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 text-lg bg-accent hover:bg-amber-600 button-bounce"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <>
                  {userData.isPositive ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Marcar como Recibido
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Realizar Pago
                    </>
                  )}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettleDebt;
