import { createContext, useContext, useState } from "react";

type FavoritesContextType = {
  addFavorites: (favorites: array) => void,
  deleteFavorites: (favorites: array) => void,
  favorites: array,
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const useFavorites = () => {
  const contextValue = useContext(FavoritesContext);
  if (!contextValue) {
    throw Error("Context has not been Provided!");
  }
  return contextValue;
};

type Props = {
  children?: React.ReactNode;
}

export default function FavoritesProvider({ children }: Props) {
  const [favorites, setFavorites] = useState([]);

  const addFavorites = function (__favorites: array) {
    setFavorites([...favorites, __favorites]);
  }

  const deleteFavorites = function (__favorite: array) {
    const newFavorites = favorites.filter(f => f.join() !== __favorite.join())
    setFavorites(newFavorites);
  }

  const value = {
    addFavorites,
    deleteFavorites,
    favorites,
  }

  return (<FavoritesContext.Provider value={value} >{children}</FavoritesContext.Provider>);
}