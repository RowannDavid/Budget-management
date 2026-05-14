import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Expenses } from './components/Expenses';
import { Income } from './components/Income';
import { Statistics } from './components/Statistics';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#4f46e5',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
});

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface Income {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      description: 'Courses au supermarché',
      amount: 85.50,
      category: 'alimentation',
      date: '2026-05-10',
    },
    {
      id: 2,
      description: 'Essence',
      amount: 60.00,
      category: 'transport',
      date: '2026-05-09',
    },
    {
      id: 3,
      description: 'Restaurant',
      amount: 45.00,
      category: 'alimentation',
      date: '2026-05-08',
    },
  ]);
  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: 1,
      description: 'Salaire mensuel',
      amount: 3200,
      category: 'salaire',
      date: '2026-05-01',
    },
    {
      id: 2,
      description: 'Projet freelance',
      amount: 600,
      category: 'freelance',
      date: '2026-05-05',
    },
  ]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLanding(true);
    setCurrentPage('dashboard');
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowRegister(true);
  };

  const handleShowLogin = () => {
    setShowLanding(false);
    setShowRegister(false);
  };

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: Math.max(0, ...expenses.map(e => e.id)) + 1,
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleAddIncome = (income: Omit<Income, 'id'>) => {
    const newIncome = {
      ...income,
      id: Math.max(0, ...incomes.map(i => i.id)) + 1,
    };
    setIncomes([...incomes, newIncome]);
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes(incomes.filter(i => i.id !== id));
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (showLanding) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleShowLogin}
        />
      </ThemeProvider>
    );
  }

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        </ThemeProvider>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setShowRegister(true)}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      >
        {currentPage === 'dashboard' && (
          <Dashboard totalIncome={totalIncome} totalExpenses={totalExpenses} />
        )}
        {currentPage === 'expenses' && (
          <Expenses
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        )}
        {currentPage === 'income' && (
          <Income
            incomes={incomes}
            onAddIncome={handleAddIncome}
            onDeleteIncome={handleDeleteIncome}
          />
        )}
        {currentPage === 'statistics' && (
          <Statistics expenses={expenses} incomes={incomes} />
        )}
      </Layout>
    </ThemeProvider>
  );
}