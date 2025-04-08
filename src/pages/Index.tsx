
import { Navigation } from "@/components/Navigation";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AddExpense from "@/pages/AddExpense";
import GroupManagement from "@/pages/GroupManagement";
import Balances from "@/pages/Balances";
import Settings from "@/pages/Settings";
import ExpenseDetail from "@/pages/ExpenseDetail";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar" element={<AddExpense />} />
        <Route path="/grupo" element={<GroupManagement />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/ajustes" element={<Settings />} />
        <Route path="/gastos/:id" element={<ExpenseDetail />} />
      </Routes>
      <Navigation />
    </div>
  );
};

export default Index;
