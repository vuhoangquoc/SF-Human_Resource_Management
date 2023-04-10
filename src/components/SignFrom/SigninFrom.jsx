// import { LoadingButton } from "@mui/lab";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Typography } from "antd";
import * as Yup from "yup";
// import userApi from "../../Api/moudules/user.api.js";
import { setAuthModalOpen } from "../../Redux/Reducer/authSlice";
import { setUser } from "../../Redux/Reducer/userSlice";
import userApi from "./../../api/moudules/user.api";

const { Title } = Typography;

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log("đăng nhập thành công ");
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <div>
      <Title level={1} style={{ textAlign: "center" }}>
        SIGN IN{" "}
      </Title>

      <Box component="form" onSubmit={signinForm.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            value={signinForm.values.username}
            onChange={signinForm.handleChange}
            type="text"
            placeholder="username"
            name="username"
            fullWidth
            color="success"
            error={
              signinForm.touched.username &&
              signinForm.errors.username !== undefined
            }
            helperText={
              signinForm.touched.username && signinForm.errors.username
            }
            InputProps={{
              style: {
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            value={signinForm.values.password}
            onChange={signinForm.handleChange}
            type="password"
            placeholder="Userpassword"
            name="password"
            fullWidth
            color="primary"
            error={
              signinForm.touched.password &&
              signinForm.errors.password !== undefined
            }
            helperText={
              signinForm.touched.password && signinForm.errors.password
            }
            InputProps={{
              style: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack>

        <LoadingButton
          sx={{ marginTop: 4 }}
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={isLoginRequest}
        >
          sign in
        </LoadingButton>

        <Button fullWidth sx={{ marginTop: 2 }}>
          <Link to="/Signup">sign up</Link>
        </Button>

        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SigninForm;
