import { createTheme, PaletteOptions } from "@mui/material/styles";
import { Theme } from "@mui/material/styles/createTheme";

import { presetPalettes } from "@ant-design/colors";

import ThemeOption from "./theme";
import { PaletteMode } from "@mui/material";

const Palette = (mode: PaletteMode): Theme => {
  const colors = presetPalettes;

  const greyPrimary = [
    "#ffffff",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#262626",
    "#141414",
    "#000000",
  ];
  const greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
  const greyConstant = ["#fafafb", "#e6ebf1"];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);

  const palette: PaletteOptions = {
    mode,
    common: {
      black: "#000",
      white: "#fff",
    },
    ...paletteColor,
    text: {
      primary: paletteColor.grey?.[700] ?? "#000",
      secondary: paletteColor.grey?.[500] ?? "#000",
      disabled: paletteColor.grey?.[400] ?? "#000",
    },
    action: {
      disabled: paletteColor.grey?.[300] ?? "#000",
    },
    divider: paletteColor.grey?.[200] ?? "#000",
    background: {
      paper: paletteColor.grey?.[0] ?? "#000",
      default: paletteColor.grey?.A50 ?? "#000",
    },
  };

  return createTheme({
    palette,
  });
};

export default Palette;
