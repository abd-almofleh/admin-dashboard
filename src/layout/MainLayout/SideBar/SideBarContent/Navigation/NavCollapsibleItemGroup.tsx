import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Avatar,
  Popper,
  Fade,
  Paper,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { SelectSideBar } from "../../SideBarSlice";
import { useAppSelector } from "app/hooks";
import { ISideBarCollapsibleItem } from "app/types";
import NavItem from "./NavItem";

interface INavCollapsibleItemProps {
  item: ISideBarCollapsibleItem;
  level?: number;
}

const NavCollapsibleItem: React.FC<INavCollapsibleItemProps> = (props) => {
  const { item, level = 1 } = props;

  const { sideBarOpen, openItem } = useAppSelector(SelectSideBar);
  const theme = useTheme();

  const [collapsedListOpen, setCollapsedListOpen] = useState<boolean>(false);
  const [popperOpen, setPopperOpen] = useState<boolean>(false);
  const [popperAnchorEl, setPopperAnchorEl] = useState<null | HTMLElement>(null);

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: sideBarOpen ? "1rem" : "1.25rem" }} /> : false;

  const handleClick = (): void => {
    sideBarOpen && setCollapsedListOpen(!collapsedListOpen);
  };
  const handleMouseEnter = (): void => {
    setPopperOpen(true);
  };
  const handleMouseLeave = (): void => {
    setPopperOpen(false);
  };

  const collapseItems = item.children.map((sideBarItem) => {
    return <NavItem key={sideBarItem.id} item={sideBarItem} level={sideBarItem.level ? sideBarItem.level + 1 : 2} />;
  });
  const popperItems = item.children.map((sideBarItem) => {
    return <NavItem popperItem key={sideBarItem.id} item={sideBarItem} />;
  });

  return (
    <>
      <ListItemButton
        ref={setPopperAnchorEl}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
              bgcolor: "secondary.lighter",
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
              color: collapsedListOpen ? iconSelectedColor : textColor,
              ...(!sideBarOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
              }),
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {(sideBarOpen || (!sideBarOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: collapsedListOpen ? iconSelectedColor : textColor }}>
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
        {!sideBarOpen && (
          <Popper
            open={popperOpen}
            anchorEl={popperAnchorEl}
            placement="right"
            disablePortal={false}
            transition
            modifiers={[
              {
                name: "flip",
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
              {
                name: "preventOverflow",
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: false,
                  tether: false,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
            ]}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <List>{popperItems}</List>
                </Paper>
              </Fade>
            )}
          </Popper>
        )}

        {(sideBarOpen || (!sideBarOpen && level !== 1)) &&
          (collapsedListOpen ? (
            <ExpandLess sx={{ color: iconSelectedColor }} />
          ) : (
            <ExpandMore sx={{ color: textColor }} />
          ))}
      </ListItemButton>
      {(sideBarOpen || (!sideBarOpen && level !== 1)) && (
        <Collapse in={collapsedListOpen} timeout="auto" unmountOnExit>
          <List sx={{ mb: sideBarOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>{collapseItems}</List>
        </Collapse>
      )}
    </>
  );
};

export default NavCollapsibleItem;
