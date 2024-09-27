import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/RecipeService";
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";
import { FavoritesSliceType } from "./favoritesSlice";

//type del state
export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

/* StateCreator es para especificar el type del slice */
/* slices anidados --> clase 337 */
/* este slice se consume en el slice de favoritesSlices --> clase 337 */
export const createRecipesSlice: StateCreator<
  RecipesSliceType & FavoritesSliceType, //esto es por consumir datos de otro slice, lo explica en clase 337
  [], //esto es por consumir datos de otro slice, lo explica en clase 337, indica que no hay parametros adicionales
  [], //esto es por consumir datos de otro slice, lo explica en clase 337, indica que no hay parametros adicionales
  RecipesSliceType
> = (set) => ({
  /* state inicial | START */
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  modal: false,
  /* state inicial | END */

  /* action para llamar la API de categorias */
  /* lo importamos en el header en un useEffect, para llenar el select de la form */
  /* el llamado va a setear a el state de categories y eso es lo que usaremos en el select */
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories, //seteamos el state con los valores de la API
    });
  },
  /* action para llamar la API de recetas */
  /* se llena con los valores del formulario */
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);
    set({
      drinks, //seteamos el state con los valores de la API
    });
  },
  /* este es para el modal con la info de la receta */
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set({
      selectedRecipe,
      modal: true,
    });
  },
  /* abrir/cerrar el modal */
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe,
    });
  },
});
