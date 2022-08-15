import { createSlice } from "@reduxjs/toolkit";
import { loadUserState } from "../../app/localStorage";

// TODO: Fill the user interface
interface User {}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: loadUserState() },
  reducers: {
    login: (state, action): void => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state, action): void => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logOut } = authSlice.actions;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any): string | null => state.auth.user?.access_token;

export default authSlice.reducer;
