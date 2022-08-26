import { IUser } from "app/types";

export const getFullName = (user: IUser) => `${user.first_name} ${user.last_name}`;
