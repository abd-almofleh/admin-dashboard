import { Location } from "react-router-dom";

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
  roles: string[];
  profile_image: string;
}

export interface GenericResponse {
  message: string;
  data?: object;
}
export interface ILocationState {
  from: Location;
}

export interface ISideBarItem {
  id: string;
  title: string;
  type: "item" | "collapse";
  url: string;
  icon: any;
  target?: boolean;
  breadcrumbs?: boolean;
  external?: boolean;
  disabled?: boolean;
  level?: number;
  chip?: {
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
    variant?: "filled" | "outlined";
    size?: "small" | "medium";
    label?: React.ReactNode;
    avatar?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  };
}
export interface ISideBarItemsGroup {
  id: string;
  title: string;
  type: "group";
  children: (ISideBarItem | ISideBarItemsGroup)[];
}
