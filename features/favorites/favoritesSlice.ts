import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoritesState = number[];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as FavoritesState,
  reducers: {
    toggle: (state, action: PayloadAction<number>) => {
      const index = state.indexOf(action.payload);
      if (index === -1) state.push(action.payload);
      else state.splice(index, 1);
    },
    add: (state, action: PayloadAction<number>) => {
      if (!state.includes(action.payload)) state.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((id) => id !== action.payload);
    },
    clear: () => [],
  },
});

export const { toggle, add, remove, clear } = favoritesSlice.actions;
export default favoritesSlice.reducer;
