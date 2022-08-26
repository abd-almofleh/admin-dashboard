import { FC } from "react";

import { Box, List, Typography } from "@mui/material";

import NavItem from "./NavItem";
import { useAppSelector } from "app/hooks";
import { SelectSideMenuStatus } from "../../SideMenuSlice";
import { ISideMenuItemsGroup } from "app/types";

interface NavGroupProps {
  item: ISideMenuItemsGroup;
}

const NavGroup: FC<NavGroupProps> = ({ item }) => {
  const sideMenuOpen = useAppSelector(SelectSideMenuStatus);

  // TODO:fix Collapse
  const navCollapse = item.children.map((menuItem) => {
    switch (menuItem.type) {
      case "collapse":
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      case "item":
        return <NavItem key={menuItem.id} item={menuItem} level={menuItem.level} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items [NavGroup.tsx]
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        sideMenuOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: sideMenuOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

export default NavGroup;
