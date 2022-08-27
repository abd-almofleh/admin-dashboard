import pages from "./pages";
import dashboard from "./dashboard";
import utilities from "./utilities";
import support from "./support";
import { ISideBarItemsGroup } from "app/types";

export interface ISideBarItems {
  items: ISideBarItemsGroup[];
}
const sideBarItems: ISideBarItems = {
  items: [dashboard, pages, utilities, support],
};

export default sideBarItems;
