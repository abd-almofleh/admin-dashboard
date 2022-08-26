import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface SideMenuData {
  openItem: string[];
  openComponent: string;
  sideMenuOpen: boolean;
  componentSideMenuOpen: boolean;
}

const initialState: SideMenuData = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  sideMenuOpen: false,
  componentSideMenuOpen: true,
};

const menu = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    activeItem(state, action: PayloadAction<SideMenuData["openItem"]>) {
      state.openItem = action.payload;
    },

    activeComponent(state, action: PayloadAction<SideMenuData["openComponent"]>) {
      state.openComponent = action.payload;
    },

    openSideMenu(state, action: PayloadAction<boolean>) {
      state.sideMenuOpen = action.payload;
    },

    openComponentSideMenu(state, action: PayloadAction<any>) {
      state.componentSideMenuOpen = action.payload.componentSideMenuOpen;
    },
  },
});
export const SelectSideMenuStatus = (state: RootState): boolean => state.sideMenu.sideMenuOpen;
export const SelectSideMenu = (state: RootState): SideMenuData => state.sideMenu;

export const { activeItem, activeComponent, openSideMenu, openComponentSideMenu } = menu.actions;

export default menu.reducer;
