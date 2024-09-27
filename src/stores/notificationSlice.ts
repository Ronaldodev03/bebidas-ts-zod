import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

//type
type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

//type del state
export type NotificationSliceType = {
  notification: Notification;
  showNotification: (
    /* ************ no capté lo del Pick ***************** */
    payload: Pick<Notification, "text" | "error">
  ) => void;
  hideNotification: () => void;
};

/* StateCreator es para especificar el type del slice */
/* este slice se consume en el slice de favoritesSlices --> clase 337 */
export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSliceType, //esto es por consumir datos de otro slice, lo explica en clase 337
  [], //esto es por consumir datos de otro slice, lo explica en clase 337
  [], //esto es por consumir datos de otro slice, lo explica en clase 337
  NotificationSliceType
> = (set, get) => ({
  /* state inicial | START */
  notification: {
    text: "",
    error: false,
    show: false,
  },
  /* state inicial | END */

  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });
    setTimeout(() => {
      get().hideNotification();
    }, 5000);
  },
  hideNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
