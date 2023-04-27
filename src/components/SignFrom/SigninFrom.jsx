import React from "react";
import { Alert, Box, Stack, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import userApi from "../../api/moudules/user.api.js";
import { setAuthModalOpen } from "../../Redux/Reducer/authSlice";
import { setUser } from "../../Redux/Reducer/userSlice";

const SigninForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Tên người dùng tối thiểu 8 ký tự")
        .required("Tên người dùng là bắt buộc"),
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .required("Mật khẩu là bắt buộc"),
    }),
    onSubmit: async (values) => {
      setIsLoginRequest(true);
      console.log("adafsdfg ");
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);


      if (err) setErrorMessage(err.message)
      else setErrorMessage(null);


      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
       
        setTimeout(() => {
          navigate("/");
        },1000);
      }

      
    },
  });

  return (
    <div>
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
            placeholder="Mật Khẩu"
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

        <Button
          sx={{ marginTop: 4 }}
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          loading={isLoginRequest}
          // onClick={handleButtionClickSignin}
        >
          Đăng Nhập
        </Button>


        <Button size="large" fullWidth sx={{ marginTop: 3 }}>
          <Link to="/Signup" style={{ color: "white" }}>
            Đăng Ký{" "}
          </Link>
          
        </Button>
       
          
        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert variant="filled" severity="error">
              Đăng nhập thất bại
            </Alert>
          </Box>
        )}
        {errorMessage ===null && (
          <Box sx={{ marginTop: 2 }}>
            <Alert variant="filled" severity="success">
              Đăng nhập thành công
            </Alert>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SigninForm;
