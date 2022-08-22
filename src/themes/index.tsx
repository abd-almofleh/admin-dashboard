import PropTypes from "prop-types";
import { useMemo } from "react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, Theme, ThemeOptions, ThemeProvider } from "@mui/material/styles";

import Palette from "./palette";
import Typography from "./typography";
import CustomShadows from "./shadows";
import componentsOverride from "./overrides";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}
declare module "@mui/material/styles/createTheme" {
  interface ThemeOptions {
    customShadows?: {
      button: string;
      text: string;
      z1: string;
    };
  }
  interface Theme {
    customShadows?: {
      button: string;
      text: string;
      z1: string;
    };
  }
}

export default function ThemeCustomization({ children }: { children: any }) {
  const theme = Palette("light");
  const themeTypography: TypographyOptions = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions: ThemeOptions = useMemo<ThemeOptions>(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};
