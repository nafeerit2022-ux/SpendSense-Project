import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { TransactionFormModal } from './components/TransactionFormModal';
import { useTransactions } from './hooks/useTransactions';
import { Transaction } from './types';

type View = 'dashboard' | 'analytics';

function App() {
  const { transactions, addTransaction, deleteTransaction, budget, setBudget } = useTransactions();
  const [view, setView] = useState<View>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleOpenModal = (transaction: Transaction | null = null) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSaveTransaction = (transaction: Transaction) => {
    addTransaction(transaction);
    handleCloseModal();
  };
  
  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
  }

  return (
    <div className="bg-background min-h-screen font-sans text-textPrimary">
      <Header onAddNew={() => handleOpenModal()} onViewChange={setView} currentView={view} />
      <main className="container mx-auto p-4 md:p-8">
        {view === 'dashboard' ? (
          <Dashboard
            transactions={transactions}
            budget={budget}
            onEditTransaction={handleOpenModal}
            onDeleteTransaction={handleDeleteTransaction}
            setBudget={setBudget}
          />
        ) : (
          <Analytics transactions={transactions} />
        )}
      </main>
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
}

export default App;
