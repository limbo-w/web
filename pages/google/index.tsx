import { useRouter } from 'next/router';
import React , {useEffect} from 'react'
import {getGoogleToken} from '../../server/api/user';
import stores from '../../stores';
export default  function Index() {
const router = useRouter()
    console.log(router.query,"router.query")
    const result = router.query;
    const { commonStore } = stores;

//   const fetcher = (...args) => fetch(...args).then((res) => res.json())
//   if(!result.code)return;
  useEffect(()=>{
    if(!result.code)return;
    getGoogleToken(
      `${process.env.NEXT_PUBLIC_API_HOST}auth/google/callback?code=${result?.code}&scope=${result?.scope}&authuser=${result?.authuser}&prompt=${result?.prompt}`
    ).then((res) => {
      console.log(res, "token");
      localStorage.setItem("token", res.token);
      // commonStore.setUserProfile(res.token);
      router.push("/");
    });
    
 })
//   localStorage.setItem('token',data.token)
  return (
    <div>google</div>
  )
}
