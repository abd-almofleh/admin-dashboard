export interface IUser {
  email: string;
  first_name: string;
  access_token: string;
}

export interface GenericResponse {
  message: string;
  data?: object;
}

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type Nilable<T> = Nullable<Undefinable<T>>;
