import React, { useState, useCallback } from 'react';
import { Transaction } from '../types';
import { getExpenseAnalysis } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface GeminiInsightsProps {
  transactions: Transaction[];
}

export const GeminiInsights: React.FC<GeminiInsightsProps> = ({ transactions }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const handleGetInsights = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');
    try {
      const result = await getExpenseAnalysis(transactions);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to get insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [transactions]);
  
  // Fix: Replaced the simple markdown renderer with a more robust line-by-line parser.
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const processedLines = [];
    let inList = false;
    for (const line of lines) {
      if (line.startsWith('* ')) {
        if (!inList) {
          processedLines.push('<ul class="list-disc ml-5 space-y-1">');
          inList = true;
        }
        processedLines.push(`<li>${line.substring(2)}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (line.startsWith('### ')) {
          processedLines.push(`<h3 class="text-lg font-semibold mt-4 mb-2">${line.substring(4)}</h3>`);
        } else if (line.startsWith('## ')) {
          processedLines.push(`<h2 class="text-xl font-bold mt-4 mb-2">${line.substring(3)}</h2>`);
        } else if (line.startsWith('# ')) {
          processedLines.push(`<h1 class="text-2xl font-bold mt-4 mb-2">${line.substring(2)}</h1>`);
        } else if (line.trim()) {
           processedLines.push(`<p>${line}</p>`);
        }
      }
    }
    if (inList) {
      processedLines.push('</ul>');
    }
    return processedLines.join('');
  };

  return (
    <div className="mt-8 bg-card p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-textPrimary flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-accent" />
          AI-Powered Insights
        </h2>
        <button
          onClick={handleGetInsights}
          disabled={isLoading}
          className="bg-accent text-primary font-bold px-4 py-2 rounded-lg shadow hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 mr-2" />
          )}
          {isLoading ? 'Analyzing...' : 'Get Smart Insights'}
        </button>
      </div>
      {analysis && (
        <div className="mt-4 prose max-w-none text-textSecondary" dangerouslySetInnerHTML={{ __html: renderMarkdown(analysis) }}>
        </div>
      )}
      {error && <p className="mt-4 text-danger">{error}</p>}
       {!analysis && !isLoading && <p className="mt-4 text-textSecondary">Click the button to get a personalized analysis of your spending habits.</p>}
    </div>
  );
};
