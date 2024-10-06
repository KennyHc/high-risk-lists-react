import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Security, Business, Assessment } from '@mui/icons-material';
import { useSpring, animated, config } from 'react-spring';
import { useState } from 'react';

const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFFFFF 0%, #E3F2FD 50%, #BBDEFB 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  overflow: 'hidden',
}));

const HeroSection = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  padding: theme.spacing(8, 4),
  textAlign: 'center',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  position: 'relative',
}));

// Create animated versions of Material-UI components
const AnimatedBox = animated(Box);

const FloatingElement = styled(AnimatedBox)(({ theme }) => ({
  position: 'absolute',
  opacity: 0.1,
  zIndex: 0,
}));

const AnimatedFeatureCard = animated(styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    cursor: 'pointer',
  })));
  

const Home: React.FC = () => {

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.molasses,
  });

  const cardSprings = [
    useSpring({
      transform: hoveredCard === 0 ? 'scale(1.05)' : 'scale(1)',
      boxShadow: hoveredCard === 0
        ? '0 10px 20px rgba(0,0,0,0.2)'
        : '0 3px 6px rgba(0,0,0,0.1)',
      config: config.wobbly,
    }),
    useSpring({
      transform: hoveredCard === 1 ? 'scale(1.05)' : 'scale(1)',
      boxShadow: hoveredCard === 1
        ? '0 10px 20px rgba(0,0,0,0.2)'
        : '0 3px 6px rgba(0,0,0,0.1)',
      config: config.wobbly,
    }),
    useSpring({
      transform: hoveredCard === 2 ? 'scale(1.05)' : 'scale(1)',
      boxShadow: hoveredCard === 2
        ? '0 10px 20px rgba(0,0,0,0.2)'
        : '0 3px 6px rgba(0,0,0,0.1)',
      config: config.wobbly,
    }),
  ];

  const cardAnimations = [
    useSpring({ from: { opacity: 0, transform: 'translateY(50px)' }, to: { opacity: 1, transform: 'translateY(0)' }, delay: 300 }),
    useSpring({ from: { opacity: 0, transform: 'translateY(50px)' }, to: { opacity: 1, transform: 'translateY(0)' }, delay: 600 }),
    useSpring({ from: { opacity: 0, transform: 'translateY(50px)' }, to: { opacity: 1, transform: 'translateY(0)' }, delay: 900 }),
  ];

  const float1 = useSpring({
    from: { transform: 'translate(0px, 0px)' },
    to: async (next) => {
      while (1) {
        await next({ transform: 'translate(10px, -10px)' });
        await next({ transform: 'translate(-10px, 10px)' });
      }
    },
    config: { duration: 3000 },
  });

  const float2 = useSpring({
    from: { transform: 'translate(0px, 0px)' },
    to: async (next) => {
      while (1) {
        await next({ transform: 'translate(-15px, 15px)' });
        await next({ transform: 'translate(15px, -15px)' });
      }
    },
    config: { duration: 4000 },
  });

  return (
    <GradientBackground>
      <Container>
        <animated.div style={fadeIn}>
          <HeroSection elevation={3}>
            <Typography variant="h2" component="h1" gutterBottom>
              Protect Your Business from Potentially Fraudulent Suppliers
            </Typography>
            <Typography variant="h5" paragraph>
              Our advanced risk assessment tools help you avoid interactions with potentially fraudulent suppliers by cross comparing their identities on multiple high-risk lists.
            </Typography>
            <FloatingElement style={float1}>
              <Security style={{ fontSize: 150 }} />
            </FloatingElement>
            <FloatingElement style={float2} sx={{ top: '60%', left: '80%' }}>
              <Business style={{ fontSize: 100 }} />
            </FloatingElement>
          </HeroSection>
        </animated.div>

        <Grid container spacing={4}>
          {[Security, Business, Assessment].map((Icon, index) => (
            <Grid item xs={12} md={4} key={index}>
              <AnimatedFeatureCard 
                style={{
                  ...cardAnimations[index],
                  ...cardSprings[index],
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Icon style={{ fontSize: 60, color: '#2196F3', marginBottom: '16px' }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  {['Comprehensive Screening', 'Supplier Management', 'Risk Analytics'][index]}
                </Typography>
                <Typography>
                  {[
                    'Our advanced algorithms thoroughly vet potential suppliers, identifying red flags and potential risks.',
                    'Easily manage and monitor your supplier database, keeping track of risk levels and supplier data.',
                    'Get detailed risk assessments and analytics to make informed decisions about your supply chain.'
                  ][index]}
                </Typography>
              </AnimatedFeatureCard>
            </Grid>
          ))}
        </Grid>

        <Box mt={8} textAlign="center">
          <animated.div style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1200 })}>
            <Button variant="contained" color="primary" size="large">
              Start Your Free Trial
            </Button>
          </animated.div>
        </Box>
      </Container>
    </GradientBackground>
  );
};

export default Home;