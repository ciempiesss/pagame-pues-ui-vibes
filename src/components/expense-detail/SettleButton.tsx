
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle } from "lucide-react";

interface SettleButtonProps {
  status: "pending" | "settled";
  isSettling: boolean;
  onSettle: () => void;
}

export function SettleButton({ status, isSettling, onSettle }: SettleButtonProps) {
  if (status === "pending") {
    return (
      <Button 
        className="w-full py-6 text-lg bg-accent hover:bg-amber-600 button-bounce"
        onClick={onSettle}
        disabled={isSettling}
      >
        {isSettling ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
        ) : (
          <>
            <Check className="h-5 w-5 mr-2" />
            Marcar como Saldado
          </>
        )}
      </Button>
    );
  }
  
  return (
    <Button 
      className="w-full py-6 text-lg bg-green-100 text-green-800 hover:bg-green-200 cursor-default"
      disabled
    >
      <CheckCircle className="h-5 w-5 mr-2" />
      Gasto Saldado
    </Button>
  );
}
