
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, Users, BarChart3, Settings } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: PlusCircle, label: "Agregar", path: "/agregar" },
    { icon: Users, label: "Grupo", path: "/grupo" },
    { icon: BarChart3, label: "Balance", path: "/balances" },
    { icon: Settings, label: "Ajustes", path: "/ajustes" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card shadow-lg rounded-t-xl border-t z-10">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <div className="absolute top-2 rounded-full w-1 h-1 bg-primary"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
