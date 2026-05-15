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
  Alert,
  Fab
} from '@mui/material';
import { Plus, Trash2, TrendingDown } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    payment_method: 'CASH',
    expense_date: new Date().toISOString().split('T')[0],
    categoryId: '',
    accountId: ''
  });

  const fetchData = async () => {
    try {
      const [expRes, catRes, accRes] = await Promise.all([
        api.get('/expenses'),
        api.get('/categories'),
        api.get('/accounts')
      ]);
      setExpenses(expRes.data.data);
      setCategories(catRes.data);
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
      // Conversion explicite du montant en nombre
      const dataToSubmit = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      await api.post('/expenses', dataToSubmit);
      setOpen(false);
      fetchData(); // Rafraîchir la liste
      setFormData({
        amount: '',
        description: '',
        payment_method: 'CASH',
        expense_date: new Date().toISOString().split('T')[0],
        categoryId: '',
        accountId: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous supprimer cette dépense ?')) {
      try {
        await api.delete(`/expenses/${id}`);
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
            <TrendingDown size={32} style={{ marginRight: 12, color: '#ef4444' }} />
            Mes Dépenses
          </Typography>
          <Typography color="text.secondary">Gérez vos sorties d'argent et contrôlez vos coûts.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Plus size={20} />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 3, py: 1.2 }}
        >
          Nouvelle Dépense
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Catégorie</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Compte</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Montant</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">Aucune dépense trouvée.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((exp: any) => (
                <TableRow key={exp.id} hover>
                  <TableCell>{new Date(exp.expense_date).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{exp.description || 'Sans description'}</TableCell>
                  <TableCell>{exp.category?.name}</TableCell>
                  <TableCell>{exp.account?.name}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: '#ef4444' }}>
                    -{exp.amount.toLocaleString()} {user?.currency}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDelete(exp.id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Ajout Dépense */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Ajouter une dépense</DialogTitle>
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
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
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
                select
                fullWidth
                label="Compte"
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
                value={formData.expense_date}
                onChange={(e) => setFormData({...formData, expense_date: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                fullWidth
                label="Méthode de paiement"
                required
                value={formData.payment_method}
                onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
              >
                <MenuItem value="CASH">Espèces</MenuItem>
                <MenuItem value="CARD">Carte Bancaire</MenuItem>
                <MenuItem value="TRANSFER">Virement</MenuItem>
                <MenuItem value="MOBILE">Mobile Money</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit">Annuler</Button>
            <Button variant="contained" type="submit" sx={{ px: 4 }}>Ajouter</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
