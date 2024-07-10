import React, { useState } from "react";
import { Container, Stack, TextField, Button, Typography } from "@mui/material";
import logo1 from "../../assets/logo1.svg";
import ImageEl from "../../components/utils/ImageEl";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import useStore from "../../store";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  //toastr
  const {setToastr} = useStore()

  const authText = isLogin
    ? "Do not have an account?"
    : "Already have an account?";

  const initialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);
 

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      const msg = err.code.split("auth/")[1].split("-").join(" ");
      setToastr(msg)
      setLoading(false);
    }

    
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <ImageEl sx={{ mt: 10, height: "45px" }} src={logo1} alt="logo" />
        <Typography color="rgba(255, 255, 255, 0.6)">
          Visualize your workflow for increased productivity.
          <br />
          Access your tasks anytime, anywhere
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          value={form.password}
          name="password"
          type="password"
          onChange={handleChange}
          label="Password"
        />
        <Button
          disabled={loading || !form.email.trim() || !form.password.trim()}
          onClick={handleAuth}
          variant="contained"
          size="large"
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </Stack>
      <Typography
        sx={{
          cursor: "pointer",
        }}
        onClick={() => setIsLogin((o) => !o)}
        mt={3}
        textAlign="center"
      >
        {authText}
      </Typography>
    </Container>
  );
};

export default AuthScreen;
