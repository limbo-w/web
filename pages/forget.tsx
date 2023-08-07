import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import * as RouteLink from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/Layout";
import { sendResetPasswordCodeApi,resetPasswordByCode } from "../server/api/user";
import message from "../components/Message";
export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [result, setResult] = React.useState("");
  const [isSend, setIsSend] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await sendResetPasswordCodeApi({
        email: email,
      });
      message.success({ content: "send successfully" });
      setIsSend(true);
    } catch (error) {
      message.error({ content: "send fail" });
    }
  };
  // const sendResetPasswordCode = async (event) => {
  //   const result = await sendResetPasswordCodeApi({
  //     email: email,
  //   });
  // }
  const resetPassword = async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const result = await resetPasswordByCode({
        email: data.get("email"),
        code: data.get("code"),
        password: data.get("password"),
        plainPassword: data.get("plainPassword"),
      })
    } catch (error) {
      
    }
  }
  return (
    <Layout>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {!isSend ? (
          <Box
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #cacbcc",
              padding: "20px",
            }}
          >
            <Typography component="h1" variant="h5">
              Reset your password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                placeholder="Enter your email address"
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="bg-blue-500"
              >
                Send reset password link
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            component="form"
            noValidate
            onSubmit={resetPassword}
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #cacbcc",
              padding: "20px",
            }}
          >
             <Typography component="h1" variant="h5" className="mb-8">
              Reset your password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} className="flex space-x-2 items-center">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="code"
                  label="code"
                  type="text"
                  id="code"
                  autoComplete="code"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="plainPassword"
                  label="plainPassword"
                  type="password"
                  id="plainPassword"
                  autoComplete="plainPassword"
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
              Reset Password
            </Button>
          </Box>
        )}
      </Container>
    </Layout>
  );
}
