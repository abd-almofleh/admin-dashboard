import { Box, Theme, useMediaQuery } from "@mui/material";

import Search from "./Search";
import Profile from "./Profile";
import Notification from "./Notification";
import MobileSection from "./MobileSection";

const HeaderContent = () => {
  const matchesXs = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}
      <Notification />
      <Profile />
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
