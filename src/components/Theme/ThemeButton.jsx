import React from 'react'
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from "../../context/ThemeModeProvider";


const ThemeButton = () => {

  const theme = useTheme();

  const toggleTheme = useThemeMode()


  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export default ThemeButton