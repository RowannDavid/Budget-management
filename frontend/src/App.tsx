import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Expenses } from './components/Expenses';
import { Income as IncomeComponent } from './components/Income';
import { Statistics } from './components/Statistics';
import { authService } from './api/auth.service';
import { expenseService } from './api/expense.service';
import type { Expense } from './api/expense.service';
import { incomeService } from './api/income.service';
import type { Income } from './api/income.service';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5', // Indigo
      light: '#818cf8',
      dark: '#3730a3',
    },
    secondary: {
      main: '#9333ea', // Purple
      light: '#c084fc',
      dark: '#7e22ce',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 24px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,1), rgba(255,255,255,0.9))',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

export default function App() {
  const [showLanding, setShowLanding] = useState(!authService.isAuthenticated());
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [fetchedExpenses, fetchedIncomes] = await Promise.all([
        expenseService.getAll(),
        incomeService.getAll()
      ]);
      setExpenses(fetchedExpenses);
      setIncomes(fetchedIncomes);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
      // Optionnel: Gérer la déconnexion si 401
      if ((error as any).response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setShowLanding(true);
    setCurrentPage('dashboard');
    setExpenses([]);
    setIncomes([]);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowRegister(true);
  };

  const handleShowLogin = () => {
    setShowLanding(false);
    setShowRegister(false);
  };

  const handleAddExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const newExpense = await expenseService.create(expense);
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la dépense", error);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await expenseService.delete(id);
      setExpenses(expenses.filter(e => e.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la dépense", error);
    }
  };

  const handleAddIncome = async (income: Omit<Income, 'id'>) => {
    try {
      const newIncome = await incomeService.create(income);
      setIncomes([...incomes, newIncome]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du revenu", error);
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await incomeService.delete(id);
      setIncomes(incomes.filter(i => i.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du revenu", error);
    }
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
          <IncomeComponent
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