import { createSlice } from "@reduxjs/toolkit";
import { loadUserState } from "../../app/localStorage";
import type { RootState } from "../../app/store";
import { IUser, Nilable } from "../../app/types";

interface authObject {
  user?: IUser;
}

const initialState: authObject = {
  user: loadUserState() as IUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action): void => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state, action): void => {
      state.user = undefined;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState): Nilable<IUser> => state.auth.user;
export const selectCurrentToken = (state: RootState): Nilable<string> => state.auth.user?.access_token;

export default authSlice.reducer;
