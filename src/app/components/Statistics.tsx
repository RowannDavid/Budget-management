import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

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

interface StatisticsProps {
  expenses: Expense[];
  incomes: Income[];
}

const EXPENSE_COLORS = {
  alimentation: '#f59e0b',
  transport: '#3b82f6',
  logement: '#8b5cf6',
  santé: '#10b981',
  loisirs: '#ec4899',
  shopping: '#ef4444',
};

const INCOME_COLORS = {
  salaire: '#10b981',
  freelance: '#3b82f6',
  investissement: '#8b5cf6',
  pension: '#f59e0b',
  autre: '#ec4899',
};

export function Statistics({ expenses, incomes }: StatisticsProps) {
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const incomesByCategory = incomes.reduce((acc, income) => {
    if (!acc[income.category]) {
      acc[income.category] = 0;
    }
    acc[income.category] += income.amount;
    return acc;
  }, {} as Record<string, number>);

  const expensePieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: EXPENSE_COLORS[name as keyof typeof EXPENSE_COLORS] || '#6b7280',
  }));

  const incomePieData = Object.entries(incomesByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: INCOME_COLORS[name as keyof typeof INCOME_COLORS] || '#6b7280',
  }));

  const monthlyComparison = [
    { month: 'Jan', revenus: 3200, dépenses: 2100 },
    { month: 'Fév', revenus: 3200, dépenses: 2300 },
    { month: 'Mar', revenus: 3500, dépenses: 2400 },
    { month: 'Avr', revenus: 3200, dépenses: 2200 },
    { month: 'Mai', revenus: 3800, dépenses: 2800 },
    { month: 'Juin', revenus: 3200, dépenses: 2100 },
  ];

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1>Statistiques</h1>
        <Typography variant="body2" color="textSecondary">
          Analyse détaillée de vos finances
        </Typography>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, borderLeft: '4px solid #10b981' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Total Revenus
              </Typography>
              <Typography variant="h5" color="success.main">
                {totalIncome.toLocaleString('fr-FR')} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, borderLeft: '4px solid #ef4444' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Total Dépenses
              </Typography>
              <Typography variant="h5" color="error.main">
                {totalExpense.toLocaleString('fr-FR')} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, borderLeft: '4px solid #3b82f6' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Solde
              </Typography>
              <Typography variant="h5" color={balance >= 0 ? 'success.main' : 'error.main'}>
                {balance.toLocaleString('fr-FR')} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, borderLeft: '4px solid #8b5cf6' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Taux d'épargne
              </Typography>
              <Typography variant="h5" color="primary.main">
                {savingsRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <h3 className="mb-4">Répartition des dépenses</h3>
              {expensePieData.length === 0 ? (
                <Box className="flex items-center justify-center h-80">
                  <Typography color="textSecondary">
                    Aucune donnée disponible
                  </Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={expensePieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expensePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <h3 className="mb-4">Répartition des revenus</h3>
              {incomePieData.length === 0 ? (
                <Box className="flex items-center justify-center h-80">
                  <Typography color="textSecondary">
                    Aucune donnée disponible
                  </Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={incomePieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {incomePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <h3 className="mb-4">Évolution mensuelle</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenus" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="dépenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
