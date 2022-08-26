import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const SideBarHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })<{ open: boolean }>(
  ({ theme, open }) => ({
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: open ? "flex-start" : "center",
    paddingLeft: theme.spacing(open ? 3 : 0),
  })
);

export default SideBarHeaderStyled;