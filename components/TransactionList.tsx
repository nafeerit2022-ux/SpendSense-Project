import React from 'react';
import { Transaction, TransactionType } from '../types';
import { Trash2, ArrowUpCircle, ArrowDownCircle, Pencil } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, onEdit }) => {
  if (transactions.length === 0) {
    return <div className="bg-card p-6 rounded-xl shadow-lg text-center text-textSecondary">No transactions yet.</div>;
  }

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {transactions.map((t) => (
          <li key={t.id} className="p-4 flex items-center justify-between hover:bg-background">
            <div className="flex items-center space-x-4">
              {t.type === TransactionType.INCOME ? (
                <ArrowUpCircle className="w-8 h-8 text-success" />
              ) : (
                <ArrowDownCircle className="w-8 h-8 text-danger" />
              )}
              <div>
                <p className="font-semibold text-textPrimary">{t.category}</p>
                <p className="text-sm text-textSecondary">{t.note || new Date(t.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p className={`font-bold w-24 text-right ${t.type === TransactionType.INCOME ? 'text-success' : 'text-danger'}`}>
                {t.type === TransactionType.INCOME ? '+' : '-'} ${t.amount.toFixed(2)}
              </p>
              <button 
                onClick={() => onEdit(t)} 
                className="p-2 text-gray-400 hover:text-secondary transition-colors"
                aria-label={`Edit transaction ${t.id}`}
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onDelete(t.id)} 
                className="p-2 text-gray-400 hover:text-danger transition-colors"
                aria-label={`Delete transaction ${t.id}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};