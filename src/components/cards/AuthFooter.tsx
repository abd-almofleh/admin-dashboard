import { Container, Link, Typography, Grid } from "@mui/material";
import config from "config";

const AuthFooter = () => {
  return (
    <Container maxWidth="xl">
      <Grid direction="row" justifyContent="center" textAlign="center">
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
      </Grid>
    </Container>
  );
};

export default AuthFooter;
