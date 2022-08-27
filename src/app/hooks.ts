import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { selectCurrentUser } from "features/auth/authSlice";
import { IUser, Nilable } from "./types";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = (): Nilable<IUser> => useAppSelector(selectCurrentUser);
