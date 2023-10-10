import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Images from "next/image";
import { useRouter } from "next/router";
import Like from "../../public/like.svg";
import NoLike from "../../public/no_like.svg";
import Share from "../../public/share_link.svg";
import models from "../Models";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import useSWR from "swr";
import { cancelFavoriteDeal, favoriteDeal } from "../../server/api/deals";
function DealsItem(props) {
  console.log(props.post, props.post.isLiked, "props");
  const router = useRouter();
  const { post } = props;
  const handleLikeClick = (e) => {
    e.stopPropagation();
    // console.log(post.isLike);
    // post.isLike = !post.isLike;
  };
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(`https://goflash.pincman.com/api/manage/shop/brands/${post.brand.id}`, fetcher)
  const [src, setSrc] = useState(post.image as string);
  const [isFlag, setIsFlag] = useState(true);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const date = new Date(post?.endedAt)
  // const handleOnLoad = () => {
  //   const imgDom = new Image();
  //   imgDom.src = post.image;
  //   imgDom.onload = function () {
  //     setIsFlag(true);
  //     setSrc(post.image);
  //   };
  //   imgDom.onerror = function () {
  //     setIsFlag(false);
  //     setSrc(post.image);
  //     //   setSrc(props.errorImg as string);
  //   };
  // };
  // useEffect(() => {
  //   setIsFlag(false);
  //   handleOnLoad();
  // }, []);
  return (
    <Grid item className="w-1/1 md:w-1/2 " sx={{paddingTop:"24px"}}>
      <Card
        onClick={() => {
          router.push({
            pathname:"/deals/1",
            query:{
              image:post.image?.id + post.image?.ext,
              title:post?.title,
              price:post?.price,
              oldPrice:post?.oldPrice,
              description:post?.description,
              endedAt:post?.endedAt,
              categoryName:post?.categories?.[0].name,
              categoryID:post?.categories?.[0]?.id,
              link:post?.link,
              brandIMG:post?.brand?.logo?.id + post.brand?.logo?.ext,
            }
          });
        }}
        sx={{
          display: "flex",
          backgroundColor: "unset",
          borderBottom: "1px solid #d9e1ec",
          boxShadow: "none",
        }}
        className="shadow cursor-pointer rounded-3xl hover:shadow-md"
      >
        <CardContent sx={{ flex: 1 }}>
          <Box className="flex items-center justify-between w-full h-full space-x-4">
            {isFlag ? (
              <div className="relative w-20 sm:w-auto">
                {post.image ? (
                  <Images
                    priority
                    src={`${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${post.image?.id}${post.image?.ext}`}
                    width={240}
                    height={150}
                    objectFit="contain"
                    className="rounded-lg"
                    alt="Picture of the author"
                  />
                ) : null}
                <div className="absolute border-4 border-white border-solid rounded-full avatar left-4 bottom-3 border-round">
                  <div className="w-10 rounded-full">
                    {post.brand ? (
                      <Images
                        priority
                        src={`${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${post.brand?.logo?.id}${post.brand?.logo?.ext}`}
                        width={50}
                        height={50}
                        className="rounded-lg object-contain bg-white"
                        alt="Picture of the author"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              // <CardMedia
              //   component="img"
              //   sx={{
              //     width: 150,
              //     height: 120,
              //     display: { xs: "none", sm: "block" },
              //   }}
              //   image={src}
              //   alt={post?.imageLabel}
              //   className="aspect-[3.5/2]"
              // />
              <div className="object-cover w-36 h-32 max-w-xs aspect-[3.5/2] animate-pulse bg-gray-300"></div>
            )}

            <div className="flex flex-col justify-between w-1/2 h-full">
              <div className="text-xs  font-medium md:text-base css2Overflow-ellipsis">
                {post?.title}
              </div>
              <div className="text-sm font-medium">{post.isExpired ? 'Expired' : `Ends at ${date.toDateString().split(" ")[1]} ${date.getDate()}`}</div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="font-bold text-red-400">{post.price !== '0' && post.price !== 0 ?`$${post.price}`:null}</div>
                  <div className="text-gray-500 line-through">
                    {post.oldPrice !== '0' && post?.oldPrice && post?.oldPrice !== '-' && post.oldPrice !== 0  ? `$${post.oldPrice}` :null}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {
                    !isLiked ? (<div className={styles.tooltip}>
                      <span className={styles.tooltiptext}>
                        Add to Your Favorite
                      </span>
                      <Like
                        onClick={(e) => {
                          e.stopPropagation();
                          favoriteDeal(post?.id).then((success: boolean) => {
                            success && setIsLiked(true);
                          });
                        }}
                        className="w-4 h-4 mt-1 cursor-pointer fill-gray-400 hover:fill-red-500"
                      ></Like>
                    </div>) : (<div className={styles.tooltip}>
                    <span className={styles.tooltiptext}>
                      Remove From Your Favorite
                    </span>
                    <NoLike
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelFavoriteDeal(post?.id).then((success: boolean) => {
                          success && setIsLiked(false);
                        });
                      }}
                      className="w-4 h-4 mt-1 cursor-pointer fill-gray-400 hover:fill-red-500"
                    ></NoLike>
                  </div>)
                  }
                  
                  <div className={styles.tooltip}>
                    <span className={styles.tooltiptext}>
                      Share Link With Your Friends
                    </span>
                    <Share
                      onClick={(e) => {
                        e.stopPropagation();
                        models.share({
                          content: post.link,
                        });
                      }}
                      className="w-4 h-4 mt-1 cursor-pointer fill-gray-400 hover:fill-yellow-500"
                    ></Share>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-24 h-8 text-xs font-medium leading-8 text-center text-blue-800 align-middle rounded shadow cursor-pointer bg-gray-50 hover:shadow-md md:text-base md:leading-8 ">
              Shop Now
            </div>
            {/* <Box>
              <Typography component="h2" variant="h5">
                {post?.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {post?.date}
              </Typography>
            </Box> */}
          </Box>
          {/* <Typography
            variant="caption"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "20px",
            }}
            color="inherit"
          >
            <span>a days ago | xxx</span>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: "2rem",
                }}
                onClick={handleLikeClick}
              >
                {post?.isLike ? (
                  <Like  className="fill-red-500 hover:fill-red-600" width={24} height={24} />
                ) : (
                  <NoLike  className="fill-gray-400 hover:fill-red-500" width={24} height={24} />
                )}

              </Typography>
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: "1rem",
                }}
              >
                <Share  width={24} height={24}
                className="fill-gray-400 hover:fill-yellow-500"
                />
              </Typography>
            </Box>
          </Typography> */}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default DealsItem;
