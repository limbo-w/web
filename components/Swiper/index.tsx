import * as React from "react";
import DealSwiperItem from './banner'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SwiperContainer(props) {
    const { swiperList } = props
    return (
        <Swiper
            modules={[Navigation,Autoplay,Pagination]}
            spaceBetween={40}
            slidesPerView={1.5}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            autoHeight={true}
            pagination={{
                type: "fraction",
              }}
            //   navigation={true}
            breakpoints={{ 
                580: {
                    slidesPerView: 1.5,
                    spaceBetween: 40
                    },
                 1080: {
                    slidesPerView: 1.5,
                    spaceBetween: 40
                    }
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            className="styles.navigation "
        >
            {
                swiperList?.map((element, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <DealSwiperItem key={element.title} data={element}></DealSwiperItem>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper >


    )
}