import * as React from "react";
import DealSwiperItem from "./deal-card";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function SwiperContainer(props) {
  const { swiperList } = props;
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      autoHeight={true}
      breakpoints={{
        580: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        980: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1350:{
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="styles.navigation rounded h-96"
    >
      {swiperList?.map((element, index) => {
        return (
          <SwiperSlide key={index}>
            <DealSwiperItem
              key={element.title}
              data={element}
              className="box-content w-56 p-6 border-white shadow-md pb-7 h-80"
            ></DealSwiperItem>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
