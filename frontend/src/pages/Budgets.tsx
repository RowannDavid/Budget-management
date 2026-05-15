import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  MenuItem,
  LinearProgress,
  Chip,
  Alert
} from '@mui/material';
import { Plus, PieChart, AlertTriangle, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    amount_limit: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    categoryId: ''
  });

  const fetchData = async () => {
    try {
      const [budRes, catRes] = await Promise.all([
        api.get('/budgets'),
        api.get('/categories')
      ]);
      setBudgets(budRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const dataToSubmit = {
        ...formData,
        amount_limit: parseFloat(formData.amount_limit)
      };
      await api.post('/budgets', dataToSubmit);
      setOpen(false);
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous supprimer cette limite de budget ?')) {
      try {
        await api.delete(`/budgets/${id}`);
        fetchData();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SAFE': return '#10b981';
      case 'WARNING': return '#f59e0b';
      case 'DANGER': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SAFE': return <CheckCircle size={16} />;
      case 'WARNING': return <AlertTriangle size={16} />;
      case 'DANGER': return <XCircle size={16} />;
      default: return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center' }}>
            <PieChart size={32} style={{ marginRight: 12, color: '#4f46e5' }} />
            Gestion des Budgets
          </Typography>
          <Typography color="text.secondary">Fixez des limites par catégorie pour maîtriser vos finances.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Plus size={20} />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 3, py: 1.2 }}
        >
          Définir un Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        {loading ? (
          [1, 2, 3].map(i => <Grid item xs={12} md={6} key={i}><Paper sx={{ p: 4, height: 150 }} /></Grid>)
        ) : budgets.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 10, textAlign: 'center', borderRadius: 4 }}>
              <Typography color="text.secondary">Aucun budget défini pour ce mois.</Typography>
            </Paper>
          </Grid>
        ) : (
          budgets.map((budget: any) => (
            <Grid item xs={12} md={6} key={budget.id}>
              <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{budget.category.name}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip 
                      label={budget.status} 
                      size="small" 
                      icon={getStatusIcon(budget.status)}
                      sx={{ 
                        bgcolor: `${getStatusColor(budget.status)}22`, 
                        color: getStatusColor(budget.status),
                        fontWeight: 700,
                        border: `1px solid ${getStatusColor(budget.status)}44`
                      }} 
                    />
                    <IconButton size="small" color="error" onClick={() => handleDelete(budget.id)}>
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Consommé : <strong>{budget.current_spend.toLocaleString()} {user?.currency}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Limite : <strong>{budget.amount_limit.toLocaleString()} {user?.currency}</strong>
                  </Typography>
                </Box>

                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(budget.percentage, 100)} 
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    bgcolor: '#f1f5f9',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getStatusColor(budget.status),
                    }
                  }}
                />
                
                <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'right', fontWeight: 600 }}>
                  {budget.percentage}% utilisé
                </Typography>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Définir un budget</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                select
                fullWidth
                label="Catégorie"
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              >
                {categories.map((cat: any) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Limite de dépense"
                type="number"
                required
                value={formData.amount_limit}
                onChange={(e) => setFormData({...formData, amount_limit: e.target.value})}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Mois"
                  required
                  value={formData.month}
                  onChange={(e) => setFormData({...formData, month: parseInt(e.target.value as string)})}
                >
                  {Array.from({length: 12}, (_, i) => (
                    <MenuItem key={i+1} value={i+1}>{new Date(0, i).toLocaleString('default', {month: 'long'})}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Année"
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit">Annuler</Button>
            <Button variant="contained" type="submit" sx={{ px: 4 }}>Enregistrer</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
