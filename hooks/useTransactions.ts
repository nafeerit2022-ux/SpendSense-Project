
import { useState, useEffect, useCallback } from 'react';
import { Transaction, Budget, Category, TransactionType } from '../types';

const defaultTransactions: Transaction[] = [
    { id: '1', type: TransactionType.INCOME, amount: 2500, category: Category.SALARY, date: new Date(new Date().setDate(1)).toISOString().split('T')[0] },
    { id: '2', type: TransactionType.EXPENSE, amount: 50.75, category: Category.FOOD, date: new Date(new Date().setDate(2)).toISOString().split('T')[0], note: 'Groceries' },
    { id: '3', type: TransactionType.EXPENSE, amount: 22.50, category: Category.TRAVEL, date: new Date(new Date().setDate(3)).toISOString().split('T')[0], note: 'Metro pass' },
    { id: '4', type: TransactionType.EXPENSE, amount: 120.00, category: Category.SHOPPING, date: new Date(new Date().setDate(5)).toISOString().split('T')[0], note: 'New shoes' },
    { id: '5', type: TransactionType.EXPENSE, amount: 800, category: Category.RENT, date: new Date(new Date().setDate(1)).toISOString().split('T')[0] },
];

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const storedTransactions = window.localStorage.getItem('transactions');
      return storedTransactions ? JSON.parse(storedTransactions) : defaultTransactions;
    } catch (error) {
      console.error('Error reading transactions from localStorage', error);
      return defaultTransactions;
    }
  });

  const [budget, setBudgetState] = useState<Budget>(() => {
    try {
      const storedBudget = window.localStorage.getItem('budget');
      return storedBudget ? JSON.parse(storedBudget) : { amount: 2000 };
    } catch (error) {
      console.error('Error reading budget from localStorage', error);
      return { amount: 2000 };
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error writing transactions to localStorage', error);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      window.localStorage.setItem('budget', JSON.stringify(budget));
    } catch (error) {
      console.error('Error writing budget to localStorage', error);
    }
  }, [budget]);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions(prev => {
        const existing = prev.find(t => t.id === transaction.id);
        if (existing) {
            return prev.map(t => t.id === transaction.id ? transaction : t);
        }
        return [...prev, transaction];
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const setBudget = useCallback((newBudget: Budget) => {
    setBudgetState(newBudget);
  }, []);

  return { transactions, addTransaction, deleteTransaction, budget, setBudget };
};
