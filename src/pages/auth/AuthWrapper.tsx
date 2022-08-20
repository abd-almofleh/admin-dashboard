import PropTypes, { InferProps } from "prop-types";
import { Box, Grid } from "@mui/material";

import AuthBackground from "components/backgrounds/AuthBackground";
import AuthCard from "./AuthCard";
import Logo from "../../components/Logo";
import AuthFooter from "../../components/cards/AuthFooter";

const AuthWrapperProps = { children: PropTypes.node };
type AuthWrapperTypes = InferProps<typeof AuthWrapperProps>;

const AuthWrapper = ({ children }: AuthWrapperTypes) => (
  <Box sx={{ minHeight: "100vh" }}>
    <AuthBackground />
    <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Logo />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: "calc(100vh - 134px)", md: "calc(100vh - 112px)" } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = AuthWrapperProps;

export default AuthWrapper;
