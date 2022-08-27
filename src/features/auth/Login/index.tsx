import { Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import AuthWrapper from "../AuthWrapper";
import LoginForm from "./LoginForm";

const Login = () => {
  const { t } = useTranslation();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">{t("login")}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <LoginForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
