import '../styles/globals.css'
import * as React from "react";
import {getUserProfile} from "../server/api/user"
import stores from '../stores';
function MyApp({ Component, pageProps }) {
  const { commonStore } = stores;
  React.useEffect(()=>{
    // if(!commonStore?.userProfile?.earned){
      getUserProfile().then((res) => {
        if (res.username) {
          commonStore.setUserProfile(res);
        }
      });
    // }
  },[])
  return <Component {...pageProps} />
}

export default MyApp

