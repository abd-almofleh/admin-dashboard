import pages from "./pages";
import dashboard from "./dashboard";
import utilities from "./utilities";
import support from "./support";
import { ISideMenuItemsGroup } from "app/types";

export interface IMenuItems {
  items: ISideMenuItemsGroup[];
}
const menuItems: IMenuItems = {
  items: [dashboard, pages, utilities, support],
};

export default menuItems;
