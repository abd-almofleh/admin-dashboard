import { FC } from "react";

import { Box, List, Typography } from "@mui/material";

import NavItem from "./NavItem";
import { useAppSelector } from "app/hooks";
import { SelectSideBarStatus } from "../../SideBarSlice";
import { ISideBarItemsGroup } from "app/types";

interface NavGroupProps {
  item: ISideBarItemsGroup;
}

const NavGroup: FC<NavGroupProps> = ({ item }) => {
  const sideBarOpen = useAppSelector(SelectSideBarStatus);

  // TODO:fix Collapse
  const navCollapse = item.children.map((sideBarItem) => {
    switch (sideBarItem.type) {
      case "collapse":
        return (
          <Typography key={sideBarItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      case "item":
        return <NavItem key={sideBarItem.id} item={sideBarItem} level={sideBarItem.level} />;
      default:
        return (
          <Typography key={sideBarItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items [NavGroup.tsx]
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        sideBarOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: sideBarOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

export default NavGroup;
