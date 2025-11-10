import React from 'react';
import { Transaction } from '../types';
import { CategoryPieChart } from './CategoryPieChart';
import { MonthlyBarChart } from './MonthlyBarChart';

interface AnalyticsProps {
  transactions: Transaction[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ transactions }) => {
  return (
    <div className="space-y-8">
       <h2 className="text-2xl font-bold text-center text-textPrimary">Financial Analytics</h2>
       {transactions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-textPrimary">Expense by Category</h3>
                <CategoryPieChart transactions={transactions} />
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-textPrimary">Monthly Overview</h3>
                <MonthlyBarChart transactions={transactions} />
            </div>
        </div>
       ) : (
        <div className="bg-card p-10 rounded-xl shadow-lg text-center text-textSecondary">
            <h3 className="text-xl font-semibold">Not enough data to display analytics.</h3>
            <p className="mt-2">Please add some transactions to see your financial breakdown.</p>
        </div>
       )}
    </div>
  );
};
