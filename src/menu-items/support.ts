import { ChromeOutlined, QuestionOutlined } from "@ant-design/icons";
import { ISideBarItemsGroup } from "app/types";

const icons = {
  ChromeOutlined,
  QuestionOutlined,
};

const support: ISideBarItemsGroup = {
  id: "support",
  title: "Support",
  type: "group",
  children: [
    {
      id: "sample-page",
      title: "Sample Page",
      type: "item",
      url: "/sample-page",
      icon: icons.ChromeOutlined,
    },
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
