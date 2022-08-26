import PropTypes from "prop-types";
import React, { useMemo } from "react";

import { Theme, useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";

import SideBarHeader from "./SideBarHeader";
import SideBarContent from "./SideBarContent";
import MiniSideBarStyled from "./MiniSideBarStyled";
import { sideBarWidth } from "config";
import { Undefinable } from "app/types";

interface MainSideBarProps {
  open: boolean;
  handleSideBarToggle: Undefinable<(event: {}, reason: "backdropClick" | "escapeKeyDown") => void>;
  window?: any; //TODO: Fix
}

const MainSideBar: React.FC<MainSideBarProps> = ({ open, handleSideBarToggle, window }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery<Theme>(theme.breakpoints.down("lg"));

  const container = window !== undefined ? () => window().document.body : undefined;

  const sideBarHeader = useMemo(() => <SideBarHeader open={open} />, [open]);
  const sideBarContent = useMemo(() => <SideBarContent />, []);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniSideBarStyled variant="permanent" open={open}>
          <>
            {sideBarHeader}
            {sideBarContent}
          </>
        </MiniSideBarStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleSideBarToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sideBarWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: "none",
              boxShadow: "inherit",
            },
          }}
        >
          <>
            {open && sideBarHeader}
            {open && sideBarContent}
          </>
        </Drawer>
      )}
    </Box>
  );
};

MainSideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleSideBarToggle: PropTypes.func,
  window: PropTypes.object,
};

export default MainSideBar;
