import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setAuthModalOpen } from "../../Redux/Reducer/authSlice";
import { setUser } from "../../Redux/Reducer/userSlice";
import userApi from "../../api/moudules/user.api";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Tên người dùng tối thiểu 8 ký tự")
        .required("Tên người dùng là bắt buộc"),
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .required("Mật khẩu là bắt buộc"),
      displayName: Yup.string()
        .min(5, "Tên hiển thị tối thiểu 5 ký tự")
        .required("Tên hiển thị là bắt buộc"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .required("Xác nhận mật khẩu là bắt buộc"),
    }),
    onSubmit: async (values) => {
      
      setIsLoginRequest(true);
      console.log("asdasdasdasd");
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (err) setErrorMessage(err.message);
      else setErrorMessage(null);


      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        setTimeout(() => {
          navigate("/signin");
        },1000);
      }
    },
    
  });


  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          type="text"
          placeholder="Tên tài khoản"
          name="username"
          fullWidth
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
          InputProps={{
            style: {
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          type="text"
          placeholder="Tên"
          name="displayName"
          fullWidth
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.displayName &&
            signinForm.errors.displayName !== undefined
          }
          helperText={
            signinForm.touched.displayName && signinForm.errors.displayName
          }
          InputProps={{
            style: {
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          style={{ color: "red" }}
          type="password"
          placeholder="Mật khẩu"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
          InputProps={{
            style: {
              fontWeight: "bold",
            },
          }}
        />
        <TextField
          type="password"
          placeholder="Nhập lại mật khẩu"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
          InputProps={{
            style: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack>

      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Đăng Ký
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert variant="filled" severity="error">
            Đăng ký thất bại
          </Alert>
        </Box>
      )}
      {errorMessage == null && (
        <Box sx={{ marginTop: 2 }}>
          <Alert variant="filled" severity="success">
            Đăng ký thành công 
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
