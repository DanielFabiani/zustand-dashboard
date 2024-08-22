import { StateCreator } from "zustand";

export interface ConfirmationSlice {
  isConfirm: boolean;

  setIsConfirm: (isConfirm: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (set) => ({
  isConfirm: false,

  setIsConfirm: (value: boolean) => set({isConfirm: value})
})