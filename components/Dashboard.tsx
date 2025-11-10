import React from 'react';
import { Transaction, Budget, TransactionType } from '../types';
import { SummaryCard } from './SummaryCard';
import { TransactionList } from './TransactionList';
import { GeminiInsights } from './GeminiInsights';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  budget: Budget;
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  setBudget: (budget: Budget) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  const totalIncome = transactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          icon={<TrendingUp className="w-8 h-8 text-success" />}
        />
        <SummaryCard
          title="Total Expense"
          amount={totalExpense}
          icon={<TrendingDown className="w-8 h-8 text-danger" />}
        />
        <SummaryCard
          title="Balance"
          amount={balance}
          icon={<DollarSign className="w-8 h-8 text-primary" />}
        />
      </div>
      
      <GeminiInsights transactions={transactions} />

      <div>
        <h2 className="text-2xl font-bold mb-4 text-textPrimary">Recent Transactions</h2>
        <TransactionList
          transactions={[...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
          onDelete={onDeleteTransaction}
          onEdit={onEditTransaction}
        />
      </div>
    </div>
  );
};
