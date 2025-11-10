import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { CATEGORIES } from '../constants';
import { X } from 'lucide-react';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  transaction: Transaction | null;
}

export const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ isOpen, onClose, onSave, transaction }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[TransactionType.EXPENSE][0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(String(transaction.amount));
      setCategory(transaction.category);
      setDate(transaction.date);
      setNote(transaction.note || '');
    } else {
      // Reset form
      setType(TransactionType.EXPENSE);
      setAmount('');
      setCategory(CATEGORIES[TransactionType.EXPENSE][0]);
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
    }
  }, [transaction, isOpen]);

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategory(CATEGORIES[newType][0]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    onSave({
      id: transaction ? transaction.id : new Date().toISOString(),
      type,
      amount: parseFloat(amount),
      category,
      date,
      note,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-textPrimary">{transaction ? 'Edit' : 'Add'} Transaction</h2>
          <button onClick={onClose} className="text-textSecondary hover:text-textPrimary"><X /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="flex space-x-2 bg-background p-1 rounded-lg">
              <button type="button" onClick={() => handleTypeChange(TransactionType.EXPENSE)} className={`w-full py-2 rounded-md font-semibold transition-all ${type === TransactionType.EXPENSE ? 'bg-white shadow text-danger' : 'text-textSecondary hover:bg-gray-200'}`}>Expense</button>
              <button type="button" onClick={() => handleTypeChange(TransactionType.INCOME)} className={`w-full py-2 rounded-md font-semibold transition-all ${type === TransactionType.INCOME ? 'bg-white shadow text-success' : 'text-textSecondary hover:bg-gray-200'}`}>Income</button>
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-textSecondary">Amount</label>
              <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary bg-background" placeholder="0.00" required />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-textSecondary">Category</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary bg-background">
                {CATEGORIES[type].map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-textSecondary">Date</label>
              <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary bg-background" required />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-textSecondary">Note (Optional)</label>
              <input type="text" id="note" value={note} onChange={e => setNote(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary bg-background" placeholder="e.g., Dinner with friends" />
            </div>
          </div>
          <div className="p-6 bg-background text-right rounded-b-lg">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-secondary transition-colors">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};