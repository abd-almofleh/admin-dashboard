import { DashboardOutlined } from "@ant-design/icons";
import { ISideBarCollapsibleItem, ISideBarItem, ISideBarItemsGroup } from "app/types";

const icons = {
  DashboardOutlined,
};

const dashboard: ISideBarItemsGroup = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "dashboard1",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: "sample-page",
      title: "Sample Page",
      type: "collapse",
      icon: icons.DashboardOutlined,
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard",
          icon: icons.DashboardOutlined,
          breadcrumbs: false,
        } as ISideBarItem,
        {
          id: "sample-page1",
          title: "Sample Page",
          type: "item",
          url: "/sample-page",
          icon: icons.DashboardOutlined,
        } as ISideBarItem,
        {
          id: "sample-page2",
          title: "Sample Page",
          type: "item",
          url: "/sample-page",
          icon: icons.DashboardOutlined,
        } as ISideBarItem,
      ],
    } as ISideBarCollapsibleItem,
  ],
};

export default dashboard;
