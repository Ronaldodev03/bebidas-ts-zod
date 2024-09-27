import { create } from "zustand"; //crear stores
import { devtools } from "zustand/middleware"; //para poder ver el state en devtools en el browser

/* slice 01 */
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";

/* slice 02 */
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";

/* slice 03 */
import {
  NotificationSliceType,
  createNotificationSlice,
} from "./notificationSlice";

/* Hook para crear store */
/* ...a --> crea una copia de todos los argumentos (set, get, api) */
/* Con un generic le colocamos el type al "create" */
export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a), //uso "..." para crear una copia
    ...createFavoritesSlice(...a), //uso "..." para crear una copia
    ...createNotificationSlice(...a), //uso "..." para crear una copia
  }))
);
