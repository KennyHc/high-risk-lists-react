import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  letterSpacing: 1,
  background: 'linear-gradient(45deg, #FFFFFF 30%, #E3F2FD 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
}));

interface NavButtonProps extends ButtonProps {
  to: string;
}

const NavButton = styled(Button)<NavButtonProps>(({ theme }) => ({
  margin: theme.spacing(0, 1),
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: 'white',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease-out',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Navbar: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Logo variant="h5">
          High Risk Lists
        </Logo>
        <Box>
          <NavButton component={Link} to="/">
            Homepage
          </NavButton>
          <NavButton component={Link} to="/create">
            Create supplier
          </NavButton>
          <NavButton component={Link} to="/table">
            Table of suppliers
          </NavButton>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;