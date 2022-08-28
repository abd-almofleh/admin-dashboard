import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography, Chip, Avatar } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { SelectSideBar } from "../../SideBarSlice";
import { useAppSelector } from "app/hooks";
import { ISideBarCollapsibleItem } from "app/types";
import NavItem from "./NavItem";

interface INavCollapsibleItemProps {
  item: ISideBarCollapsibleItem;
  level?: number;
}

const NavCollapsibleItem: React.FC<INavCollapsibleItemProps> = ({ item, level = 1, ...props }) => {
  const [open, setOpen] = useState<boolean>(true);
  const sideBar = useAppSelector(SelectSideBar);
  const { sideBarOpen, openItem } = sideBar;

  useEffect(() => {
    if (!sideBarOpen) setOpen(false);
  }, [sideBarOpen]);

  const theme = useTheme();

  const handleClick = () => {
    setOpen(!open);
  };
  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: sideBarOpen ? "1rem" : "1.25rem" }} /> : false;
  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  const collapseItems = item.children.map((sideBarItem) => {
    return <NavItem key={sideBarItem.id} item={sideBarItem} level={sideBarItem.level ? sideBarItem.level + 1 : 2} />;
  });

  return (
    <>
      <ListItemButton
        disabled={item.disabled}
        onClick={handleClick}
        sx={{
          zIndex: 1201,
          pl: sideBarOpen ? `${level * 28}px` : 1.5,
          py: !sideBarOpen && level === 1 ? 1.25 : 1,
          ...(sideBarOpen && {
            "&:hover": {
              bgcolor: "primary.lighter",
            },
            "&.Mui-selected": {
              bgcolor: "primary.lighter",
              borderRight: `2px solid ${theme.palette.primary.main}`,
              color: iconSelectedColor,
              "&:hover": {
                color: iconSelectedColor,
                bgcolor: "primary.lighter",
              },
            },
          }),
          ...(!sideBarOpen && {
            "&:hover": {
              bgcolor: "transparent",
            },
            "&.Mui-selected": {
              "&:hover": {
                bgcolor: "transparent",
              },
              bgcolor: "transparent",
            },
          }),
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: open ? iconSelectedColor : textColor,
              ...(!sideBarOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: "secondary.lighter",
                },
              }),
              ...(!sideBarOpen &&
                isSelected && {
                  bgcolor: "primary.lighter",
                  "&:hover": {
                    bgcolor: "primary.lighter",
                  },
                }),
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {(sideBarOpen || (!sideBarOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: open ? iconSelectedColor : textColor }}>
                {item.title}
              </Typography>
            }
          />
        )}
        {(sideBarOpen || (!sideBarOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}

        {(sideBarOpen || (!sideBarOpen && level !== 1)) &&
          (open ? <ExpandLess sx={{ color: iconSelectedColor }} /> : <ExpandMore sx={{ color: textColor }} />)}
      </ListItemButton>
      {(sideBarOpen || (!sideBarOpen && level !== 1)) && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ mb: sideBarOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>{collapseItems}</List>
        </Collapse>
      )}
    </>
  );
};

export default NavCollapsibleItem;
