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
    <div className="space-y-8 animate-in fade-in duration-500">
      <Box className="flex justify-between items-center">
        <Box className="flex flex-col gap-1">
          <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #1e293b, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Revenus
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Suivez vos sources de revenus
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            background: 'linear-gradient(to right, #10b981, #059669)',
            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)',
            textTransform: 'none',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
            }
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
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>Historique des revenus</Typography>
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
                    <TableRow key={income.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s' }}>
                      <TableCell sx={{ color: '#475569', fontWeight: 500 }}>{new Date(income.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell sx={{ color: '#1e293b', fontWeight: 600 }}>{income.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={categories.find(c => c.value === income.category)?.label}
                          size="small"
                          sx={{
                            backgroundColor: `${getCategoryColor(income.category)}15`,
                            color: getCategoryColor(income.category),
                            fontWeight: 600,
                            borderRadius: '8px',
                            '& .MuiChip-icon': { color: getCategoryColor(income.category) }
                          }}
                          icon={getCategoryIcon(income.category)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: '#10b981', fontWeight: 700 }}>
                          +{income.amount.toLocaleString('fr-FR')} €
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => onDeleteIncome(income.id)}
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
