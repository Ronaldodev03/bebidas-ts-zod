import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";

/* esto ira a la action del slice de recipesSlice */
export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  /* destructuring de la data */
  const { data } = await axios(url); //llamado con AXIOS (no necesito hacer el data.json() afterwards)
  const result = CategoriesAPIResponseSchema.safeParse(data); //validacion con ZOD
  /* si para la validacion entonces retorno el resultado */
  if (result.success) {
    return result.data;
  }
}

/* obtener recetas dependiendo del select y del ingrediente */
export async function getRecipes(filters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
  const { data } = await axios(url);
  const result = DrinksAPIResponse.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

/* para el modal */
export async function getRecipeById(id: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(url);
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
  if (result.success) {
    return result.data;
  }
}
