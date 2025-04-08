
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AvatarGroupProps {
  users: { name: string; id: string }[];
  max?: number;
}

export function AvatarGroup({ users, max = 3 }: AvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {displayUsers.map((user) => (
        <Avatar key={user.id} className="border-2 border-background w-8 h-8">
          <AvatarFallback className="bg-teal-400 text-white text-xs">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <Avatar className="border-2 border-background w-8 h-8">
          <AvatarFallback className="bg-amber-400 text-white text-xs">
            +{remaining}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
