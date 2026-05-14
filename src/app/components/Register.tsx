import { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, TrendingUp } from '@mui/icons-material';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onRegister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper elevation={3} className="w-full max-w-md p-8 rounded-2xl">
        <Box className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full mb-4">
            <TrendingUp className="text-white" sx={{ fontSize: 40 }} />
          </div>
          <h1 className="mb-2">Créer un compte</h1>
          <Typography variant="body2" color="textSecondary">
            Commencez à gérer votre budget
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />

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

          <TextField
            fullWidth
            label="Confirmer le mot de passe"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            error={confirmPassword !== '' && password !== confirmPassword}
            helperText={
              confirmPassword !== '' && password !== confirmPassword
                ? 'Les mots de passe ne correspondent pas'
                : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            className="mt-6"
            sx={{
              background: 'linear-gradient(to right, #2563eb, #4f46e5)',
              textTransform: 'none',
              py: 1.5,
              borderRadius: 2,
            }}
          >
            S'inscrire
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography variant="body2" color="textSecondary">
            Vous avez déjà un compte ?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={onSwitchToLogin}
              sx={{ cursor: 'pointer', fontWeight: 500 }}
            >
              Se connecter
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
