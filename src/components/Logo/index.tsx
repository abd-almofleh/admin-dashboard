import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SxProps, Theme } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";

import Logo from "./Logo";
import config from "../../config";

interface LogoSectionTypes {
  to?: string;
  sx?: SxProps<Theme>;
}

const LogoSection = ({ sx, to }: LogoSectionTypes) => (
  <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
    <Logo />
  </ButtonBase>
);

LogoSection.propTypes = {
  to: PropTypes.string,
  sx: PropTypes.object,
};

export default LogoSection;
