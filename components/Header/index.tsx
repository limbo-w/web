import * as React from "react";
import { observer } from "mobx-react";
import Image from "next/image";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Notifications from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Popover from "@mui/material/Popover";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import RedeemSvg from "../../public/redeem.svg";
import OrdersSvg from "../../public/orders.svg";
import FavoriteSvg from "../../public/favorite.svg";
import AccountSvg from "../../public/account_settings.svg";
import LogOutSvg from "../../public/log_out.svg";
import stores from "../../stores";
import { getPushDeals } from "../../server/api/deals";
import { getUserProfile } from "../../server/api/user";
import svg3 from "./svg3.svg";
import Images from "next/image";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(3),
    width: "607px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  top: 0,
  right: 0,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: "1",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: "20px",
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function Header() {
  const router = useRouter();
  const { commonStore } = stores;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const socket = React.useRef<any | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchContent, setSearchContent] = React.useState("");
  // const [newDeals, setNewDeals] = React.useState();
  const [pushDeal, setPushDeal] = React.useState([]);
  const sendMessage = (token) => {
    if (!token) return;
    socket.current.send(
      JSON.stringify({
        event: "online",
        data: { token: token },
      })
    );
  };
  const initWSS = () => {
    const token = localStorage.getItem("token");
    const client = new WebSocket("wss://goflash.3rcd.com/ws");
    client.onmessage = (e) => {
      // setPushDeal(JSON.parse(e.data))
      console.log(JSON.parse(e.data), "pushDeal");
      const { message } = JSON.parse(e.data);
      if (message) {
        setPushDeal((old) => [...old, message]);
      }
    };
    client.onopen = (e) => {
      socket.current = client;
      if (!token) return;
      setTimeout(() => {
        sendMessage(token);
      }, 2000);
    };
    client.onclose = (e) => {
      // initWSS();
    };
  };
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    // getPushDeals().then((res) => {
    //   setPushDeal((prev) => [...prev, ...res]);
    // });
    // return;
    // initWSS();
    // const client = new WebSocket("wss://goflash.pincman.com/ws");
    // client.onmessage = (e) => {
    //   // setPushDeal(JSON.parse(e.data))
    //   console.log(JSON.parse(e.data), "pushDeal");
    //   const { message } = JSON.parse(e.data);
    //   if (message) {
    //     setPushDeal((old) => [...old, message]);
    //     // console.log(pushDeal,"pushDealpushDealpushDealpushDeal")
    //   }
    //   console.log(message, "onmessage");
    // };
    // client.onopen = (e) => {
    //   console.log(e, "open");
    //   setTimeout(() => {
    //     sendMessage(token);
    //   }, 3000);
    // };
    // client.onclose = (e) => {
    //   initWSS();
    // };
    // socket.current = client;
    if (!commonStore.userProfile && token) {
      getUserProfile().then((res) => {
        if (res.username) {
          commonStore.setUserProfile(res);
        }
      });
    }
    // getPushDeals().then((res) => {
    //   setPushDeal(res);
    // });
    return () => {
      socket.current && socket.current.close();
    };
  }, []);
  React.useEffect(() => {
    console.log(pushDeal, "pushDeal");
  }, [pushDeal]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (href?: string) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    href && router.push(href);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenUserMenu = () => {
    console.log();
  };

  const handleSignOut = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    commonStore.setUserProfile(undefined);
  };
  const [userInfo, setUserInfo] = React.useState<any>({
    avatar: commonStore.userProfile?.avatar,
    name: commonStore.userProfile?.nickname,
    Email: commonStore.userProfile?.email,
    country: commonStore.userProfile?.country,
    phone: commonStore.userProfile?.phone,
    gender: commonStore.userProfile?.gender,
    age: commonStore.userProfile?.age,
  });
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      sx={{
        width: "288px",
        fontFamily:
          'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      }}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => handleMenuClose("/redeem")}
        sx={{
          width: "288px",
          color: "rgb(17, 24, 39)",
          padding: "1rem 1.5rem",
        }}
      >
        <Image
          src={
            userInfo.avatar
              ? `${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${userInfo.avatar.id}${userInfo.avatar.ext}`
              : "/user_def.png"
          }
          alt="change"
          width={56}
          height={56}
          className="rounded-full"
        />
        {/* <AccountCircle
          style={{
            marginRight: "10px",
            width: "56px",
            height: "56px",
          }}
        /> */}
        <Box>
          <Typography
            onClick={() => handleMenuClose("/")}
            variant="h6"
            noWrap
            component="div"
          >
            {commonStore.userProfile?.nickname}
          </Typography>
          {/* <Typography
            onClick={() => handleMenuClose("/")}
            variant="h6"
            noWrap
            component="div"
          >
            {commonStore.userProfile?.name
              ? commonStore.userProfile.name
              : "unbound name"}
          </Typography> */}
        </Box>
      </MenuItem>
      {/* <MenuItem
        onClick={() => handleMenuClose("/favorites")}
        sx={{
          color: "rgb(17, 24, 39)",
          padding: "1rem 1.5rem",
        }}
      >
        <FavoriteSvg
          width={24}
          height={24}
          style={{
            marginRight: "1rem",
          }}
        />
        My Favorites
      </MenuItem> */}

      <MenuItem
        onClick={() => handleMenuClose("/orders")}
        sx={{
          color: "rgb(17, 24, 39)",
          padding: "1rem 1.5rem",
        }}
      >
        <OrdersSvg
          width={24}
          height={24}
          style={{
            marginRight: "1rem",
          }}
        />
        My Purchases
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuClose("/redeem")}
        sx={{
          color: "rgb(17, 24, 39)",
          padding: "1rem 1.5rem",
        }}
      >
        <RedeemSvg
          width={24}
          height={24}
          style={{
            marginRight: "1rem",
          }}
        />
        My Rewards
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuClose("/account")}
        sx={{
          color: "rgb(17, 24, 39)",
          padding: "1rem 1.5rem",
        }}
      >
        <AccountSvg
          width={24}
          height={24}
          style={{
            marginRight: "1rem",
          }}
        />
        Account Settings
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleSignOut}
        sx={{
          color: "rgb(245, 78, 81)",
          padding: "1rem 1.5rem",
        }}
      >
        <LogOutSvg
          fill="rgb(245, 78, 81)"
          width={24}
          height={24}
          style={{
            marginRight: "1rem",
          }}
        />
        Sign Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem onClick={() => handleMenuClose("/favorites")}>
        <span>My Favorites</span>
      </MenuItem> */}
      <MenuItem onClick={() => handleMenuClose("/orders")}>
        <span>Orders</span>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose("/account")}>
        <span>Account Settings</span>
      </MenuItem>
      <Divider></Divider>
      <MenuItem onClick={handleSignOut}>
        <span>Sign Out</span>
      </MenuItem>
    </Menu>
  );
  const [NotifyEl, setNotifyAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  // const { commonStore } = stores;

  const [openNotifications, setOpenNotifications] = React.useState(false);
  const handleClose = () => {
    setNotifyAnchorEl(null);
    setOpenNotifications(false);
  };
  const handleOpenNotifications = async (event) => {
    setOpenNotifications(true);
    setNotifyAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    // if(!commonStore){
    getUserProfile().then((res) => {
      if (res.username) {
        // setUserProfile(res)
        commonStore.setUserProfile(res);
        return;
        // router.reload();
      } else {
        localStorage.removeItem("token");
        commonStore.setUserProfile(undefined);
        router.push("/");
      }
    });
    // }
  }, []);
  return (
    <>
      <AppBar position="sticky" className="w-full ">
        <Toolbar className="flex xl:mx-auto xl:container pl-36 pr-36 local ">
          <div
            className="flex flex-col items-start content-center justify-center h-20 cursor-pointer w-35"
            onClick={() => handleMenuClose("/")}
          >
            <div className="flex items-center justify-start space-x-1">
              {" "}
              <Image
                src="/logo.png"
                alt="Vercel Logo"
                width={34}
                height={28}
                className="object-none"
              />
              <div className="text-lg font-bold">GoFlashDeals</div>
            </div>
            <div className="flex items-center justify-center text-base font-bold tracking-wider text-yellow-300 drop-shadow-md">
              Save Time and $
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Search className="cursor-pointer">
            <StyledInputBase
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              placeholder="search by category, retailer or brand"
              inputProps={{ "aria-label": "search" }}
              className="text-gray-900 rounded-lg bg-gray-50"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (searchContent) {
                    router.query.search = searchContent;
                  } else {
                    delete router.query.search;
                  }
                  router.push(router);
                }
              }}
            />
            <div
              className="z-30 cursor-pointer"
              onClick={() => {
                if (searchContent) {
                  router.query.search = searchContent;
                } else {
                  delete router.query.search;
                }
                router.push(router);
              }}
            >
              <SearchIconWrapper className="z-30 cursor-pointer pointer-events-auto">
                <SearchIcon className="z-30 text-blue-500 cursor-pointer" />
              </SearchIconWrapper>
            </div>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Typography
            className={styles.typography}
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              mr: { xs: "unset", md: "64px!important" },
            }}
          >
            <Link href="/invite">
              <span
                style={{
                  fontSize: "16px",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "normal",
                  WebkitLineClamp: "1",
                }}
              >
                Share Link With Your Friends
              </span>
            </Link>
            <PersonAddAltIcon
              style={{
                marginLeft: "6px",
              }}
            />
          </Typography> */}
          {commonStore.userProfile ? (
            <Box className="items-center hidden space-x-4 lg:flex">
              <div className="relative">
                <Notifications
                  aria-describedby={"describedby-menu"}
                  onClick={handleOpenNotifications}
                  className="cursor-pointer"
                ></Notifications>
              </div>
              <Typography
                className={styles.typography}
                variant="h6"
                color="inherit"
                component="div"
                // sx={{
                //   width: 180,
                //   display: "flex",
                //   justifyContent: "flex-end"
                // }}
                onClick={handleProfileMenuOpen}
              >
                <Image
                  src={
                    userInfo.avatar
                      ? `${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${userInfo.avatar.id}${userInfo.avatar.ext}`
                      : "/user_def.png"
                  }
                  alt="change"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                {/* <AccountCircle
                  style={{
                    marginRight: "5px",
                  }}
                /> */}
                <span className="ml-2" style={{ fontSize: "16px" }}>
                  My Account
                </span>
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                sx={{
                  color: "#fff",
                  mr: 2,
                }}
                onClick={() => router.push("/sign_in")}
              >
                Sign in
              </Button>
              <Button
                className="font-medium text-yellow-900 bg-yellow-300"
                variant="contained"
                onClick={() => router.push("/sign_up")}
              >
                Sign up
              </Button>
            </Box>
          )}

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={NotifyEl}
        open={openNotifications}
        onClose={handleClose}
        id="describedby-menu"
        sx={{ right: "200px" }}
        className=" mt-10"
      >
        <div className=" p-5">
          <div className="text-lg font-bold mb-3">New Deals</div>
          {pushDeal.length < 1 ? <div>No New Deals</div> : null}
          {pushDeal ? (
            pushDeal.map((item, index) => {
              return (
                <MenuItem
                  onClick={() => {
                    router.push({
                      pathname: item.link,
                    });
                  }}
                  key={index}
                  className=""
                  sx={{ padding: 0 }}
                >
                  <div className="flex items-center overflow-hidden space-x-2 ">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${item.image.id}${item.image.ext}`}
                      width={50}
                      height={50}
                      className="rounded-lg"
                      alt="Picture of the author"
                    />
                    <div className="">
                      <div className="whitespace-wrap w-96 pr-10">
                        {item.title.slice(0, 42)}...
                      </div>
                      <div className="text-gray-500 line-through">
                        ${item.oldPrice}
                      </div>
                      <div>${item.price}</div>
                    </div>
                  </div>
                </MenuItem>
              );
            })
          ) : (
            <div>No deals</div>
          )}
        </div>
      </Popover>
    </>
  );
}

export default observer(Header);
