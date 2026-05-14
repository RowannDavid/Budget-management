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
    <div className="space-y-8 animate-in fade-in duration-500">
      <Box className="flex flex-col gap-1">
        <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #1e293b, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Tableau de bord
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Vue d'ensemble de vos finances personnelles
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="h-full relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="relative z-10 p-6">
              <Box className="flex items-center justify-between mb-4">
                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Revenus totaux
                </Typography>
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/30">
                  <TrendingUp className="text-white" />
                </div>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                {totalIncome.toLocaleString('fr-FR')} €
              </Typography>
              <Box className="flex items-center gap-1 mt-2">
                <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">
                  +12.5%
                </div>
                <Typography variant="caption" sx={{ color: '#64748b' }}>ce mois</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="relative z-10 p-6">
              <Box className="flex items-center justify-between mb-4">
                <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Dépenses totales
                </Typography>
                <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-2.5 rounded-2xl shadow-lg shadow-rose-500/30">
                  <TrendingDown className="text-white" />
                </div>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                {totalExpenses.toLocaleString('fr-FR')} €
              </Typography>
              <Box className="flex items-center gap-1 mt-2">
                <div className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs font-bold">
                  +8.2%
                </div>
                <Typography variant="caption" sx={{ color: '#64748b' }}>ce mois</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300" sx={{ background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)', color: 'white', border: 'none' }}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30" />
            <CardContent className="relative z-10 p-6">
              <Box className="flex items-center justify-between mb-4">
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Solde actuel
                </Typography>
                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                  <Wallet className="text-white" />
                </div>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                {balance.toLocaleString('fr-FR')} €
              </Typography>
              <Box className="flex items-center gap-2 mt-2">
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                  Taux d'épargne:
                </Typography>
                <div className="bg-white text-indigo-600 px-2.5 py-0.5 rounded-full text-sm font-bold shadow-sm">
                  {savingsRate}%
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent className="p-6">
              <Box className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-50 p-2 rounded-xl">
                  <PieChart className="text-indigo-600" />
                </div>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Revenus vs Dépenses</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="revenus" fill="#10b981" radius={[6, 6, 6, 6]} barSize={24} />
                  <Bar dataKey="dépenses" fill="#f43f5e" radius={[6, 6, 6, 6]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent className="p-6">
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 4 }}>Objectifs d'épargne</Typography>

              <Box className="space-y-6">
                <Box className="group">
                  <Box className="flex justify-between mb-2">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#334155' }}>Vacances au Japon</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#10b981' }}>75%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 10, borderRadius: 5, backgroundColor: '#f1f5f9', '& .MuiLinearProgress-bar': { background: 'linear-gradient(to right, #34d399, #10b981)', borderRadius: 5 } }} />
                  <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block' }}>
                    1,500€ / 2,000€
                  </Typography>
                </Box>

                <Box className="group">
                  <Box className="flex justify-between mb-2">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#334155' }}>Fonds d'Urgence</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b' }}>45%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={45} sx={{ height: 10, borderRadius: 5, backgroundColor: '#f1f5f9', '& .MuiLinearProgress-bar': { background: 'linear-gradient(to right, #fbbf24, #f59e0b)', borderRadius: 5 } }} />
                  <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block' }}>
                    2,250€ / 5,000€
                  </Typography>
                </Box>

                <Box className="group">
                  <Box className="flex justify-between mb-2">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#334155' }}>Nouvelle Voiture</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3b82f6' }}>30%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={30} sx={{ height: 10, borderRadius: 5, backgroundColor: '#f1f5f9', '& .MuiLinearProgress-bar': { background: 'linear-gradient(to right, #60a5fa, #3b82f6)', borderRadius: 5 } }} />
                  <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block' }}>
                    3,000€ / 10,000€
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent className="p-6">
              <Box className="flex items-center gap-3 mb-6">
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Tendance des dépenses (7 derniers jours)</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="montant" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
