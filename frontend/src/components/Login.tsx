import { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Link, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, TrendingUp } from '@mui/icons-material';
import { authService } from '../api/auth.service';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        onLogin();
      } else {
        setError(result.message || 'Identifiants invalides');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper elevation={3} className="w-full max-w-md p-8 rounded-2xl">
        <Box className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full mb-4">
            <TrendingUp className="text-white" sx={{ fontSize: 40 }} />
          </div>
          <h1 className="mb-2">BudgetPro</h1>
          <Typography variant="body2" color="textSecondary">
            Gérez votre budget intelligemment
          </Typography>
        </Box>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            className="mt-6"
            sx={{
              background: 'linear-gradient(to right, #2563eb, #4f46e5)',
              textTransform: 'none',
              py: 1.5,
              borderRadius: 2,
            }}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography variant="body2" color="textSecondary">
            Pas encore de compte ?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={onSwitchToRegister}
              sx={{ cursor: 'pointer', fontWeight: 500 }}
            >
              S'inscrire
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
