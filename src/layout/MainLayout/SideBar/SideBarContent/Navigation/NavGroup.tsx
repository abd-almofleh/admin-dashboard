import { FC } from "react";

import { Box, List, Typography } from "@mui/material";

import NavItem from "./NavItem";
import { useAppSelector } from "app/hooks";
import { SelectSideBarStatus } from "../../SideBarSlice";
import { ISideBarItemsGroup, ISideBarItemTemplate } from "app/types";
import NavCollapsibleItem from "./NavCollapsibleItemGroup";

interface NavGroupProps {
  item: ISideBarItemsGroup;
}

const NavGroup: FC<NavGroupProps> = ({ item }) => {
  const sideBarOpen = useAppSelector(SelectSideBarStatus);

  const navCollapse = item.children.map((sideBarItem) => {
    switch (sideBarItem.type) {
      case "collapse":
        return <NavCollapsibleItem key={sideBarItem.id} item={sideBarItem} level={sideBarItem.level} />;
      case "item":
        return <NavItem key={sideBarItem.id} item={sideBarItem} level={sideBarItem.level} />;
      default:
        return null;
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
