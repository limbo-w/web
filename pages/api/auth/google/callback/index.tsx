import { useRouter } from 'next/router'
import React from 'react'
import { useEffect} from "react";
import useSWR from "swr";
export default function index(req,res) {
    // res.status(200).json({req})

    const result = eval(req.query)
//     const fetcher = (...args) => fetch(...args).then((res) => res.json())
    // console.log(result,"result")
    // res.status(200).json({result})
    res.redirect(307, `/google/?code=${result?.code}&scope=${result?.scope}&authuser=${result?.authuser}&prompt=${result?.prompt}`)
}

// export const getServerSideProps = async (context) => {
//     console.log(context.query.category,'context')
//     let category = context.query.category as string
//     if(context.query.category===undefined){
//       category = 'new';
//     }
//     return {
//       props: {
//         context:context
//       },
//     };
// }