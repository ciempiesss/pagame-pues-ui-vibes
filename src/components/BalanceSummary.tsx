
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface BalanceSummaryProps {
  youOwe: number;
  youAreOwed: number;
}

export function BalanceSummary({ youOwe, youAreOwed }: BalanceSummaryProps) {
  const balance = youAreOwed - youOwe;

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-4">
        <h2 className="font-medium text-lg text-center mb-4">Tu Balance</h2>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-rose-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">Tú debes</span>
            </div>
            <span className="font-semibold text-lg text-rose-500">
              ${youOwe.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-emerald-500">
              <ArrowDownRight className="w-4 h-4" />
              <span className="text-sm">Te deben</span>
            </div>
            <span className="font-semibold text-lg text-emerald-500">
              ${youAreOwed.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Balance Total</span>
            <span
              className={`font-semibold text-lg ${
                balance >= 0 ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              ${Math.abs(balance).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
