import PropTypes from "prop-types";
import { FC, forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { useTheme } from "@mui/material/styles";
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { SelectSideMenu, activeItem } from "../../SideMenuSlice";
import { ISideMenuItem } from "app/types";

interface NavItemProps {
  item: ISideMenuItem;
  level?: number;
}
interface listItemPropsTypes {
  component: React.ForwardRefExoticComponent<React.RefAttributes<HTMLAnchorElement>> | string;
  href?: string;
  target?: string;
}

const NavItem: FC<NavItemProps> = ({ item, level = 1 }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const sideMenu = useAppSelector(SelectSideMenu);
  const { sideMenuOpen, openItem } = sideMenu;

  let itemTarget = item.target ? "_blank" : "_self";

  const component: listItemPropsTypes["component"] = item?.external
    ? "a"
    : forwardRef<HTMLAnchorElement>((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />);

  let listItemProps: listItemPropsTypes = {
    component,
  };
  if (item?.external) {
    listItemProps.href = item.url;
    listItemProps.target = itemTarget;
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem([id]));
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: sideMenuOpen ? "1rem" : "1.25rem" }} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(activeItem([item.id]));
    }
    // eslint-disable-next-line
  }, []);

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => itemHandler(item.id)}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: sideMenuOpen ? `${level * 28}px` : 1.5,
        py: !sideMenuOpen && level === 1 ? 1.25 : 1,
        ...(sideMenuOpen && {
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
        ...(!sideMenuOpen && {
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
            color: isSelected ? iconSelectedColor : textColor,
            ...(!sideMenuOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "secondary.lighter",
              },
            }),
            ...(!sideMenuOpen &&
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
      {(sideMenuOpen || (!sideMenuOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {item.title}
            </Typography>
          }
        />
      )}
      {(sideMenuOpen || (!sideMenuOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.any,
  level: PropTypes.number,
};

export default NavItem;
