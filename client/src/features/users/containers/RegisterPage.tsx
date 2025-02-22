import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectRegisterError } from "../usersSlice.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { RegisterMutation } from "../../../types";
import { register } from "../usersThunks.ts";
import FileInput from "../../../components/FileInput/FileInput.tsx";

const regEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ email?: string }>({});

  const [form, setForm] = useState<RegisterMutation>({
    email: "",
    password: "",
    displayName: "",
    avatar: undefined,
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (regEmail.test(value)) {
        setErrors((prevState) => ({ ...prevState, email: "" }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: "Invalid email format",
        }));
      }
    }
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      avatar: e.target.files?.[0],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register(form)).unwrap();
    navigate("/");
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
          <Grid container direction="column" spacing={2}>
            <Grid>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={form.email}
                onChange={inputChange}
                error={Boolean(getFieldError("email")) || Boolean(errors.email)}
                helperText={getFieldError("email") || errors.email}
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
                error={Boolean(getFieldError("password"))}
                helperText={getFieldError("password")}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                name="displayName"
                label="Display Name"
                id="displayName"
                value={form.displayName}
                onChange={inputChange}
                error={Boolean(getFieldError("displayName"))}
                helperText={getFieldError("displayName")}
              />
            </Grid>
            <Grid>
              <FileInput name="avatar" label="Avatar" onGetFile={fileChange} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <NavLink to="/login">Already have an account? Sign in</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
