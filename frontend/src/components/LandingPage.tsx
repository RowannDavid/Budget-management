import { Button, Container, Grid, Card, CardContent, Typography, Box, AppBar, Toolbar } from '@mui/material';
import {
  TrendingUp,
  BarChart,
  Security,
  Speed,
  CloudDone,
  AttachMoney,
  PieChart as PieChartIcon,
  Notifications,
  CheckCircle,
} from '@mui/icons-material';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const features = [
    {
      icon: <BarChart sx={{ fontSize: 48 }} />,
      title: 'Suivi en temps réel',
      description: 'Visualisez vos dépenses et revenus instantanément avec des graphiques interactifs',
    },
    {
      icon: <PieChartIcon sx={{ fontSize: 48 }} />,
      title: 'Analyses détaillées',
      description: 'Obtenez des insights sur vos habitudes financières et optimisez votre budget',
    },
    {
      icon: <Notifications sx={{ fontSize: 48 }} />,
      title: 'Alertes intelligentes',
      description: 'Recevez des notifications pour mieux gérer vos objectifs d\'épargne',
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Sécurité maximale',
      description: 'Vos données financières sont protégées avec un cryptage de niveau bancaire',
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: 'Interface rapide',
      description: 'Application ultra-rapide et intuitive pour une gestion sans friction',
    },
    {
      icon: <CloudDone sx={{ fontSize: 48 }} />,
      title: 'Synchronisation cloud',
      description: 'Accédez à vos données partout, sur tous vos appareils',
    },
  ];

  const benefits = [
    'Gestion simplifiée de votre budget',
    'Catégorisation automatique des dépenses',
    'Objectifs d\'épargne personnalisés',
    'Rapports mensuels détaillés',
    'Multi-devises supportées',
    'Export de données en PDF',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AppBar position="static" elevation={0} sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar className="py-2">
          <Box className="flex items-center gap-2 flex-1">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <TrendingUp className="text-white" sx={{ fontSize: 32 }} />
            </div>
            <Typography variant="h5" className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" sx={{ fontWeight: 700 }}>
              BudgetPro
            </Typography>
          </Box>
          <Button
            onClick={onLogin}
            variant="outlined"
            sx={{
              borderColor: '#2563eb',
              color: '#2563eb',
              textTransform: 'none',
              px: 4,
              borderRadius: 2,
              '&:hover': {
                borderColor: '#1d4ed8',
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
              },
            }}
          >
            Connexion
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="py-20">
        <Box className="text-center mb-16">
          <Typography
            variant="h2"
            className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            sx={{ fontWeight: 800 }}
          >
            Prenez le contrôle de vos finances
          </Typography>
          <Typography variant="h5" color="textSecondary" className="mb-8 max-w-3xl mx-auto">
            La solution intelligente pour gérer votre budget, suivre vos dépenses et atteindre vos objectifs financiers
          </Typography>
          <Box className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              sx={{
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                textTransform: 'none',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                borderRadius: 3,
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
              }}
              startIcon={<AttachMoney />}
            >
              Commencer gratuitement
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#4f46e5',
                color: '#4f46e5',
                textTransform: 'none',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                borderRadius: 3,
              }}
            >
              Voir la démo
            </Button>
          </Box>
        </Box>

        <Box className="mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-1"></div>
          <Card
            elevation={0}
            className="relative overflow-hidden"
            sx={{
              borderRadius: 6,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: 2,
            }}
          >
            <CardContent className="p-8">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h4" className="mb-4" sx={{ fontWeight: 700 }}>
                    Tout ce dont vous avez besoin pour gérer votre argent
                  </Typography>
                  <Typography variant="body1" className="mb-6 opacity-90">
                    Une plateforme complète qui vous aide à visualiser, analyser et optimiser vos finances personnelles en toute simplicité.
                  </Typography>
                  <Box className="grid grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <Box key={index} className="flex items-center gap-2">
                        <CheckCircle />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} className="text-center">
                  <Box className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
                      100%
                    </Typography>
                    <Typography variant="h6">Gratuit</Typography>
                    <Typography variant="body2" className="mt-2 opacity-75">
                      Aucun frais caché, aucune carte bancaire requise
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        <Box className="mb-12 text-center">
          <Typography variant="h3" className="mb-4" sx={{ fontWeight: 700 }}>
            Fonctionnalités puissantes
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-8">
            Tous les outils dont vous avez besoin pour une gestion financière efficace
          </Typography>
        </Box>

        <Grid container spacing={4} className="mb-20">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent className="p-6">
                  <Box
                    className="mb-4 inline-flex p-3 rounded-2xl"
                    sx={{
                      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(79, 70, 229, 0.1))',
                      color: '#2563eb',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" className="mb-2" sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className="text-center bg-white rounded-3xl p-12 shadow-lg">
          <Typography variant="h3" className="mb-4" sx={{ fontWeight: 700 }}>
            Prêt à commencer ?
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-6 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà pris le contrôle de leurs finances avec BudgetPro
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{
              background: 'linear-gradient(to right, #2563eb, #4f46e5)',
              textTransform: 'none',
              px: 8,
              py: 2.5,
              fontSize: '1.1rem',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
            }}
          >
            Créer mon compte gratuitement
          </Button>
        </Box>
      </Container>

      <Box className="bg-gray-900 text-white py-12 mt-20">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <TrendingUp className="text-white" sx={{ fontSize: 28 }} />
                </div>
                <Typography variant="h6">BudgetPro</Typography>
              </Box>
              <Typography variant="body2" className="opacity-75">
                La solution moderne pour gérer votre budget et vos finances personnelles en toute simplicité.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4">
                Produit
              </Typography>
              <Box className="space-y-2">
                <Typography variant="body2" className="opacity-75 cursor-pointer hover:opacity-100">
                  Fonctionnalités
                </Typography>
                <Typography variant="body2" className="opacity-75 cursor-pointer hover:opacity-100">
                  Tarifs
                </Typography>
                <Typography variant="body2" className="opacity-75 cursor-pointer hover:opacity-100">
                  FAQ
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4">
                Support
              </Typography>
              <Box className="space-y-2">
                <Typography variant="body2" className="opacity-75 cursor-pointer hover:opacity-100">
                  Contact
                </Typography>
                <Typography variant="body2" className="opacity-75 cursor-pointer hover:opacity-100">
                  Documentation
                </Typography>
                <Typography variant="body2" className="opacity-75 cursor-pointer hover:opacity-100">
                  Confidentialité
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box className="border-t border-gray-800 mt-8 pt-8 text-center">
            <Typography variant="body2" className="opacity-75">
              © 2026 BudgetPro. Tous droits réservés.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
