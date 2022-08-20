import { Box } from "@mui/material";

/**
 * It's a box that's positioned absolutely, blurred, and has a negative z-index. It's also 100% width
 * and height, which hold a background image to use on the auth pages
 *
 * @returns A Box component with a background image.
 */
const AuthBackground = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        filter: "blur(18px)",
        zIndex: -1,
        bottom: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <img src={require("assets/images/logo.png")} alt="" style={{ width: "100%", height: "100vh" }} />
    </Box>
  );
};

export default AuthBackground;
