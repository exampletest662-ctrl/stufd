import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartState = Record<number, number>;

const initialState: CartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      state[action.payload] = (state[action.payload] ?? 0) + 1;
    },
    increase: (state, action: PayloadAction<number>) => {
      state[action.payload] = (state[action.payload] ?? 0) + 1;
    },
    remove: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if ((state[id] ?? 0) > 1) state[id] -= 1;
      else delete state[id];
    },
    decrease: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if ((state[id] ?? 0) > 1) state[id] -= 1;
      else delete state[id];
    },
    clear: () => initialState,
  },
});

export const { add, remove, increase, decrease, clear } = cartSlice.actions;
export default cartSlice.reducer;
