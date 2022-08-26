import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { SelectSideBarStatus, openSideBar } from "./SideBar/SideBarSlice";

import SideBar from "./SideBar";
import Header from "./Header";
import navigation from "menu-items";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import { RightOutlined } from "@ant-design/icons";

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const dispatch = useAppDispatch();

  const sideBarOpen = useAppSelector(SelectSideBarStatus);

  const [open, setOpen] = useState(sideBarOpen);

  const handleSideBarToggle = () => {
    setOpen(!open);
    dispatch(openSideBar(!open));
  };

  // set media wise responsive SideBar
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openSideBar(!matchDownLG));

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== sideBarOpen) setOpen(sideBarOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideBarOpen]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header open={open} handleSideBarToggle={handleSideBarToggle} />
      <SideBar open={open} handleSideBarToggle={handleSideBarToggle} />
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
