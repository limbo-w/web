import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import { CardMedia } from "@mui/material";
import TopSvg from "../../public/top.svg";
import Like from "../../public/like.svg";
import Share from "../../public/share_link.svg";
import models from "../Models";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const data = [
  {
    src: "https://source.unsplash.com/random/?medicien",
    title: "Title and link And example",
    cashBack: "13",
    company: "Crocs",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?food",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?city",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?keyboard",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?computer",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?bag",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?book",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?coffee",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?tea",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?drink",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
  {
    src: "https://source.unsplash.com/random/?city",
    title: "Title and link And example",
    cashBack: "1.2",
    company: "Dell Small Business",
    money: "$40.00",
    expire: "Nov 12",
  },
];

function Media(props) {
  const { loading = false } = props;
  const router = useRouter();

  return (
    <Grid container className="w-full flex flex-row md:flex-col">
      {(loading ? Array.from(new Array(10)) : data).map((item, index) => (
        <Box
          key={index}
          sx={{ marginRight: 0.5, my: 1, display: "flex" }}
          className="w-full"
        >
          {item ? (
            <CardMedia
              component="img"
              sx={{
                width: 80,
                height: 90,
                marginRight: "8px",
              }}
              image={item.src}
              alt={item.title}
              src={item.src}
              onClick={() => {
                router.push("/deals/1");
              }}
              className="aspect-[3.5/2] cursor-pointer"
            />
          ) : (
            <Skeleton variant="rectangular" />
          )}

          {item ? (
            <div className="flex items-center	w-full justify-between">
              <Box sx={{ pr: 2 }} className="w-full">
                <div
                  className="font-medium overflow-hidden text-base md:text-xl
                "
                >
                  {item.title}
                </div>
                {/* <Typography
                display="block"
                variant="caption"
                color="text.secondary"
              >
                {item.cashBack}
              </Typography> */}
                {/* <div className="text-gray-300 font-medium text-sm"> */}
                <div className="font-medium text-sm">
                  Ends at {item.expire}
                </div>
                {/* <Typography variant="caption" component="p">
                {item.company}
              </Typography> */}
                <div className="flex justify-between ">
                  <div className="flex space-x-2">
                    <div className="text-red-400 font-bold">$9.9</div>
                    <div className="line-through text-gray-500"> $19.9</div>
                  </div>{" "}
                  <div className="flex space-x-2">
                    <div className={styles.tooltip}>
                      <span className={styles.tooltiptext}>
                        Add to Your Favorite
                      </span>
                      <Like
                        className="
                      mt-1
                      w-4 h-4
                      cursor-pointer
                      fill-gray-400 hover:fill-red-500"
                      ></Like>
                    </div>
                    <div className={styles.tooltip}>
                      <span className={styles.tooltiptext}>
                        Share Link With Your Friends
                      </span>
                      <Share
                        onClick={() => {
                          models.share({ content: "flash deal" });
                        }}
                        className="
                      mt-1
                      w-4 h-4
                      cursor-pointer
                      fill-gray-400 hover:fill-yellow-500"
                      ></Share>
                    </div>
                  </div>
                </div>
              </Box>
              <div
                onClick={() => {
                  router.push("/deals/1");
                }}
                className="font-medium	bg-gray-50
              text-sm
              h-8 w-24 rounded text-center leading-8	cursor-pointer	hover:shadow-md
              text-blue-800 shadow
              "
              >
                Shop Now
              </div>
            </div>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

// Media.propTypes = {
//   loading: PropTypes.bool,
// };

export default function MostClickedDeals() {
  return (
    <div className="w-4/4 h-1/2  ml-5 mr-5 overflow-hidden shadow p-2 md:1/4 md:ml-2 md:mr-2">
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
        component="h2"
        variant="h5"
      >
        <TopSvg
          width={32}
          height={32}
          style={{
            marginRight: "12px",
          }}
        />
        Flash Deals
      </Typography>
      <Media />
    </div>
  );
}
