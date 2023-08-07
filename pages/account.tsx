import Layout from "../components/Layout";
import AccountInfo from "../components/AccountInfo";
import AccountSettings from "../components/AccountSettings";
import { Card, Container, CssBaseline } from "@mui/material";

export default function Account() {
  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: { xs: "unset", md: "flex" },
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <AccountInfo></AccountInfo>
        <Card
          sx={{
            flex: 1,
            marginLeft: {
              xs: "0",
              md: "20px",
            },
            padding: "20px",
          }}
        >
          <AccountSettings></AccountSettings>
        </Card>
      </Container>
    </Layout>
  );
}
