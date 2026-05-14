import { Card, CardContent, Grid, Typography, Box, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown, Wallet, PieChart } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardProps {
  totalIncome: number;
  totalExpenses: number;
}

export function Dashboard({ totalIncome, totalExpenses }: DashboardProps) {
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  const monthlyData = [
    { month: 'Jan', revenus: 3200, dépenses: 2100 },
    { month: 'Fév', revenus: 3200, dépenses: 2300 },
    { month: 'Mar', revenus: 3500, dépenses: 2400 },
    { month: 'Avr', revenus: 3200, dépenses: 2200 },
    { month: 'Mai', revenus: 3800, dépenses: 2800 },
    { month: 'Juin', revenus: 3200, dépenses: 2100 },
  ];

  const categoryData = [
    { name: 'Lun', montant: 120 },
    { name: 'Mar', montant: 200 },
    { name: 'Mer', montant: 80 },
    { name: 'Jeu', montant: 150 },
    { name: 'Ven', montant: 250 },
    { name: 'Sam', montant: 180 },
    { name: 'Dim', montant: 90 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Tableau de bord</h1>
        <Typography variant="body2" color="textSecondary">
          Vue d'ensemble de vos finances
        </Typography>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="h-full" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box className="flex items-center justify-between mb-2">
                <Typography variant="body2" color="textSecondary">
                  Revenus totaux
                </Typography>
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="text-green-600" />
                </div>
              </Box>
              <Typography variant="h4" className="mb-1">
                {totalIncome.toLocaleString('fr-FR')} €
              </Typography>
              <Typography variant="body2" color="success.main">
                +12.5% ce mois
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box className="flex items-center justify-between mb-2">
                <Typography variant="body2" color="textSecondary">
                  Dépenses totales
                </Typography>
                <div className="bg-red-100 p-2 rounded-lg">
                  <TrendingDown className="text-red-600" />
                </div>
              </Box>
              <Typography variant="h4" className="mb-1">
                {totalExpenses.toLocaleString('fr-FR')} €
              </Typography>
              <Typography variant="body2" color="error.main">
                +8.2% ce mois
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box className="flex items-center justify-between mb-2">
                <Typography variant="body2" color="textSecondary">
                  Solde
                </Typography>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Wallet className="text-blue-600" />
                </div>
              </Box>
              <Typography variant="h4" className="mb-1">
                {balance.toLocaleString('fr-FR')} €
              </Typography>
              <Typography variant="body2" color="primary.main">
                Taux d'épargne: {savingsRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box className="flex items-center gap-2 mb-4">
                <PieChart className="text-blue-600" />
                <h3>Revenus vs Dépenses</h3>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
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

        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <h3 className="mb-4">Objectifs d'épargne</h3>

              <Box className="space-y-4">
                <Box>
                  <Box className="flex justify-between mb-2">
                    <Typography variant="body2">Vacances</Typography>
                    <Typography variant="body2">75%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" color="textSecondary">
                    1,500€ / 2,000€
                  </Typography>
                </Box>

                <Box>
                  <Box className="flex justify-between mb-2">
                    <Typography variant="body2">Urgences</Typography>
                    <Typography variant="body2">45%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={45} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" color="textSecondary">
                    2,250€ / 5,000€
                  </Typography>
                </Box>

                <Box>
                  <Box className="flex justify-between mb-2">
                    <Typography variant="body2">Nouvelle voiture</Typography>
                    <Typography variant="body2">30%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={30} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" color="textSecondary">
                    3,000€ / 10,000€
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <h3 className="mb-4">Tendance des dépenses (7 derniers jours)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="montant" stroke="#6366f1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
