import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

import { miniSideBarWidth, sideBarWidth } from "config";

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== "open" })<{ open: boolean }>(
  ({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: sideBarWidth,
      width: `calc(100% - ${sideBarWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(!open && {
      marginLeft: miniSideBarWidth,
      width: `calc(100% - ${miniSideBarWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export default AppBarStyled;
