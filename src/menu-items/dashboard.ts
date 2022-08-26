import { DashboardOutlined } from "@ant-design/icons";
import { ISideMenuItemsGroup } from "app/types";

const icons = {
  DashboardOutlined,
};

const dashboard: ISideMenuItemsGroup = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
