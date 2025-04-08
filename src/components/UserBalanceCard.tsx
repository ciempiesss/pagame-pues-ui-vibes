
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserBalanceCardProps {
  otherUser: {
    id: string;
    name: string;
  };
  amount: number;
  isPositive: boolean;
}

export function UserBalanceCard({ otherUser, amount, isPositive }: UserBalanceCardProps) {
  const navigate = useNavigate();
  
  const handleSettleDebt = () => {
    // En una implementación real, esto navegaría a una página 
    // de registro de pago o abriría un modal
    navigate(`/liquidar/${otherUser.id}`);
  };

  return (
    <Card className={`border-l-4 ${isPositive ? "border-l-green-500" : "border-l-red-500"}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className={isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                {otherUser.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{otherUser.name}</p>
              <p className="text-sm text-muted-foreground">
                {isPositive ? "Te debe" : "Le debes"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className={`font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
              ${Math.abs(amount).toFixed(2)}
            </span>
            
            {/* Solo mostrar el botón si hay una deuda (negativa o positiva) */}
            {amount !== 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={handleSettleDebt}
              >
                {isPositive ? "Recibir" : "Pagar"} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
