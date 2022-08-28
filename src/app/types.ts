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

export interface ISideBarItemTemplate {
  id: string;
  title: string;
  icon: any;
  disabled?: boolean;
  level?: number;
  type: "item" | "collapse";
  chip?: {
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
    variant?: "filled" | "outlined";
    size?: "small" | "medium";
    label?: React.ReactNode;
    avatar?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  };
}

export interface ISideBarItem extends ISideBarItemTemplate {
  url: string;
  target?: boolean;
  breadcrumbs?: boolean;
  external?: boolean;
  type: "item";
}

export interface ISideBarCollapsibleItem extends ISideBarItemTemplate {
  children: ISideBarItem[];
  type: "collapse";
}

export interface ISideBarItemsGroup {
  id: string;
  title: string;
  type: "group";
  children: (ISideBarItem | ISideBarCollapsibleItem)[];
}
