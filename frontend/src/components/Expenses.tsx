import { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Box,
  Typography,
  Grid
} from '@mui/material';
import { Add, Delete, ShoppingCart, Restaurant, Home, DirectionsCar, HealthAndSafety, SportsEsports } from '@mui/icons-material';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const categories = [
  { value: 'alimentation', label: 'Alimentation', icon: <Restaurant />, color: '#f59e0b' },
  { value: 'transport', label: 'Transport', icon: <DirectionsCar />, color: '#3b82f6' },
  { value: 'logement', label: 'Logement', icon: <Home />, color: '#8b5cf6' },
  { value: 'santé', label: 'Santé', icon: <HealthAndSafety />, color: '#10b981' },
  { value: 'loisirs', label: 'Loisirs', icon: <SportsEsports />, color: '#ec4899' },
  { value: 'shopping', label: 'Shopping', icon: <ShoppingCart />, color: '#ef4444' },
];

interface ExpensesProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onDeleteExpense: (id: number) => void;
}

export function Expenses({ expenses, onAddExpense, onDeleteExpense }: ExpensesProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (description && amount && category && date) {
      onAddExpense({
        description,
        amount: parseFloat(amount),
        category,
        date,
      });
      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
      setOpen(false);
    }
  };

  const getCategoryColor = (cat: string) => {
    return categories.find(c => c.value === cat)?.color || '#6b7280';
  };

  const getCategoryIcon = (cat: string) => {
    return categories.find(c => c.value === cat)?.icon || <ShoppingCart />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Box className="flex justify-between items-center">
        <Box className="flex flex-col gap-1">
          <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #1e293b, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Dépenses
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Gérez vos dépenses quotidiennes
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            background: 'linear-gradient(to right, #4f46e5, #9333ea)',
            boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)',
            textTransform: 'none',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)',
            }
          }}
        >
          Ajouter une dépense
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((cat) => {
          const total = expenses
            .filter(e => e.category === cat.value)
            .reduce((sum, e) => sum + e.amount, 0);

          return (
            <Grid item xs={12} sm={6} md={4} key={cat.value}>
              <Card className="hover:scale-[1.02] transition-transform duration-300" sx={{ borderLeft: `4px solid ${cat.color}`, position: 'relative', overflow: 'hidden' }}>
                <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity" style={{ backgroundColor: cat.color }} />
                <CardContent className="p-6 relative z-10">
                  <Box className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl shadow-sm" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                      {cat.icon}
                    </div>
                    <div>
                      <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {cat.label}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', mt: 0.5 }}>
                        {total.toLocaleString('fr-FR')} €
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card>
        <CardContent className="p-0">
          <Box className="p-6 border-b border-gray-100">
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Historique des dépenses</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>Catégorie</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#64748b' }}>Montant</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#64748b' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography color="textSecondary">
                        Aucune dépense enregistrée
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  expenses.map((expense) => (
                    <TableRow key={expense.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s' }}>
                      <TableCell sx={{ color: '#475569', fontWeight: 500 }}>{new Date(expense.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell sx={{ color: '#1e293b', fontWeight: 600 }}>{expense.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={categories.find(c => c.value === expense.category)?.label}
                          size="small"
                          sx={{
                            backgroundColor: `${getCategoryColor(expense.category)}15`,
                            color: getCategoryColor(expense.category),
                            fontWeight: 600,
                            borderRadius: '8px',
                            '& .MuiChip-icon': { color: getCategoryColor(expense.category) }
                          }}
                          icon={getCategoryIcon(expense.category)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: '#ef4444', fontWeight: 700 }}>
                          -{expense.amount.toLocaleString('fr-FR')} €
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => onDeleteExpense(expense.id)}
                          sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fee2e2', transform: 'scale(1.1)' }, transition: 'all 0.2s' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter une dépense</DialogTitle>
        <DialogContent>
          <Box className="space-y-4 pt-2">
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Montant"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              InputProps={{
                endAdornment: <Typography>€</Typography>,
              }}
            />
            <TextField
              fullWidth
              select
              label="Catégorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  <Box className="flex items-center gap-2">
                    {cat.icon}
                    {cat.label}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
