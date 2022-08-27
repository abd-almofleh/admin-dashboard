import { Avatar, CardContent, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface IPopperHeaderProps {
  user_image: string;
  userFullName: string;
  userRole: string;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}
const PopperHeader = ({ user_image, handleLogout, userFullName, userRole, ...props }: IPopperHeaderProps) => {
  const { t } = useTranslation();
  return (
    <CardContent sx={{ px: 2.5, pt: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar src={user_image} sx={{ width: 32, height: 32 }} />
            <Stack>
              <Typography variant="h6">{userFullName}</Typography>
              <Typography variant="body2" color="textSecondary">
                {userRole}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <Tooltip title={t("logout")} arrow>
            <IconButton size="large" color="secondary" onClick={handleLogout}>
              <LogoutOutlined />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default PopperHeader;
