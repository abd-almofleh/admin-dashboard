import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SxProps, Theme } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";

import Logo from "./Logo";
import config from "../../config";
import LogoWithoutText from "./LogoWithoutText";

interface LogoSectionTypes {
  to?: string;
  sx?: SxProps<Theme>;
  text?: boolean;
}

const LogoSection = ({ sx, to, text = true }: LogoSectionTypes) => (
  <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
    {text ? <Logo /> : <LogoWithoutText />}
  </ButtonBase>
);

LogoSection.propTypes = {
  to: PropTypes.string,
  sx: PropTypes.object,
};

export default LogoSection;
