import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction, TransactionType } from '../types';
import { CATEGORIES } from '../constants';

interface CategoryPieChartProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D1FF', '#F4A261'];

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ transactions }) => {
  const expenseTransactions = transactions.filter(t => t.type === TransactionType.EXPENSE);

  const data = CATEGORIES.EXPENSE.reduce((acc, category) => {
    const total = expenseTransactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);

    if (total > 0) {
      acc.push({ name: category, value: parseFloat(total.toFixed(2)) });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  if (data.length === 0) {
    return <div className="text-center text-textSecondary h-64 flex items-center justify-center">No expense data for chart.</div>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
