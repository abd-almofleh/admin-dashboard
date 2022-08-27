import PropTypes from "prop-types";

import { Theme, useTheme } from "@mui/material/styles";

import SideBarHeaderStyled from "./SideBarHeaderStyled";
import Logo from "components/Logo";
import useMediaQuery from "@mui/material/useMediaQuery";

const SideBarHeader = ({ open }: { open: boolean }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery<Theme>(theme.breakpoints.down("lg"));

  return (
    <SideBarHeaderStyled theme={theme} open={open}>
      {matchDownMD ? <Logo /> : <Logo text={open} />}
    </SideBarHeaderStyled>
  );
};

SideBarHeader.propTypes = {
  open: PropTypes.bool,
};

export default SideBarHeader;
