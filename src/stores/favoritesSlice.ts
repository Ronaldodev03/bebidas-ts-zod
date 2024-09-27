import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import {
  NotificationSliceType,
  createNotificationSlice,
} from "./notificationSlice";

//type del state
export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

/* StateCreator es para especificar el type del slice */
/* slices anidados --> clase 337 y 342*/
export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType & NotificationSliceType, //esto es por consumir datos de otro slice, lo explica en clase 337
  [], //esto es por consumir datos de otro slice, lo explica en clase 337, indica que no hay parametros adicionales
  [], //esto es por consumir datos de otro slice, lo explica en clase 337, indica que no hay parametros adicionales
  FavoritesSliceType
> = (set, get, api) => ({
  /* state inicial | START */
  favorites: [],
  /* state inicial | END */

  /* saber si la receta ya es fav o no */
  /* se llama en el componente modal */
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      /* filtrar de fav */
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      /* ***************aqui estamos consumiendo datos de otro slice --> notifications****************** */
      createNotificationSlice(set, get, api).showNotification({
        text: "Se eliminó de favoritos",
        error: false,
      });
    } else {
      /* añadir a fav */
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se agregó a favoritos",
        error: false,
      });
    }
    /* ***************aqui estamos consumiendo datos de otro slice --> recipes****************** */
    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem("favorites", JSON.stringify(get().favorites)); //setear LS cuando se hace click en btn de add/delete favorite
  },
  /* para condicionar el mensaje del btn de añadir a favs --> si ya está en favs quiero en que diga eliminar de favs */
  /* se llama en el modal */
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  /* este se manda a llamar en layout en un useEffect */
  loadFromStorage: () => {
    /* si hay algo en LS seteo el state */
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
