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
    <Box className="h-full flex flex-col bg-white/60 backdrop-blur-xl">
      <Box className="p-6">
        <Box className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/30">
            <TrendingUp className="text-white" sx={{ fontSize: 28 }} />
          </div>
          <Typography variant="h5" sx={{ fontWeight: 800, background: 'linear-gradient(to right, #4f46e5, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BudgetPro
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary" sx={{ ml: 1, fontWeight: 500 }}>
          Gestion Premium
        </Typography>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      <List className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <ListItem
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                cursor: 'pointer',
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: isActive ? 'transparent' : 'transparent',
                backgroundImage: isActive ? 'linear-gradient(to right, rgba(79, 70, 229, 0.1), rgba(147, 51, 234, 0.05))' : 'none',
                color: isActive ? '#4f46e5' : '#64748b',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: isActive ? 'linear-gradient(to bottom, #4f46e5, #9333ea)' : 'transparent',
                  borderRadius: '0 4px 4px 0',
                },
                '&:hover': {
                  backgroundColor: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.02)',
                  transform: 'translateX(4px)',
                  color: isActive ? '#4f46e5' : '#1e293b',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: isActive ? '#4f46e5' : 'inherit', 
                minWidth: 40,
                transition: 'transform 0.3s ease',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.95rem'
                }} 
              />
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ opacity: 0.5 }} />

      <Box className="p-4">
        <Box className="flex items-center gap-3 p-3 rounded-2xl mb-3 border border-white/40 bg-white/40 shadow-sm backdrop-blur-md transition-all hover:bg-white/60">
          <Avatar sx={{ background: 'linear-gradient(135deg, #4f46e5, #9333ea)', width: 40, height: 40 }}>
            <AccountCircle />
          </Avatar>
          <div>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>Jean Dupont</Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Premium Member
            </Typography>
          </div>
        </Box>
        <ListItem
          onClick={onLogout}
          sx={{
            cursor: 'pointer',
            borderRadius: 3,
            color: '#ef4444',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              transform: 'translateX(4px)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" primaryTypographyProps={{ fontWeight: 500 }} />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box className="flex h-screen overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-purple-100/40 pointer-events-none" />
      
      {isMobile && (
        <AppBar position="fixed" sx={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', color: '#1e293b', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="flex-1" sx={{ fontWeight: 700, background: 'linear-gradient(to right, #4f46e5, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
            background: 'transparent',
            boxShadow: isMobile ? 'none' : '4px 0 24px rgba(0, 0, 0, 0.02)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        className="flex-1 overflow-auto relative z-10"
        sx={{ marginTop: isMobile ? '64px' : 0 }}
      >
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </Box>
    </Box>
  );
}
