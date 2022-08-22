import { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import AnimateButton from "components/@extended/AnimateButton";
import { ILocationState, IUser, Nilable } from "app/types";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../authApiSlice";
import { useAppDispatch } from "app/hooks";
import { login as loginAction } from "../authSlice";
import { useLocation } from "react-router-dom";
import Loader from "components/Loader";
interface LoginFormDataTypes {
  email: string;
  password: string;
  keepSignIn: boolean;
  general: Nilable<string>;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as ILocationState;
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const redirectOnSuccessUrl = locationState?.from?.pathname || "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const initialValues: LoginFormDataTypes = {
    email: "",
    password: "",
    keepSignIn: false,
    general: null,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
  });

  const onSubmit: any = async (values: LoginFormDataTypes, { ...rest }: FormikHelpers<LoginFormDataTypes>) => {
    try {
      const userInfo: IUser = await login({ email: values.email, password: values.password }).unwrap();
      dispatch(loginAction(userInfo));
      navigate(redirectOnSuccessUrl, { replace: true });
    } catch (err: any) {
      console.log(`🚀 - file: Login.tsx - line 37 - err`, err);
      if (!err?.status) {
        rest.setErrors({ general: "No server response" });
      } else if (err.status === 401) {
        rest.setErrors({ general: "Your email or password is wrong!" });
      } else {
        rest.setErrors({ general: "Server Error, Please try again later" });
      }
    }
  };
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <>
            {isSubmitting && <Loader />}

            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {errors.general && (
                  <Grid item xs={12}>
                    <Alert variant="filled" severity="error">
                      {errors.general}
                    </Alert>
                  </Grid>
                )}

                {/*  email */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* password */}
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* TODO: fix keep me sign in */}
                <Grid item xs={12} sx={{ mt: -1 }}>
                  <FormControlLabel
                    disabled
                    control={
                      <Checkbox
                        checked={values.keepSignIn}
                        onChange={handleChange}
                        name="keepSignIn"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">
                        Keep me sign in <span style={{ color: "red" }}>(not working)</span>
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
