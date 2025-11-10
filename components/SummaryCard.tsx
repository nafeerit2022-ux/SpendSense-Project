import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, icon }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  const amountColor = amount > 0 ? 'text-success' : amount < 0 ? 'text-danger' : 'text-textPrimary';

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg flex items-center space-x-4">
      <div className="bg-background p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-textSecondary">{title}</p>
        <p className={`text-2xl font-bold ${title === 'Balance' ? amountColor : 'text-textPrimary'}`}>
          {formattedAmount}
        </p>
      </div>
    </div>
  );
};
