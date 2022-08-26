import { useRef, useState } from "react";
import { Theme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Stack, Typography, useMediaQuery } from "@mui/material";

import { useAuth } from "app/hooks";
import { getFullName } from "utils/Helpers";
import { IUser } from "app/types";
import ProfilePopper from "./ProfilePopper";
import PopperHeader from "./PopperHeader";
import PopperTabs from "./PopperTabs";

const Profile = () => {
  const matchesXs = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  const user = useAuth() as IUser;

  const userFullName = getFullName(user);

  const handleLogout = async () => {
    // TODO Logout
    console.log("Logout");
  };

  const ProfileButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: any) => {
    if (ProfileButtonRef.current && ProfileButtonRef.current?.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={ProfileButtonRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar src={user.profile_image} sx={{ width: 32, height: 32 }} />
          {!matchesXs && <Typography variant="subtitle1">{userFullName}</Typography>}
        </Stack>
      </ButtonBase>
      <ProfilePopper open={open} anchorRef={ProfileButtonRef} handleClose={handleClose}>
        <PopperHeader
          user_image={user.profile_image}
          userFullName={userFullName}
          handleLogout={handleLogout}
          userRole={user.roles?.[0]}
        />
        <PopperTabs handleChange={handleChange} handleLogout={handleLogout} selectedTab={selectedTab} />
      </ProfilePopper>
    </Box>
  );
};

export default Profile;
