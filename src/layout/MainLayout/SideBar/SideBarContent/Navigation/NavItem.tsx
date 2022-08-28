import PropTypes from "prop-types";
import { FC, forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { useTheme } from "@mui/material/styles";
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { SelectSideBar, activeItem } from "../../SideBarSlice";
import { ISideBarItem } from "app/types";

interface NavItemProps {
  item: ISideBarItem;
  level?: number;
  popperItem?: true;
}
interface listItemPropsTypes {
  component: React.ForwardRefExoticComponent<React.RefAttributes<HTMLAnchorElement>> | string;
  href?: string;
  target?: string;
}

const NavItem: FC<NavItemProps> = (props) => {
  const { item, level = 1, popperItem = false } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const sideBar = useAppSelector(SelectSideBar);
  const { sideBarOpen, openItem } = sideBar;

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
  const itemIcon = item.icon ? <Icon style={{ fontSize: sideBarOpen ? "1rem" : "1.25rem" }} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  // active SideBar item on page load
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
        pl: sideBarOpen ? `${level * 28}px` : 1.5,
        py: !sideBarOpen && level === 1 ? 1.25 : 1,
        ...((sideBarOpen || popperItem) && {
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
        ...(!sideBarOpen &&
          !popperItem && {
            "&:hover": {
              bgcolor: "secondary.lighter",
            },
            "&.Mui-selected": {
              "&:hover": {
                bgcolor: "secondary.lighter",
              },
              bgcolor: "primary.lighter",
              borderRight: `2px solid ${theme.palette.primary.main}`,
            },
          }),
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
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
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {(sideBarOpen || (!sideBarOpen && level !== 1) || popperItem) && (
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {item.title}
            </Typography>
          }
        />
      )}
      {(sideBarOpen || (!sideBarOpen && level !== 1) || popperItem) && item.chip && (
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
