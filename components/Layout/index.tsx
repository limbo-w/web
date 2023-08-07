import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from '@mui/material/Link';
import Header from "../Header";

interface ILayoutProps {
  children?: any;
  title?: string;
}

function Copyright() {
  return (
    <Typography variant="body2" align="center" className="text-gray-50 space-x-2">
      <span>{'Copyright © '}</span>
      <Link color="inherit" href="https://mui.com/" className="text-gray-300 text-sm">
        goflashdeal
      </Link>{' '}
      {new Date().getFullYear()}
      <span> {'.'}</span>
    </Typography>
  );
}

export default function Layout({ children, title }: ILayoutProps) {
  return (
    <Container style={{ padding: 0 }} maxWidth={false} className="overflow-hidden">
      <Head>
        <title>{title || "GoFlashDeals  | Save Time & Money"}</title>
        <meta
          name="description"
          content="GoFlashDeals Shopping | Save Time & Money"
        />
        <meta
          name="keywords"
          content="GoFlashDeals Shopping | Save Time & Money"
        ></meta>
        <meta
          property="og:title"
          content="GoFlashDeals Shopping | Save Time & Money"
        ></meta>
        <meta
          property="og:description"
          content="GoFlashDeals Shopping | Save Time & Money"
        ></meta>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className="min-h-screen flex  flex-col justify-between">
        {children}
        {/* Footer */}
        <footer className=" bg-gray-500  text-center
          lg:text-left ">
          <div className="text-gray-100 h-8 pt-2 justify-center flex items-center" >
            ©2023 Copyright:
            <a className="text-gray-100">
              Goflashdeal
            </a>
          </div>
        </footer>
      </div>
      {/* End footer */}
    </Container>
  );
}
