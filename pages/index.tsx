import { Button, Container, CssBaseline } from "@mui/material";
import { GetServerSideProps,GetStaticProps } from "next";
import { fetchDeals ,fetchCategories,fetchBanner} from "../server/api/deals";
import Layout from "../components/Layout";
import MostClickedDeals from "../components/MostClickedDeals";
import Trending from "../components/Trending";
import React from "react";
import stores from "../stores";
import ReactDOM from "react-dom";
import { commonRequest } from "../server/api/axios";
import Box from "@mui/material/Box";
import { featuredPosts ,swiperList} from "../mock/deals";
class Modal extends React.Component {
  render() {
    const {
      visible,
    } = { visible: true }
    return visible && ReactDOM.createPortal(
      <div className="box">
        Content
        <br />
        <button>Close</button>
      </div>, document.getElementById("container"))
  }
}

export default function Index(props) {
  return (
    <Layout
    >
      <div
        id="container"
        className="container flex flex-col pl-32 pr-32 mx-auto mt-2 max-w-screen md:flex-row md:mt-2 "
      >
        <CssBaseline />
        {/* <MostClickedDeals></MostClickedDeals> */}
        <Trending categories={props.categories} totalPages={props.totalPages} deals={props.deals} swiperList={props.swiperList}></Trending>
      </div>
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.req.headers,'headers');
  commonRequest.defaults.headers.Authorization = `Bearer ${context.req.headers.cookie?.substring(
    5
  )}`;
  console.log(commonRequest.defaults.headers,"commonRequest")
  const categories = await fetchCategories();
  const { commonStore } = stores;
  let category = context.query.category as string;
  
  const deals = await fetchDeals({
    category:category,
    ...context.query,
    limit:40,
    orderBy:"custom",
  });
  // const swiperList = await fetchDeals({
  //   category:category,
  //   orderBy:"custom",
  //   isTop:true
  // });
  const swiperList = await fetchBanner({
    category:category,
    // orderBy:"custom",
    isTop:true
  });
  if(context.query.category===undefined){
    category = 'new';
  }
  return {
    props: {
      deals: deals.items,
      totalPages: deals.meta.totalPages,
      swiperList: swiperList?.items,
      categories: categories
    },
  };
}

// export const getStaticProps: GetServerSideProps = async (context) => {
//   const deals = await fetchDeals();
//   console.log(context,'context')
//   return {
//     props: {
//       deals: JSON.parse(JSON.stringify(deals.data)),
//     },
//   };
// }