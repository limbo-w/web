import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/Layout";
import AccountInfo from "../components/AccountInfo";
import Image from "next/image";
import { useState } from "react";
import CopySvg from "../public/copy.svg";
import CloseIcon from "@mui/icons-material/Close";

export default function Invite() {
  // const [isCopied,setIsCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCopyClick = () => {
    setOpen(true);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: { xs: "unset", md: "flex" },
          marginTop: 4,
        }}
      >
        <AccountInfo></AccountInfo>
        <Box
          sx={{
            marginLeft: {
              xs: "0",
              md: "20px",
            },
            padding: {
              xs: "0",
              md: "0 20px",
            },
          }}
        >
          <Image
            src="/invite.jpg"
            alt="invite"
            width={1170}
            height={400}
          />
          <Box
            sx={{
              margin: "40px 0",
            }}
          >
            <Typography
              component="h6"
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "28px",
              }}
            >
              Share Your link
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{
                  flexBasis: "50%",
                  flexGrow: 0,
                  width: "50%",
                  maxWidth: "50%",
                  marginRight: "20px",
                }}
                value="https://fatcoupon.com/auth/sign-up?referrer=BID37CMTOHK"
              />
              <Button
                size="large"
                sx={{
                  fontWeight: 600,
                  borderRadius: "20px",
                  padding: "6px 40px",
                  fontFamily: "Rakuten Sans UI Semibold",
                }}
                className="bg-blue-500"
                variant="contained"
                onClick={handleCopyClick}
                startIcon={<CopySvg fill="#fff" width={20} height={20} />}
              >
                Copy
              </Button>
            </Box>
          </Box>
          <Card sx={{ marginTop: "20px", padding: "20px" }}>
            <Typography component="h1" variant="h5">
              Referral Activity
            </Typography>
          </Card>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Copied"
        action={action}
      />
    </Layout>
  );
}
