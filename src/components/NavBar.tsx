import React, { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import CalculateIcon from '@mui/icons-material/Calculate';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../hooks/useAuth";
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


// import { useValue } from '../context/ContextProvider';
// import UserIcons from './user/UserIcons';
// import Sidebar from './sidebar/Sidebar';

const NavBar = () => {
  const isAuth: boolean = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('Выход из системы!');

    navigate('/');
  }

  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setIsOpen(true)}
              >
                <Menu />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              WinTecs Калькулятор
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
             
            </Typography>

            {
              (
                isAuth && (
                  <IconButton 
                    size="large" 
                    color="inherit"                     
                    component={Link} 
                    to="/calculator"
                  >
                    <CalculateIcon />
                  </IconButton>
                )
              )
            }

            {
              (
                isAuth && (
                  <IconButton 
                    size="large" 
                    color="inherit"                     
                    component={Link} 
                    to="/settings"
                  >
                    <SettingsIcon />
                  </IconButton>
                )
              )
            }
            
            {
              (
                isAuth ? (
                  <IconButton size="large" edge="end" aria-label="account of current user"
                    // aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={logoutHandler}
                    color="inherit"
                  >
                    <LogoutIcon />
                  </IconButton>
                ) : (
                  <IconButton size="large" edge="end" aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    component={Link} 
                    to="/auth"
                  >
                    <LoginIcon />
                  </IconButton>
                )
              )
            }
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      {/* <Sidebar {...{ isOpen, setIsOpen }} /> */}
    </>
  );
};

export default NavBar;

