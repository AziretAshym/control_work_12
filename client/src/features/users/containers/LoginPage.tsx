import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NavLink, useNavigate } from "react-router-dom";
import { LockOpenOutlined } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectLoginError } from "../usersSlice.ts";
import { RegisterMutation } from "../../../types";
import { googleLogin, login } from "../usersThunks.ts";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterMutation>({
    email: "",
    password: "",
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(login(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate("/");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError && (
            <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
              {loginError.error}
            </Alert>
          )}
          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => <Alert severity="error">Login failed</Alert>}
            />
          </Box>
          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
            <Grid container direction={"column"} size={12} spacing={2}>
              <Grid>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={inputChange}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={inputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <NavLink to="/register">
                  Haven't created an Account yet? Sign up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
