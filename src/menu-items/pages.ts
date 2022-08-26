import { LoginOutlined, ProfileOutlined } from "@ant-design/icons";
import { ISideMenuItemsGroup } from "app/types";

const icons = {
  LoginOutlined,
  ProfileOutlined,
};

const pages: ISideMenuItemsGroup = {
  id: "authentication",
  title: "Authentication",
  type: "group",
  children: [
    {
      id: "login1",
      title: "Login",
      type: "item",
      url: "/login",
      icon: icons.LoginOutlined,
      target: true,
    },
    {
      id: "register1",
      title: "Register",
      type: "item",
      url: "/register",
      icon: icons.ProfileOutlined,
      target: true,
    },
  ],
};

export default pages;
