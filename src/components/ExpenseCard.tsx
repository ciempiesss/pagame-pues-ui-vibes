
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarGroup } from "@/components/AvatarGroup";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface ExpenseCardProps {
  id: string;
  description: string;
  amount: number;
  paidBy: { name: string; id: string };
  participants: { name: string; id: string }[];
  date: Date;
  onClick?: () => void;
}

export function ExpenseCard({
  description,
  amount,
  paidBy,
  participants,
  date,
  onClick,
}: ExpenseCardProps) {
  const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: es });

  return (
    <Card 
      onClick={onClick} 
      className="cursor-pointer card-hover"
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base truncate max-w-[200px]">
              {description}
            </h3>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {paidBy.name}
              </span>{" "}
              pagó
            </p>
            <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-semibold text-lg">
              ${amount.toFixed(2)}
            </span>
            <div className="mt-1">
              <AvatarGroup users={participants} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
