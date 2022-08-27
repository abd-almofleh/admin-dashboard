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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    email: Yup.string().email(t("validation.valid_email")).max(255).required(t("validation.email_required")),
    password: Yup.string().max(255).required(t("validation.password_required")),
  });

  const onSubmit: any = async (values: LoginFormDataTypes, { ...rest }: FormikHelpers<LoginFormDataTypes>) => {
    try {
      const userInfo: IUser = await login({ email: values.email, password: values.password }).unwrap();
      dispatch(loginAction(userInfo));
      navigate(redirectOnSuccessUrl, { replace: true });
    } catch (err: any) {
      console.log(`🚀 - file: Login.tsx - line 37 - err`, err);
      if (!err?.status) {
        rest.setErrors({ general: t("errors.no_server_response") });
      } else if (err.status === 401) {
        rest.setErrors({ general: t("errors.email_or_password_is_wrong") });
      } else {
        rest.setErrors({ general: t("errors.server_error") });
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
                    <InputLabel htmlFor="email">{t("inputs.labels.email")}</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder={t("inputs.placeholders.enter_email_address")}
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
                    <InputLabel htmlFor="password">{t("inputs.labels.password")}</InputLabel>
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
                            aria-label={t("toggle_password_visibility")}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder={t("inputs.placeholders.enter_password")}
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
                        {t("inputs.placeholders.keep_me_sign_in")}{" "}
                        <span style={{ color: "red" }}>({t("not_working")})</span>
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
                      {t("login")}
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
