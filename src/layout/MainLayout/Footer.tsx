import { Grid, Link, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import config from "config";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const matchDownSM = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <Grid item xs={12} sx={{ marginTop: "auto" }}>
      <Stack
        direction={matchDownSM ? "column" : "row"}
        justifyContent={matchDownSM ? "center" : "space-between"}
        spacing={2}
        textAlign={matchDownSM ? "center" : "inherit"}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          &copy; {config.appName} by &nbsp;
          <Typography
            component={Link}
            variant="subtitle2"
            href="https://www.linkedin.com/in/abdullah-almofleh/"
            target="_blank"
            underline="hover"
          >
            Abdullah Almofleh
          </Typography>
        </Typography>

        <Typography variant="subtitle2" color="text.primary" component="span">
          {t("never_give_up")}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default Footer;
