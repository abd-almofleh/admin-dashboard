import PropTypes from "prop-types";

import { Theme, useTheme } from "@mui/material/styles";

import DrawerHeaderStyled from "./SideBarHeaderStyled";
import Logo from "components/Logo";
import useMediaQuery from "@mui/material/useMediaQuery";

const DrawerHeader = ({ open }: { open: boolean }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery<Theme>(theme.breakpoints.down("lg"));

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      {matchDownMD ? <Logo /> : <Logo text={open} />}
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
