import { ChromeOutlined, QuestionOutlined } from "@ant-design/icons";
import { ISideBarCollapsibleItem, ISideBarItem, ISideBarItemsGroup } from "app/types";
import { DashboardOutlined } from "@ant-design/icons";

const icons = {
  ChromeOutlined,
  QuestionOutlined,
  DashboardOutlined,
};

const support: ISideBarItemsGroup = {
  id: "support",
  title: "Support",
  type: "group",
  children: [
    {
      id: "sample-page",
      title: "Sample Page",
      type: "collapse",
      icon: icons.ChromeOutlined,
      children: [
        {
          id: "dashboard1",
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
          icon: icons.ChromeOutlined,
        } as ISideBarItem,
        {
          id: "sample-page2",
          title: "Sample Page",
          type: "item",
          url: "/sample-page",
          icon: icons.ChromeOutlined,
        } as ISideBarItem,
      ],
    } as ISideBarCollapsibleItem,
    {
      id: "documentation",
      title: "Documentation",
      type: "item",
      url: "https://codedthemes.gitbook.io/mantis-react/",
      icon: icons.QuestionOutlined,
      external: true,
      target: true,
    },
  ],
};

export default support;
