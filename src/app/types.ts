export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type Nilable<T> = Nullable<Undefinable<T>>;

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  email_verified_at: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  deleted_at: Nilable<string>;
  access_token: string;
}

export interface GenericResponse {
  message: string;
  data?: object;
}
