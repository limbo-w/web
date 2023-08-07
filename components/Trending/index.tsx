import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DealsItem from "../DealItem";
import Image from "next/image";
import { Container, List, ListItem, Pagination, Stack } from "@mui/material";
import { useRouter } from "next/router";
import HotSvg from "../../public/hot.svg";
import ClothingSvg from "../../public/clothing.svg";
import BeautySvg from "../../public/beauty.svg";
import ElectronicsSvg from "../../public/electronics.svg";
import BabySvg from "../../public/baby.svg";
import HomeSvg from "../../public/home.svg";
import CollegeSvg from "../../public/college.svg";
import HellSvg from "../../public/heel.svg";
import OthersSvg from "../../public/others.svg";
import HandleBag from "../../public/handbag.svg";
import Swiper from "../Swiper";
import classnames from "classnames";
import { fetchCategories } from "../../server/api/deals";


const swiperList = [
  {
    title: "Featured post item example",
    price: "9.9",
    description: "This is a wider card1.",
    image: "https://source.unsplash.com/random/?book",
  },
  {
    title: "Featured post item example",
    price: "9.9",
    description: "This is a wider card2.",
    image: "https://source.unsplash.com/random/?shop",
  },
  {
    title: "Featured post item example",
    price: "9.9",
    description: "This is a wider card3.",
    image: "https://source.unsplash.com/random/?food",
  },
  {
    title: "Featured post item example",
    price: "9.9",
    description: "This is a wider card.",
    image: "https://source.unsplash.com/random?medicine",
  },
  {
    title: "Featured post item example",
    price: "9.9",
    description: "This is a wider card3.",
    image: "https://source.unsplash.com/random?food",
  },
  {
    title: "Featured post item example",
    price: "9.9",
    description: "This is a wider card.",
    image: "https://source.unsplash.com/random?drink",
  },
];
const ACTIVE_COLOR = "#0070f3";

// const categorys = [
//   {
//     title: "Clothing",
//     category: "f1ea243c-0d83-409d-b3a1-029dcb29dc2c",
//     id: "f1ea243c-0d83-409d-b3a1-029dcb29dc2c",
//     image: (color) => <ClothingSvg fill={color} width={20} height={20} />,
//   },
//   // {
//   //   title: "Shoes",
//   //   category: "shoes",
//   //   id:"6a330482-7cae-46b5-9a77-8a126b609137",
//   //   image: (color) => <HellSvg fill={color} width={20} height={20} />,
//   // },
//   {
//     title: "Teenager/College Students",
//     category: "0106eec0-679c-4678-8758-0d3e9771d05a",
//     id: "0106eec0-679c-4678-8758-0d3e9771d05a",
//     image: (color) => <HellSvg fill={color} width={20} height={20} />,
//   },
//   {
//     title: "Beauty & Health",
//     category: "54bc6304-4f9f-476b-bf1d-a5c3f3ea2f28",
//     id: "54bc6304-4f9f-476b-bf1d-a5c3f3ea2f28",
//     image: (color) => <BeautySvg fill={color} width={20} height={20} />,
//   },
//   // {
//   //   title: "Handbags & Jewelry",
//   //   category: "Handbags",
//   //   id:"112afe64-95ee-4393-8138-4acb6cd64cbe",
//   //   image: (color) => <HandleBag fill={color} width={20} height={20} />,
//   // },
//   {
//     title: "Home & Pets",
//     category: "students",
//     id: "7dbef55c-cbf1-4e77-9475-ce69193c68e8",
//     image: (color) => <HomeSvg fill={color} width={20} height={20} />,
//   },
//   {
//     title: "Baby & Kids",
//     category: "kids-babies",
//     id: "8fd62ef9-c97d-4ee2-980a-330a5a01532e",
//     image: (color) => <BabySvg fill={color} width={20} height={20} />,
//   },
//   {
//     title: "Electronics",
//     category: "electronics",
//     id: "307e1d83-ae39-4fcf-bcd7-7d7aa64b14f6",
//     image: (color) => <ElectronicsSvg fill={color} width={20} height={20} />,
//   },
//   {
//     title: "Others",
//     category: "others",
//     id: "124af373-2189-4041-bc30-3a87efad7c4d",
//     image: (color) => <OthersSvg fill={color} width={20} height={20} />,
//   },
// ];

function EmptyData() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image src="/emptyData.webp" alt="emptyData" width={230} height={230} />
      <Typography sx={{ mb: 1.5, color: "#cacbcc" }} color="text.secondary">
        Add your favorite deals for easy shopping and personalized deals.
      </Typography>
    </Box>
  );
}

interface ITrendingProps {
  deals: any[];
  swiperList: any[];
  totalPages: any;
  categories:any[];
}

export default function Trending(props: ITrendingProps) {
  const router = useRouter();
  const [pageCurrent, setPage] = React.useState(1);
  const { category, page, search } = router.query;
  React.useEffect(() => {
    setPage(1);
    router.query.page = "1";
  }, [category, search]);
  return (
    <Box
      sx={{
        flex: 1,
        marginLeft: {
          xs: "0",
          md: "5px",
        },
        padding: "5px 5px 5px",
      }}
      className="w-4/4 md:w-3/4 "
    >
      <Container
        sx={{
          mb: "20px",
          borderBottom: "1px solid rgb(226 232 240 / 80%);",
          paddingLeft: "0!important",
          paddingRight: "0!important",
        }}
        className="flex justify-around max-w-full"
      >
        <List
          sx={{
            display: "flex",
            overflow: "auto",
            paddingTop: 0,
          }}
          className="w-full"
        >
          {props.categories.map((currentCategory, index) => {
            const ICON = currentCategory.icon;
            return (
              <ListItem
                sx={{
                  cursor: "pointer",
                  paddingTop: 0,
                  width: "100%",
                  mr: "20px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  color: category === currentCategory.id ? ACTIVE_COLOR : "",
                }}
                key={index}
                onClick={() => {
                  router.query.category = currentCategory.id;
                  router.push(router);
                }}
              >
                {/* <svg xmlns={currentCategory.icon}></svg> */}
                 {/* <img className={classnames( "category-icon",{
                  "category-icon-blue": category === currentCategory.id,
                 })}  src={currentCategory.icon}></img> */}
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    marginLeft: "0.5rem",
                  }}
                  component="span"
                >
                  <div className="text-sm">
                    {" "}
                    <div> {currentCategory.name}</div>
                    <div>Deals</div>
                  </div>
                </Typography>
              </ListItem>
            );
          })}
          
           
        </List>
      </Container>
      <Swiper
        swiperList={props.swiperList ? props.swiperList : swiperList}
      ></Swiper>
      {/* <div className="mb-0.5"></div> */}
      {props?.deals.length > 0 ? (
        <Grid
          className="flex flex-col p-2 pt-0 mt-0 md:flex-row"
          container
          spacing={6}
        >
          {props.deals.map((post) => (
            <DealsItem key={post} post={post} />
          ))}
        </Grid>
      ) : (
        <EmptyData></EmptyData>
      )}
      <Stack
        spacing={2}
        sx={{
          mt: 4,
          mb: 2,
          width: "100%",
        }}
        className="w-full"
      >
        <Pagination
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
          page={pageCurrent}
          onChange={(e, newPage) => {
            setPage(newPage);
            router.query.page = String(newPage);
            router.push(router);
          }}
          className="w-full"
          count={props.totalPages}
          color="primary"
          size="large"
        />
      </Stack>
    </Box>
  );
}

