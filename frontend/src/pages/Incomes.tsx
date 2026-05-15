import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Alert
} from '@mui/material';
import { Plus, Trash2, TrendingUp } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    incomeDate: new Date().toISOString().split('T')[0],
    accountId: ''
  });

  const fetchData = async () => {
    try {
      const [incRes, accRes] = await Promise.all([
        api.get('/incomes'),
        api.get('/accounts')
      ]);
      setIncomes(incRes.data.data);
      setAccounts(accRes.data);
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
        amount: parseFloat(formData.amount)
      };
      await api.post('/incomes', dataToSubmit);
      setOpen(false);
      fetchData();
      setFormData({
        amount: '',
        description: '',
        incomeDate: new Date().toISOString().split('T')[0],
        accountId: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous supprimer ce revenu ?')) {
      try {
        await api.delete(`/incomes/${id}`);
        fetchData();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center' }}>
            <TrendingUp size={32} style={{ marginRight: 12, color: '#10b981' }} />
            Mes Revenus
          </Typography>
          <Typography color="text.secondary">Gérez vos entrées d'argent et augmentez votre solde.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Plus size={20} />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 3, py: 1.2, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
        >
          Nouveau Revenu
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Source / Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Compte</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Montant</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">Aucun revenu trouvé.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              incomes.map((inc: any) => (
                <TableRow key={inc.id} hover>
                  <TableCell>{new Date(inc.incomeDate).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{inc.description || 'Sans description'}</TableCell>
                  <TableCell>{inc.account?.name}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: '#10b981' }}>
                    +{inc.amount.toLocaleString()} {user?.currency}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDelete(inc.id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Ajouter un revenu</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                label="Montant"
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
              <TextField
                fullWidth
                label="Source / Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <TextField
                select
                fullWidth
                label="Compte de destination"
                required
                value={formData.accountId}
                onChange={(e) => setFormData({...formData, accountId: e.target.value})}
              >
                {accounts.map((acc: any) => (
                  <MenuItem key={acc.id} value={acc.id}>{acc.name}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Date"
                type="date"
                required
                value={formData.incomeDate}
                onChange={(e) => setFormData({...formData, incomeDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit">Annuler</Button>
            <Button variant="contained" type="submit" sx={{ px: 4, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}>Ajouter</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
