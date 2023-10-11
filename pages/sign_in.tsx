import * as React from "react";
import { observer } from "mobx-react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { login,loginByEmail,sendLoginEmail } from "../server/api/user";
import stores from "../stores";
import message from "../components/Message";
import GoogleSvg from "../public/google.svg";

function SignIn() {
  const router = useRouter();
  const { commonStore } = stores;
  const [email, setEmail] = React.useState("");
  const sendCode = async ()=>{
    try{
      const res = await sendLoginEmail({
        email:email
      })
      if(res.email){
        message.success({ content: "send email success!" });
      }
    }catch(e){
      console.error(e, "e?.message");
      message.error({ content: e.response.data.message });
    }

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      if(loginWay === 'password'){
        const { token } = await login({
          credential: data.get("email"),
          password: data.get("password"),
        });
        if (token) {
          localStorage.setItem("token", token);
          router.push("/");
          document.cookie = `auth=${token}`;
          message.success({ content: "sign in success!" });
        } else {
          message.error({ content: "login error" });
        }
      }else{
        const { token } = await loginByEmail({
          email: data.get("email"),
          code: data.get("code"),
        });
        if (token) {
          localStorage.setItem("token", token);
          document.cookie = `auth=${token}`;
          router.push("/");
          message.success({ content: "sign in success!" });
        } else {
          message.error({ content: "login error" });
        }
      }
      
    } catch (e) {
      console.error(e?.message);
      if (e?.name !== "AxiosError") {
        if (e?.message) {
          message.error({ content: e.message });
        } else {
          message.error({ content: "sign in error!please try again!" });
        }
      }
    }
  };
  const [loginWay, setLoginWay] = React.useState("password");
  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {loginWay === "email" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  sendCode();
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                className="bg-blue-500"
              >
                Send
              </Button>
            )}
            {loginWay === "password" ? (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                name="code"
                label="code"
                type="text"
                id="code"
              />
            )}
            <Grid container className="flex justify-between items-center">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid item>
                {loginWay === "password" ? (
                  <Typography onClick={() => setLoginWay("email")}>
                    <Link className="cursor-pointer" variant="body2">
                      login with email
                    </Link>
                  </Typography>
                ) : (
                  <Typography onClick={() => setLoginWay("password")}>
                    <Link className="cursor-pointer" variant="body2">
                      login with password
                    </Link>
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="bg-blue-500"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("/forget")}
                >
                  <Link variant="body2">Forgot password?</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("/sign_up")}
                >
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        // <Divider
        //   sx={{
        //     mb: 4,
        //   }}
        // >
        //   OR
        // </Divider>
        // <Button
        //   href={`${process.env.NEXT_PUBLIC_API_HOST}/auth/google`}
        //   fullWidth
        //   size="large"
        //   variant="outlined"
        //   startIcon={<GoogleSvg width={20} height={20} />}
        // >
        //   Sign in with Google
        // </Button>
      </Container>
    </Layout>
  );
}

export default observer(SignIn);
