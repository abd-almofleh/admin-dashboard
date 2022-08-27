import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface ISideBarData {
  openItem: string[];
  openComponent: string;
  sideBarOpen: boolean;
  componentSideBarOpen: boolean;
}

const initialState: ISideBarData = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  sideBarOpen: false,
  componentSideBarOpen: true,
};

const SideBar = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    activeItem(state, action: PayloadAction<ISideBarData["openItem"]>) {
      state.openItem = action.payload;
    },

    activeComponent(state, action: PayloadAction<ISideBarData["openComponent"]>) {
      state.openComponent = action.payload;
    },

    openSideBar(state, action: PayloadAction<boolean>) {
      state.sideBarOpen = action.payload;
    },

    openComponentSideBar(state, action: PayloadAction<any>) {
      state.componentSideBarOpen = action.payload.componentSideBarOpen;
    },
  },
});
export const SelectSideBarStatus = (state: RootState): boolean => state.sideBar.sideBarOpen;
export const SelectSideBar = (state: RootState): ISideBarData => state.sideBar;

export const { activeItem, activeComponent, openSideBar, openComponentSideBar } = SideBar.actions;

export default SideBar.reducer;
