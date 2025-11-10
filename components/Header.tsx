import React from 'react';
import { PlusCircle, LayoutDashboard, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onAddNew: () => void;
  onViewChange: (view: 'dashboard' | 'analytics') => void;
  currentView: 'dashboard' | 'analytics';
}

export const Header: React.FC<HeaderProps> = ({ onAddNew, onViewChange, currentView }) => {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">SpendSense</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-background rounded-full p-1">
             <button
              onClick={() => onViewChange('dashboard')}
              className={`p-2 rounded-full transition-colors ${currentView === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              aria-label="Dashboard View"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewChange('analytics')}
              className={`p-2 rounded-full transition-colors ${currentView === 'analytics' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              aria-label="Analytics View"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onAddNew}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-secondary transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New
          </button>
        </div>
      </div>
    </header>
  );
};
