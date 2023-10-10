import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import ClothingSvg from "../../public/clothing.svg";
import BeautySvg from "../../public/beauty.svg";
import ElectronicsSvg from "../../public/electronics.svg";
import BabySvg from "../../public/baby.svg";
import HomeSvg from "../../public/home.svg";
import CollegeSvg from "../../public/college.svg";
import HellSvg from "../../public/heel.svg";
import OthersSvg from "../../public/others.svg";
import HandleBag from "../../public/handbag.svg";
import Link from "next/link";
import DealSwiperItem from "../../components/Swiper/deal-card1";
import { useState } from "react";
import { fetchDeals, fetchCategories } from "../../server/api/deals";
import MostClickedDeals from "../../components/MostClickedDeals";
import Layout from "../../components/Layout";
import Like from "../../public/like.svg";
import NoLike from "../../public/no_like.svg";
import Share from "../../public/share.svg";
import Comments from "../../public/comments.svg";
import models from "../../components/Models";
import styles from "./index.module.css";
import classnames from "classnames";
import Swiper from "../../components/Swiper/recommend";
import Images from "next/image";
import { swiperList } from "../../mock/deals";
import { createFromIconfontCN } from "@ant-design/icons";
// import './index.module.css';

const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2755491_y8jth2uh6i.js", // 在 iconfont.cn 上生成
});
const commentsData = [
  {
    name: "Olaniyan Wahab",
    date: "Sep 26, 2022",
    content: "Lovely price",
    avatar: "",
  },
  {
    name: "Olaniyan Wahab",
    date: "Sep 26, 2022",
    content: "Lovely price",
    avatar: "",
  },
  {
    name: "Olaniyan Wahab",
    date: "Sep 26, 2022",
    content: "Lovely price",
    avatar: "",
  },
  {
    name: "Olaniyan Wahab",
    date: "Sep 26, 2022",
    content: "Lovely price",
    avatar: "",
  },
  {
    name: "Olaniyan Wahab",
    date: "Sep 26, 2022",
    content: "Lovely price",
    avatar: "",
  },
];

export default function Deals({ post, deals, Related, categories }) {
  const [isLike, setIsLike] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));
  const date = new Date(post?.endedAt);
  const { category, page, search } = router.query;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    // console.log(post.isLike);
    // post.isLike = !post.isLike;
  };
  const categorys = [
    {
      title: "Clothing",
      category: "f1ea243c-0d83-409d-b3a1-029dcb29dc2c",
      id: "f1ea243c-0d83-409d-b3a1-029dcb29dc2c",
      image: (color) => <ClothingSvg fill={"white"} width={20} height={20} />,
    },
    // {
    //   title: "Shoes",
    //   category: "shoes",
    //   id:"6a330482-7cae-46b5-9a77-8a126b609137",
    //   image: (color) => <HellSvg fill={color} width={20} height={20} />,
    // },
    {
      title: "Teenager/College Students",
      category: "0106eec0-679c-4678-8758-0d3e9771d05a",
      id: "0106eec0-679c-4678-8758-0d3e9771d05a",
      image: (color) => <HellSvg fill={"white"} width={20} height={20} />,
    },
    {
      title: "Beauty & Health",
      category: "54bc6304-4f9f-476b-bf1d-a5c3f3ea2f28",
      id: "54bc6304-4f9f-476b-bf1d-a5c3f3ea2f28",
      image: (color) => <BeautySvg fill={"white"} width={20} height={20} />,
    },
    // {
    //   title: "Handbags & Jewelry",
    //   category: "Handbags",
    //   id:"112afe64-95ee-4393-8138-4acb6cd64cbe",
    //   image: (color) => <HandleBag fill={color} width={20} height={20} />,
    // },
    {
      title: "Home & Pets",
      category: "students",
      id: "7dbef55c-cbf1-4e77-9475-ce69193c68e8",
      image: (color) => <HomeSvg fill={"white"} width={20} height={20} />,
    },
    {
      title: "Baby & Kids",
      category: "kids-babies",
      id: "8fd62ef9-c97d-4ee2-980a-330a5a01532e",
      image: (color) => <BabySvg fill={"white"} width={20} height={20} />,
    },
    {
      title: "Electronics",
      category: "electronics",
      id: "307e1d83-ae39-4fcf-bcd7-7d7aa64b14f6",
      image: (color) => (
        <ElectronicsSvg fill={"white"} width={20} height={20} />
      ),
    },
    {
      title: "Others",
      category: "others",
      id: "124af373-2189-4041-bc30-3a87efad7c4d",
      image: (color) => <OthersSvg fill={"white"} width={20} height={20} />,
    },
  ];
  const ACTIVE_COLOR = "#0070f3";
  return (
    <Layout>
      <div className="container  m-6 mx-auto overflow-hidden md:pl-5 md:pr-5">
        <div className="absolute categories left-0   flex justify-center w-full pt-2 overflow-hidden bg-blue-500 top-20 text-gray-50">
          <List
            sx={{
              display: "flex",
              overflow: "scroll",
              paddingTop: 0,
            }}
            className="w-4/4 md:w-3/4  pb-0 mb-0 "
          >
            {/* <div className="flex mx-auto space-x-2 text-white "> */}
            {categories.map((currentCategory, index) => {
              const ICON = currentCategory.icon;
              return (
                <ListItem
                  sx={{
                    cursor: "pointer",
                    paddingTop: 0,
                    width: "100%",
                    paddingBottom: 0,

                    mr: "20px",
                    color:
                      category === currentCategory.id ? ACTIVE_COLOR : null,
                  }}
                  key={index}
                  onClick={() => {
                    // router.query.category = currentCategory.id;
                    router.push({
                      pathname: "/",
                      query: {
                        category: currentCategory.id,
                      },
                    });
                  }}
                >
                  {/* <svg xmlns={currentCategory.icon}></svg> */}
                  {/* <img className={classnames( "category-icon-white",{
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
          {/* </div> */}
        </div>
        <div className="mb-10"></div>
        <Breadcrumbs
          separator=">"
          aria-label="breadcrumb"
          sx={{
            fontSize: {
              xs: "1rem",
              md: "14px",
            },
          }}
          className="pl-32 pr-32"
        >
          <Link color="inherit" href="/">
            Deals
          </Link>
          <Link
            className="cursor-pointer"
            color="inherit"
            href={`/?category=${post.categoryID}&page=1`}
          >
            <div>{post?.categoryName}</div>
          </Link>
          <Typography
            sx={{
              maxWidth: {
                xs: "150px",
                md: "300px",
              },
              paddingLeft: "30px",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
              WebkitLineClamp: 1,
            }}
          >
            {post?.title}
          </Typography>
          {/* <MyIcon type="icon-jiankangma" /> */}
        </Breadcrumbs>
        <Grid item xs={12} md={12} mt={2} className="pl-32 pr-32">
          <Card sx={{ boxShadow: "none", backgroundColor: "unset" }}>
            <div className="relative flex h-auto mb-10 space-x-4">
              <div className="aspect-[3.5/2] min-w-[260px] h-[150px] relative">
                <Images
                  priority
                  placeholder="empty"
                  src={post.image}
                  width={260}
                  height={150}
                  objectFit="contain"
                  className="aspect-[3.5/2] min-w-[260px] rounded-lg cursor-pointer"
                  alt="Picture of the author"
                  onClick={() => {
                    router.push(post.link);
                  }}
                />
                <div className="absolute border-4 shadow border-white border-solid rounded-full avatar left-4 bottom-3 border-round">
                  <div className="w-8 rounded-full">
                    <img
                      className="object-cover"
                      src={`${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${post.brandIMG}`}
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                    {/* <img src="https://c.static-nike.com/a/images/w_1200,c_limit/bzl2wmsfh7kgdkufrrjq/seo-title.jpg" /> */}
                  </div>
                </div>
                <Box
                  component="div"
                  className="flex items-center w-full pt-4 ml-2"
                >
                  <Button
                    size="large"
                    onClick={() => {
                      router.push(post.link);
                    }}
                    variant="contained"
                    sx={{
                      padding: "10px",
                      maxHeight: "44px",
                      minWidth: "200px",
                    }}
                    className="bg-blue-500 w-[100px] rounded-none"
                  >
                    Buy it now
                  </Button>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="ml-1"
                  >
                    <Typography
                      variant="h6"
                      color="inherit"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mr: "0rem",
                      }}
                      className="cursor-pointer fill-gray-400 hover:fill-red-500"
                      onClick={handleLikeClick}
                    >
                      {post.isLike ? (
                        <Typography
                          variant="h6"
                          color="inherit"
                          component="div"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mr: "1rem",
                          }}
                          className="cursor-pointer fill-gray-400 hover:fill-red-500"
                        >
                          <Like
                            width={24}
                            height={24}
                            className="cursor-pointer fill-gray-400 hover:fill-red-500"
                          />
                          <div
                            className="text-gray-400 hover:text-red-500"
                            style={{ fontSize: "16px", marginLeft: "0.5rem" }}
                          >
                            Like
                          </div>
                        </Typography>
                      ) : (
                        <div
                          className={classnames(
                            styles.tooltip,
                            "flex text-base items-center space-x-2 hover:text-red-500 hover:fill-red-500"
                          )}
                        >
                          <span
                            className={classnames(
                              styles.tooltiptext,
                              "text-base"
                            )}
                          >
                            Add to Your Favorite
                          </span>
                          <Like
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="w-6 h-6 mt-1 cursor-pointer fill-gray-400 hover:fill-red-500"
                          ></Like>
                          {/* <span>Like</span> */}
                        </div>
                      )}
                    </Typography>
                    <div
                      className={classnames(
                        styles.tooltip,
                        "flex  items-center space-x-2 hover:text-yellow-500 hover:fill-yellow-500"
                      )}
                    >
                      <span
                        className={classnames(styles.tooltiptext, "text-base")}
                      >
                        Share Link With Your Friends
                      </span>
                      <Share
                        onClick={(e) => {
                          e.stopPropagation();
                          models.share({
                            content: post.link,
                          });
                        }}
                        className="w-6 h-6 mt-1 cursor-pointer fill-gray-400 hover:fill-yellow-500"
                      ></Share>
                      {/* <span >Share</span> */}
                    </div>
                  </Box>
                </Box>
              </div>
              <Box>
                <div
                  onClick={() => {
                    router.push(post.link);
                  }}
                  className="text-xl ml-8 font-medium md:text-xl css2Overflow-ellipsis"
                >
                  {post?.title}
                </div>
                <div className="flex ml-8 space-x-2 text-lg">
                  <div className="font-bold text-red-400 md:text-2xl">
                    {post?.price !== 0 &&
                    post?.price !== "0" &&
                    post?.price !== undefined
                      ? `$${post?.price}`
                      : null}
                  </div>
                  <div className="text-gray-500 line-through md:text-2xl">
                    {post?.oldPrice !== 0 &&
                    post?.oldPrice &&
                    post?.oldPrice !== "0" &&
                    post?.oldPrice !== "-" &&
                    post?.oldPrice !== undefined
                      ? `$${post?.oldPrice}`
                      : null}
                  </div>
                  {/* <div className="p-1 text-yellow-600 bg-yellow-100 rounded-lg whitespace-nowrap">
                    49.74% Cash Back*
                  </div> */}
                </div>

                <Typography variant="subtitle1" color="text.secondary">
                  {post.date}
                </Typography>
                {/* <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography> */}
                {/* <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography> */}
                <span className="text-[16px] font-medium ml-8">
                  {post.isExpired ? 'Expired' : `Ends at ${date.toDateString().split(" ")[1]} ${date.getDate()}`}
                </span>
                {/* <div className="border-dotted border-t-2 border-gray-500 ..."></div> */}
                <div className="w-full p-4 pl-0 overflow-hidden rounded-lg ">
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: post?.description }}
                  ></div>
                </div>
                {/* <div className="border-dotted border-t-2 border-gray-500 ..."></div> */}
              </Box>
              {/* <MostClickedDeals></MostClickedDeals> */}
            </div>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
                paddingLeft: 0,
              }}
            ></CardContent>
          </Card>
        </Grid>
        <div className="pl-32 pr-32 mt-6">
          <div className="mb-8 text-xl font-bold">
            Related Deals Recommendation
          </div>
          <Swiper swiperList={Related}></Swiper>
        </div>
        <div className="grid grid-cols-4 gap-4 pl-32 pr-32 mt-8">
          {deals.map((element, index) => {
            return (
              <DealSwiperItem
                key={element.title}
                data={element}
                className="box-content flex-grow w-56 p-6 m-0 border-white h-80 hover:shadow-md"
              ></DealSwiperItem>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log(context, "context");
  const post = {
    title: context.query.title ? context.query.title : "null",
    image: `${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${context.query.image}`,
    description: context.query.description,
    price: context.query.price,
    oldPrice: context.query.oldPrice,
    endedAt: context.query.endedAt,
    categoryName: context.query.categoryName,
    categoryID: context.query.categoryID,
    link: context.query.link,
    brandIMG: context.query.brandIMG,
  };
  const deals = await fetchDeals({
    categories: context.query.categoryID,
    orderBy: "custom",
  });
  const Related = await fetchDeals({
    categories: context.query.categoryID,
    orderBy: "custom",
    isTop: true,
  });
  const categories = await fetchCategories();
  console.log(deals, "deals");
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      deals: deals.items,
      Related: Related.items,
      categories: categories,
    },
  };
}
