import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction, TransactionType } from '../types';

interface MonthlyBarChartProps {
  transactions: Transaction[];
}

// Fix: Define a type for the aggregated monthly data for better readability and type safety.
type MonthlyData = { month: string; income: number; expense: number };

export const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ transactions }) => {
  const data = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (t.type === TransactionType.INCOME) {
      acc[month].income += t.amount;
    } else {
      acc[month].expense += t.amount;
    }
    return acc;
  }, {} as { [key: string]: MonthlyData });

  const chartData = Object.values(data)
    // Fix: Explicitly type array method arguments to resolve `unknown` type errors from `Object.values`.
    .sort((a: MonthlyData, b: MonthlyData) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .map((d: MonthlyData) => ({
        ...d,
        income: parseFloat(d.income.toFixed(2)),
        expense: parseFloat(d.expense.toFixed(2))
    }));

  if (chartData.length === 0) {
    return <div className="text-center text-textSecondary h-64 flex items-center justify-center">No transaction data for chart.</div>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" name="Income" />
          <Bar dataKey="expense" fill="#ef4444" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
