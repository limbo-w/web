import { Container, CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import AccountInfo from "../components/AccountInfo";
import Layout from "../components/Layout";
import DealsItem from '../components/DealItem'


function EmptyData() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Image src="/emptyData.webp" alt="emptyData" width={230} height={230} />
      <Typography sx={{ mb: 1.5, color: "#cacbcc" }} color="text.secondary">
        Add your favorite deals for easy shopping and personalized deals.
      </Typography>
    </Box>
  )
}

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];


export default function Favorites() {
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
        <Box
         sx={{
          boxShadow: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
          flex: 1, 
          marginLeft: {
            xs: "0", md: "20px"
          }, 
          padding: "20px",
          borderRadius: "10px",
        }}>
          {
            featuredPosts.length > 0 ? <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <DealsItem key={post.title} post={post} />
            ))}
          </Grid> : <EmptyData></EmptyData>
          }       
        </Box>
      </Container>
    </Layout> 
  )
}