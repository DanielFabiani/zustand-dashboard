// en index creamos el store que va a tener los slices

import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDataSlice, DateSlice } from "./date.slice";
import {
  ConfirmationSlice,
  createConfirmationSlice,
} from "./confirmation.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBounceStore = create<ShareState>()(
  // es el rest que contiene el set get y storeApi
  devtools((...a) => ({
    // este es el spread del slice y recibe como parámetro a
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDataSlice(...a),
    ...createConfirmationSlice(...a),
  }))
);
