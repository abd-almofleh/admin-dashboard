import { styled, Theme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

import { miniSideBarWidth, sideBarWidth } from "config";

const openedMixin = (theme: Theme) => ({
  width: sideBarWidth,
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme) => ({
  width: miniSideBarWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const MiniSideBarStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })<{ open: boolean }>(
  ({ theme, open }) => ({
    width: sideBarWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.divider}`,
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default MiniSideBarStyled;
