import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import Image from "next/image";
import styles from "./index.module.css";
import EditSvg from "../../public/edit.svg";
import ShareSvg from "../../public/share_link.svg";
import { useRouter } from "next/router";
import stores from "../../stores";
import classnames from "classnames";
import {getUserProfile} from "../../server/api/user"
export default function AccountInfo() {
  const router = useRouter();
  const { commonStore } = stores;
  const [userProfile,setUserProfile] = React.useState<any>()
  React.useEffect(()=>{
    // if(!commonStore){
      getUserProfile().then((res) => {
        if (res.username) {
          setUserProfile(res)
          console.log(commonStore,"commonStore")
          return
          // router.reload();
        }else{
          localStorage.removeItem("token");
          commonStore.setUserProfile(undefined);
          router.push('/')
        }
      });
    // }
  },[])
  return (
    <Card
      sx={{
        minWidth: 345,
        maxHeight: 470,
        padding: "0",
        paddingBottom: 40,
        marginTop: {
          xs: "20px",
          md: "0",
        },
      }}
    >
      <CardContent style={{ padding: "30px", textAlign: "center" }}>
        <Typography
          sx={{
            display: { xs: "flex", md: "unset" },
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
          variant="h6"
          component="div"
        >
          <p
            style={{
              marginBottom: "13px",
            }}
          >
            Welcome
          </p>
          <p
            style={{
              marginBottom: "13px",
            }}
          >
            <p className={classnames(styles.value)}>
              {userProfile?.nickname? (
               userProfile.nickname
              ) : (
                <div className="space-x-2">
                  <span>Unsettled</span>
                  <span
                    className="text-blue-500 cursor-pointer hover:text-blue-800 first-letter: "
                    onClick={() => commonStore.setIsEditing(true)}
                  >
                    Set it up now
                  </span>
                </div>
              )}
            </p>
          </p>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Member since Sep 22nd 2022
        </Typography>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            fontFamily: "Rakuten Sans UI Semibold",
          }}
          startIcon={<EditSvg fill="#737373" width={20} height={20} />}
          onClick={() =>{ router.push("/account"),  commonStore.setIsEditing(!commonStore.isEditing)}
      
        }
        >
          Edit Profile
        </Button>
      </CardContent>
      <Divider />
      <CardContent
        className={styles.balance}
        sx={{ padding: "30px", textAlign: "center" }}
      >
        <Typography
          sx={{
            marginBottom: "10px",
          }}
          variant="h6"
          component="p"
        >
          Rewards Detail
        </Typography>
        <div className={styles.balanceItem}>
          <div className={styles.left}>Rewards Earned</div>
          <div className={styles.right}>
            {/* <Image src="/coin.webp" alt="coin" width={16} height={16} /> */}
            <span className={styles.count}>{userProfile?.earned}</span>
            {/* <span>($15.00)</span> */}
          </div>
        </div>
        <div className={styles.balanceItem}>
          <div className={styles.left}>Redeemed</div>
          <div className={styles.right}>
            {/* <Image src="/coin.webp" alt="coin" width={16} height={16} /> */}
            <span className={styles.count}>{userProfile?.redeemed}</span>
            {/* <span>($15.00)</span> */}
          </div>
        </div>
        <div className={styles.balanceItem}>
          <div className={styles.left}>Rewards Balance</div>
          <div className={styles.right}>
            {/* <Image src="/coin.webp" alt="coin" width={16} height={16} /> */}
            <span className={styles.count}>{userProfile?.redeemed + userProfile?.earned}</span>
            {/* <span>($15.00)</span> */}
          </div>
        </div>
        {/* <Button
          size="large"
          sx={{
            fontWeight: 600,
            borderRadius: "20px",
            padding: "6px 40px",
            fontFamily: "Rakuten Sans UI Semibold",
            boxShadow: "0 4px 8px 0 rgb(10 22 70 / 15%)",
            mt: "12px",
          }}
          startIcon={<ShareSvg fill="#737373" width={20} height={20} />}
          onClick={() => router.push("/invite")}
        >
          Share
        </Button> */}
      </CardContent>
    </Card>
  );
}
