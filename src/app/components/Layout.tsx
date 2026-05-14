import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  TrendingDown,
  TrendingUp,
  BarChart,
  Logout,
  AccountCircle,
} from '@mui/icons-material';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Layout({ children, currentPage, onNavigate, onLogout }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <DashboardIcon /> },
    { id: 'expenses', label: 'Dépenses', icon: <TrendingDown /> },
    { id: 'income', label: 'Revenus', icon: <TrendingUp /> },
    { id: 'statistics', label: 'Statistiques', icon: <BarChart /> },
  ];

  const drawerContent = (
    <Box className="h-full flex flex-col">
      <Box className="p-6">
        <Box className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
            <TrendingUp className="text-white" sx={{ fontSize: 28 }} />
          </div>
          <Typography variant="h6">BudgetPro</Typography>
        </Box>
        <Typography variant="caption" color="textSecondary">
          Gestion de budget
        </Typography>
      </Box>

      <Divider />

      <List className="flex-1 px-3">
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              mb: 1,
              backgroundColor: currentPage === item.id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
              color: currentPage === item.id ? '#2563eb' : 'inherit',
              '&:hover': {
                backgroundColor: currentPage === item.id ? 'rgba(37, 99, 235, 0.15)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ color: currentPage === item.id ? '#2563eb' : 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box className="p-4">
        <Box className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-3">
          <Avatar sx={{ bgcolor: '#2563eb' }}>
            <AccountCircle />
          </Avatar>
          <div>
            <Typography variant="body2">Jean Dupont</Typography>
            <Typography variant="caption" color="textSecondary">
              jean.dupont@email.com
            </Typography>
          </div>
        </Box>
        <ListItem
          onClick={onLogout}
          sx={{
            cursor: 'pointer',
            borderRadius: 2,
            color: '#ef4444',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box className="flex h-screen">
      {isMobile && (
        <AppBar position="fixed" sx={{ background: 'linear-gradient(to right, #2563eb, #4f46e5)' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="flex-1">
              BudgetPro
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            border: 'none',
            boxShadow: isMobile ? 'none' : '0 0 20px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        className="flex-1 overflow-auto bg-gray-50"
        sx={{ marginTop: isMobile ? '64px' : 0 }}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </Box>
    </Box>
  );
}
