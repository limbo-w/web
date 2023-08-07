import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import AccountInfo from "../components/AccountInfo";
import Image from "next/image";
import stores from "../stores";



function GiftCard(props) {
  const { post } = props;
  console.log(post, "post");

  return (
    <Grid item xs={12} md={3}>
      <Card>
        {/* <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            display: { xs: "none", sm: "block" },
            marginTop: "16px",
          }}
          image={post}
          alt="$50"
        /> */}
        <div className="pl-4 font-medium">Coupons</div>
        <CardContent className="flex items-center" sx={{ display: "flex",  paddingBottom: "12px!important" }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              lineHeight: 1.57,
              margin: "0px 0px 0.35em",
            }}
            className="relative"
          >
            {/* <Image src="/coin.webp" alt="coin" width={22} height={22} />{" "} */}
            <span style={{ marginLeft: "4px" }}>{post.coupon}</span>
            {/* <div className="absolute border-4 border-white border-solid rounded-full avatar left-4 bottom-3 border-round">
                  <div className="w-8 rounded-full">
                    <img src="https://c.static-nike.com/a/images/w_1200,c_limit/bzl2wmsfh7kgdkufrrjq/seo-title.jpg" />
                  </div>
                </div> */}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.57,
              margin: "0px 0px 0",
            }}
            className="font-semibold"
          >
            {post}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

GiftCard.propTypes = {
  post: PropTypes.shape({
    money: PropTypes.string.isRequired,
    coupon: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Redeem() {
  const { commonStore } = stores;
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
          <Typography component="h1" variant="h5">
            Redeem for Gift Card
          </Typography>

          <Grid container spacing={4} className="mt-1">
            {commonStore.userProfile?.coupons?.map((post, index) => (
              <GiftCard key={index} post={post} />
            ))}
          </Grid>
        </Card>
      </Container>
    </Layout>
  );
}
