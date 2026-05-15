import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  Avatar, 
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  TrendingDown, 
  TrendingUp, 
  Target, 
  PieChart,
  LogOut,
  User
} from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navItems = [
    { label: 'Tableau de bord', path: '/', icon: LayoutDashboard },
    { label: 'Dépenses', path: '/expenses', icon: TrendingDown },
    { label: 'Revenus', path: '/incomes', icon: TrendingUp },
    { label: 'Budgets', path: '/budgets', icon: PieChart },
    { label: 'Objectifs', path: '/savings-goals', icon: Target },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        color: '#1e293b'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Box 
              sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: 2, 
                background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}
            >
              <PieChart color="white" size={24} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                display: { xs: 'none', md: 'flex' }
              }}
            >
              BudgetManager
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                startIcon={<item.icon size={18} />}
                sx={{
                  color: location.pathname === item.path ? '#4f46e5' : '#64748b',
                  backgroundColor: location.pathname === item.path ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 70, 229, 0.05)',
                  },
                  px: 2
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Paramètres">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#4f46e5',
                    width: 40,
                    height: 40,
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ px: 2, py: 1, minWidth: 150 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{user?.name}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
              </Box>
              <MenuItem onClick={() => navigate('/profile')}>
                <User size={18} style={{ marginRight: 8 }} /> Profil
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}>
                <LogOut size={18} style={{ marginRight: 8 }} /> Déconnexion
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
