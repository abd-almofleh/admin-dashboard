import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { SelectSideMenuStatus, openSideMenu } from "./Drawer/SideMenuSlice";

import Drawer from "./Drawer";
import Header from "./Header";
import navigation from "menu-items";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import { RightOutlined } from "@ant-design/icons";

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const dispatch = useAppDispatch();

  const sideMenuOpen = useAppSelector(SelectSideMenuStatus);

  const [open, setOpen] = useState(sideMenuOpen);

  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openSideMenu(!open));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openSideMenu(!matchDownLG));

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== sideMenuOpen) setOpen(sideMenuOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideMenuOpen]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs
          navigation={navigation}
          title
          titleBottom
          card={false}
          separator={<RightOutlined />}
          divider={false}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
