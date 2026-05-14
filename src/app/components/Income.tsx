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
  Grid,
} from '@mui/material';
import { Add, Delete, Work, TrendingUp, AccountBalance, CardGiftcard, BusinessCenter } from '@mui/icons-material';

interface Income {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const categories = [
  { value: 'salaire', label: 'Salaire', icon: <Work />, color: '#10b981' },
  { value: 'freelance', label: 'Freelance', icon: <BusinessCenter />, color: '#3b82f6' },
  { value: 'investissement', label: 'Investissement', icon: <TrendingUp />, color: '#8b5cf6' },
  { value: 'pension', label: 'Pension', icon: <AccountBalance />, color: '#f59e0b' },
  { value: 'autre', label: 'Autre', icon: <CardGiftcard />, color: '#ec4899' },
];

interface IncomeProps {
  incomes: Income[];
  onAddIncome: (income: Omit<Income, 'id'>) => void;
  onDeleteIncome: (id: number) => void;
}

export function Income({ incomes, onAddIncome, onDeleteIncome }: IncomeProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (description && amount && category && date) {
      onAddIncome({
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
    return categories.find(c => c.value === cat)?.icon || <Work />;
  };

  return (
    <div className="space-y-6">
      <Box className="flex justify-between items-center">
        <div>
          <h1>Revenus</h1>
          <Typography variant="body2" color="textSecondary">
            Suivez vos sources de revenus
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            background: 'linear-gradient(to right, #10b981, #059669)',
            textTransform: 'none',
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Ajouter un revenu
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((cat) => {
          const total = incomes
            .filter(i => i.category === cat.value)
            .reduce((sum, i) => sum + i.amount, 0);

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
          <h3 className="mb-4">Historique des revenus</h3>
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
                {incomes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography color="textSecondary">
                        Aucun revenu enregistré
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  incomes.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell>{new Date(income.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{income.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={categories.find(c => c.value === income.category)?.label}
                          size="small"
                          sx={{
                            backgroundColor: `${getCategoryColor(income.category)}20`,
                            color: getCategoryColor(income.category),
                          }}
                          icon={getCategoryIcon(income.category)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="success.main">
                          +{income.amount.toLocaleString('fr-FR')} €
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => onDeleteIncome(income.id)}
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
        <DialogTitle>Ajouter un revenu</DialogTitle>
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
