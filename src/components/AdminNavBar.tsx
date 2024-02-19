import React, { FC } from "react"
import {Link as RouterLink, NavLink} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AdminNavBar: FC = () => {
  return (
    <AppBar component="nav" position="static">
      <CssBaseline />
      <Toolbar>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, justifyContent: 'center'}}>

          <Button sx={{ color: '#fff' }} component={NavLink} to="/userlist">Пользователи</Button>
          <Button sx={{ color: '#fff' }} component={NavLink} to="/profsyslist">Профиль</Button>
          <Button sx={{ color: '#fff' }} component={NavLink} to="/furnsyslist">Фурнитура</Button>
          <Button sx={{ color: '#fff' }} component={NavLink} to="/glasslist">Стеклопакеты</Button>
          <Button sx={{ color: '#fff' }} component={NavLink} to="/wintypelist">Типы окон</Button>
          <Button sx={{ color: '#fff' }} component={NavLink} to="/pricelist">Цены</Button>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AdminNavBar;
