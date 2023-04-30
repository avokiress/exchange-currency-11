import React, { useEffect, useState } from "react"

import { Box } from '@mui/material';
import Badge from '@mui/material/Badge';
import StarIcon from '@mui/icons-material/Star';

import { useFavorites } from "../../context";

import ThemeButton from "components/Theme/ThemeButton.jsx";


export const Menu = () => {
  const [favoritesState, setFavoritesState] = useState('0');
  const { addFavorites, deleteFavorites, favorites } = useFavorites();

  useEffect(() => {
    const countFavorites = favorites.length;
    setFavoritesState(countFavorites)
  }, [favorites]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <Badge color="secondary" badgeContent={favoritesState}>
        <StarIcon />
      </Badge>

      <ThemeButton />
    </Box>
  );
}