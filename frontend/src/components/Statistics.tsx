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
    <div className="space-y-8 animate-in fade-in duration-500">
      <Box className="flex flex-col gap-1">
        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #1e293b, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Statistiques
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Analyse détaillée de vos finances
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card className="hover:scale-[1.02] transition-transform duration-300" sx={{ borderLeft: '4px solid #10b981', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 opacity-0 hover:opacity-100 transition-opacity" />
            <CardContent className="relative z-10 p-5">
              <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>
                Total Revenus
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#10b981' }}>
                {totalIncome.toLocaleString('fr-FR')} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="hover:scale-[1.02] transition-transform duration-300" sx={{ borderLeft: '4px solid #ef4444', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity" />
            <CardContent className="relative z-10 p-5">
              <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>
                Total Dépenses
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#ef4444' }}>
                {totalExpense.toLocaleString('fr-FR')} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="hover:scale-[1.02] transition-transform duration-300" sx={{ borderLeft: '4px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity" />
            <CardContent className="relative z-10 p-5">
              <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>
                Solde
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: balance >= 0 ? '#10b981' : '#ef4444' }}>
                {balance.toLocaleString('fr-FR')} €
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card className="hover:scale-[1.02] transition-transform duration-300" sx={{ borderLeft: '4px solid #8b5cf6', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 opacity-0 hover:opacity-100 transition-opacity" />
            <CardContent className="relative z-10 p-5">
              <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>
                Taux d'épargne
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#4f46e5' }}>
                {savingsRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 4 }}>Répartition des dépenses</Typography>
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
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {expensePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 4 }}>Répartition des revenus</Typography>
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
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {incomePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 6 }}>Évolution mensuelle</Typography>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={monthlyComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="revenus" fill="#10b981" radius={[6, 6, 6, 6]} barSize={32} />
                  <Bar dataKey="dépenses" fill="#f43f5e" radius={[6, 6, 6, 6]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
