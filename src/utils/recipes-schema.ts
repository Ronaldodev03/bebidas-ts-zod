import { z } from "zod"; //para los schemas

/* schema de categories que vienen de la API */
export const CategoriesAPIResponseSchema = z.object({
  drinks: z.array(
    z.object({
      strCategory: z.string(),
    })
  ),
});

/* schema para el filtro del folmulario */
export const SearchFilterSchema = z.object({
  ingredient: z.string(),
  category: z.string(),
});

/* schema para las bebidas que vienen de la API --> un objeto */
export const DrinkAPIResponse = z.object({
  idDrink: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
});

/* schema para las bebidas que vienen de la API --> un array */
export const DrinksAPIResponse = z.object({
  drinks: z.array(DrinkAPIResponse),
});

/* schema para las recetas que vienen de la API --> un objeto */
export const RecipeAPIResponseSchema = z.object({
  idDrink: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
  strInstructions: z.string(),
  strIngredient1: z.string().nullable(),
  strIngredient2: z.string().nullable(),
  strIngredient3: z.string().nullable(),
  strIngredient4: z.string().nullable(),
  strIngredient5: z.string().nullable(),
  strIngredient6: z.string().nullable(),
  strMeasure1: z.string().nullable(),
  strMeasure2: z.string().nullable(),
  strMeasure3: z.string().nullable(),
  strMeasure4: z.string().nullable(),
  strMeasure5: z.string().nullable(),
  strMeasure6: z.string().nullable(),
});
