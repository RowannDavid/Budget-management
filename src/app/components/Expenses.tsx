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
} from '@mui/material';
import { Add, Delete, Edit, ShoppingCart, Restaurant, Home, DirectionsCar, HealthAndSafety, SportsEsports } from '@mui/icons-material';

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
    <div className="space-y-6">
      <Box className="flex justify-between items-center">
        <div>
          <h1>Dépenses</h1>
          <Typography variant="body2" color="textSecondary">
            Gérez vos dépenses quotidiennes
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            textTransform: 'none',
            px: 3,
            py: 1.5,
            borderRadius: 2,
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
              <Card sx={{ borderRadius: 3, borderLeft: `4px solid ${cat.color}` }}>
                <CardContent>
                  <Box className="flex items-center gap-3">
                    <div style={{ backgroundColor: `${cat.color}20`, padding: '12px', borderRadius: '12px' }}>
                      {cat.icon}
                    </div>
                    <div>
                      <Typography variant="body2" color="textSecondary">
                        {cat.label}
                      </Typography>
                      <Typography variant="h6">
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

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <h3 className="mb-4">Historique des dépenses</h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell align="right">Montant</TableCell>
                  <TableCell align="center">Actions</TableCell>
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
                    <TableRow key={expense.id}>
                      <TableCell>{new Date(expense.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={categories.find(c => c.value === expense.category)?.label}
                          size="small"
                          sx={{
                            backgroundColor: `${getCategoryColor(expense.category)}20`,
                            color: getCategoryColor(expense.category),
                          }}
                          icon={getCategoryIcon(expense.category)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="error.main">
                          -{expense.amount.toLocaleString('fr-FR')} €
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => onDeleteExpense(expense.id)}
                          color="error"
                        >
                          <Delete />
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

import Grid from '@mui/material/Grid';
