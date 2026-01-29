import { useState, useCallback } from 'react';
import { AddExpenseForm } from './AddExpenseForm';
import { Plus, History, TrendingUp, Trash2 } from 'lucide-react';
  
const ExpensesTracker = () => {
  const [expenses, setExpenses] = useState([]);  // State to store all expenses 
  const [currentView, setCurrentView] = useState('main');   // State to manage view 
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    date: '',
    time: '',
    description: ''
  });

  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare'];
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, 
      [name]: value 
    }));
  }, []);

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
    }
  };

  const handleSubmit = () => {
    if (formData.category && formData.amount && formData.date && formData.time) {
      const newExpense = {
        id: Date.now(), 
        amount: parseFloat(formData.amount), 
        category: formData.category,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        timestamp: new Date(`${formData.date}T${formData.time}`)
      };
      
      setExpenses(prev => [...prev, newExpense]);
      setFormData({
        amount: '',
        category: 'Food',
        date: '',
        time: '',
        description: ''
      });
      setCurrentView('main');
    }
  };

  const getTotalByCategory = () => {
    return categories.reduce((acc, category) => {
      const total = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      acc[category] = total;
      return acc;
    }, {});
  };

  const getTotalAmount = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateStr, timeStr) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCancel = () => {
    setCurrentView('main');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const MainDashboard = () => {
    const totalsByCategory = getTotalByCategory();
    const totalAmount = getTotalAmount();

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <div key={category} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-white mb-2">{category}</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalsByCategory[category])}</p>
              <p className="text-sm text-white mt-1">
                {expenses.filter(e => e.category === category).length} expenses
                {console.log(category)}
                
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleViewChange('add')}
            className="flex items-center gap-2 dark:bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Add Expense
          </button>
          <button
            onClick={() => handleViewChange('history')}
            className="flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            <History size={20} />
            View History
          </button>
        </div>
      </div>
    );
  };

  const HistoryView = () => {
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Expense History</h2>
          <button
            onClick={() => handleViewChange('main')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
        {sortedExpenses.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No expenses recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedExpenses.map(expense => (
              <div key={expense.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {expense.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(expense.date, expense.time)}
                      </span>
                    </div>
                    {expense.description && (
                      <p className="text-gray-700 mb-2">{expense.description}</p>
                    )}
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(expense.amount)}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Expenses Tracker</h1>
          <p className="text-gray-600">Keep track of your spending and manage your budget</p>
        </header>
        {currentView === 'main' && <MainDashboard />}
        {currentView === 'add' && (
          // Passing necessary props to AddExpenseForm to maintain functionality
          <AddExpenseForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            categories={categories}
          />
        )}
        {currentView === 'history' && <HistoryView />}
      </div>
    </div>
  );
};

export default ExpensesTracker;