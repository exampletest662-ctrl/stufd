import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DemoUser = {
  name: string;
  email: string;
  initials: string;
};

export type AuthState = {
  user: DemoUser | null;
  isLoggedIn: boolean;
};

const demoUser: DemoUser = {
  name: "Aarav Sharma",
  email: "aarav@example.com",
  initials: "AS",
};

const initialState: AuthState = {
  user: demoUser,
  isLoggedIn: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<DemoUser>) => ({
      user: action.payload,
      isLoggedIn: true,
    }),
    logout: () => ({ user: null, isLoggedIn: false }),
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
