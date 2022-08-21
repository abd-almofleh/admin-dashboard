import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { Theme } from "@mui/material";

const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  content?: boolean;
  children?: React.ReactNode;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: React.ReactNode;
  shadow?: string | ((theme: Theme) => string | undefined);
  sx?: object;
  title?: string;
  contentSX?: object;
}

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        {...others}
        sx={{
          ...sx,
          border: border ? "1px solid" : "none",
          borderRadius: 2,
          borderColor: theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey.A800,
          boxShadow:
            boxShadow && (!border || theme.palette.mode === "dark") ? shadow || theme.customShadows?.z1 : "inherit",
          ":hover": {
            boxShadow: boxShadow ? shadow || theme.customShadows?.z1 : "inherit",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} titleTypographyProps={{ variant: "subtitle1" }} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  sx: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.bool,
  children: PropTypes.node,
};

export default MainCard;
