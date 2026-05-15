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
  LinearProgress,
  IconButton,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { Plus, Target, Trash2, Calendar, Trophy } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const SavingsGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: ''
  });

  const fetchData = async () => {
    try {
      const response = await api.get('/savings-goals');
      setGoals(response.data);
    } catch (err) {
      console.error('Error fetching goals:', err);
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
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount || '0')
      };
      await api.post('/savings-goals', dataToSubmit);
      setOpen(false);
      fetchData();
      setFormData({ title: '', targetAmount: '', currentAmount: '', deadline: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous supprimer cet objectif ?')) {
      try {
        await api.delete(`/savings-goals/${id}`);
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
            <Target size={32} style={{ marginRight: 12, color: '#9333ea' }} />
            Objectifs d'Épargne
          </Typography>
          <Typography color="text.secondary">Planifiez vos rêves et suivez votre progression.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Plus size={20} />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 3, py: 1.2, bgcolor: '#9333ea', '&:hover': { bgcolor: '#7e22ce' } }}
        >
          Nouvel Objectif
        </Button>
      </Box>

      <Grid container spacing={4}>
        {loading ? (
          [1, 2].map(i => <Grid item xs={12} md={6} key={i}><Paper sx={{ p: 4, height: 200 }} /></Grid>)
        ) : goals.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 10, textAlign: 'center', borderRadius: 4 }}>
              <Typography color="text.secondary">Vous n'avez pas encore d'objectifs d'épargne.</Typography>
            </Paper>
          </Grid>
        ) : (
          goals.map((goal: any) => (
            <Grid item xs={12} md={6} key={goal.id}>
              <Card sx={{ borderRadius: 4, position: 'relative' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>{goal.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'text.secondary' }}>
                        <Calendar size={16} style={{ marginRight: 6 }} />
                        <Typography variant="caption">
                          Échéance : {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Non définie'}
                        </Typography>
                      </Box>
                    </Box>
                    {goal.isCompleted && (
                      <Box sx={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                        <Trophy size={24} />
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Épargné</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {goal.currentAmount.toLocaleString()} {user?.currency}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">Cible</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#9333ea' }}>
                        {goal.targetAmount.toLocaleString()} {user?.currency}
                      </Typography>
                    </Box>
                  </Box>

                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(goal.progress, 100)} 
                    sx={{ 
                      height: 12, 
                      borderRadius: 6,
                      bgcolor: '#f1f5f9',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: goal.isCompleted ? '#10b981' : '#9333ea',
                      }
                    }}
                  />
                  
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{goal.progress}%</Typography>
                    <IconButton size="small" color="error" onClick={() => handleDelete(goal.id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Nouvel Objectif d'Épargne</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                label="Titre de l'objectif"
                placeholder="ex: Voyage au Japon"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Montant Cible"
                  type="number"
                  required
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                />
                <TextField
                  fullWidth
                  label="Montant Déjà Épargné"
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) => setFormData({...formData, currentAmount: e.target.value})}
                />
              </Box>
              <TextField
                fullWidth
                label="Date limite"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit">Annuler</Button>
            <Button variant="contained" type="submit" sx={{ px: 4, bgcolor: '#9333ea', '&:hover': { bgcolor: '#7e22ce' } }}>Créer l'objectif</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
