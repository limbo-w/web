import Layout from "../components/Layout";
import * as React from "react";
import { observer } from "mobx-react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import { signUp, sendCodeApi ,signUpByPassword } from "../server/api/user";
import message from "../components/Message";
import GoogleSvg from "../public/google.svg";
import stores from "../stores";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [way,setWay] = React.useState("email");
  const router = useRouter();
  const { commonStore } = stores;
  const sendCode = async (event) => {
    // const data = new FormData(event.currentTarget);
    // console.log("sendCode",event);
    try {
      const result = await sendCodeApi({
        email: email,
      });
      if (result) {
        message.success({ content: "send email success!" });
      }
    } catch (e) {
      console.error(e, "e?.message");
      message.error({ content: e.response.data.message });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let result;
    const data = new FormData(event.currentTarget);
      if(way === "email"){
        result = await signUp({
          email: data.get("email"),
          code: data.get("code"),
          username: data.get("username"),
          password: data.get("password"),
        });
        if(result?.actived){
          message.success({ content: "sign in success!" });
        }
      }else{
        try {
          result = await signUpByPassword({
            username: data.get("username"),
            password: data.get("password"),
            plainPassword: data.get("plainPassword"),
            nickname:data.get("nickname")
          });
          if(result?.actived){
            message.success({ content: "sign in success!" });
          }
        } catch (error) {
          console.log(error)
          message.error({content: error.response?.data?.message[0]})
        }
      }
      // if (result?.actived) {
      //   // localStorage.setItem("token", result.data.token);
      //   // commonStore.setUserProfile(result.data.user);
      //   router.push("/sign_in");
      //   message.success({ content: "sign in success!" });
      // } else {
      //   message.error({ content: result.message });
      // }
  };

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
            Sign up
          </Typography>
          <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} className="flex space-x-2 items-center">
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    autoComplete="email"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    className=" btn w-36 btn-primary bg-blue-500  border-4 border-blue-500"
                    onClick={sendCode}
                  >
                    Get Code
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="code"
                    label="code"
                    type="text"
                    id="code"
                    autoComplete="new-code"
                  />
                </Grid>
                <Grid item xs={12} className="flex space-x-2 items-center">
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="Password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-blue-500"
              >
                Sign Up
              </Button>
              <Grid container className="flex justify-end">
                <Grid item>
                  <Typography onClick={() => router.push("/sign_in")}>
                    <Link className="cursor-pointer" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
        </Box>
        {/* <Divider
          sx={{
            mb: 4,
          }}
        >
          OR
        </Divider>
        <Button
          href={`${process.env.NEXT_PUBLIC_API_HOST}/auth/google`}
          fullWidth
          size="large"
          variant="outlined"
          startIcon={<GoogleSvg width={20} height={20} />}
        >
          Sign in with Google
        </Button> */}
      </Container>
    </Layout>
  );
}

export default observer(SignUp);
