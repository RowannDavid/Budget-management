import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Skeleton,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { TrendingUp, TrendingDown, Wallet, ArrowRight, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface DashboardData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  recentIncomes: any[];
  recentExpenses: any[];
  categoryData: { name: string; value: number }[];
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -15, 
          left: 20, 
          width: 50, 
          height: 50, 
          borderRadius: 3, 
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 20px 0 ${color}44`,
        }}
      >
        <Icon color="white" size={24} />
      </Box>
      <CardContent sx={{ pt: 5 }}>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {loading ? <Skeleton width="60%" /> : `${(value || 0).toLocaleString()} ${user?.currency || 'FCFA'}`}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
          Tableau de Bord
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenue, {user?.name} 👋 Voici l'état de vos finances.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Revenus Totaux" 
            value={data?.totalIncome} 
            icon={TrendingUp} 
            color="#10b981" 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Dépenses Totales" 
            value={data?.totalExpense} 
            icon={TrendingDown} 
            color="#ef4444" 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Solde Actuel" 
            value={data?.balance} 
            icon={Wallet} 
            color="#4f46e5" 
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Graphique de répartition */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <PieIcon size={20} style={{ marginRight: 8, color: '#4f46e5' }} />
              Répartition des Dépenses
            </Typography>
            <Box sx={{ height: 350, width: '100%' }}>
              {loading ? (
                <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 4 }} />
              ) : data?.categoryData.length === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography color="text.secondary">Aucune donnée de dépense à afficher</Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data?.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Transactions récentes combinées */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              Derniers Flux <ArrowRight size={20} style={{ marginLeft: 8 }} />
            </Typography>
            <List>
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={60} sx={{ mb: 1 }} />)
              ) : (data?.recentExpenses.length === 0 && data?.recentIncomes.length === 0) ? (
                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Aucun flux récent
                </Typography>
              ) : (
                <>
                  {data?.recentExpenses.map((exp: any) => (
                    <ListItem key={`exp-${exp.id}`} sx={{ px: 0 }}>
                      <ListItemText 
                        primary={exp.description || 'Dépense'}
                        secondary={new Date(exp.expense_date).toLocaleDateString()}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                      <Typography sx={{ fontWeight: 700, color: '#ef4444' }}>
                        -{exp.amount.toLocaleString()}
                      </Typography>
                    </ListItem>
                  ))}
                  {data?.recentIncomes.map((inc: any) => (
                    <ListItem key={`inc-${inc.id}`} sx={{ px: 0 }}>
                      <ListItemText 
                        primary={inc.description || 'Revenu'}
                        secondary={new Date(inc.incomeDate).toLocaleDateString()}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                      <Typography sx={{ fontWeight: 700, color: '#10b981' }}>
                        +{inc.amount.toLocaleString()}
                      </Typography>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
