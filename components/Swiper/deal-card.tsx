import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Images from "next/image"
import classnames from "classnames";
function DealSwiperItem(props) {
  const { data,className } = props;
  const router = useRouter();
  const [src, setSrc] = useState(data.image as string);
  const [isFlag, setIsFlag] = useState(false);
  const date = new Date(data?.endedAt)
  const handleOnLoad = () => {
    if (isFlag) return;
    const imgDom = new Image();
    imgDom.src = data.image;
    imgDom.onload = function () {
      setIsFlag(true);
      setSrc(data.image);
    };
    imgDom.onerror = function () {
      setIsFlag(true);
      //   setSrc(props.errorImg as string);
    };
  };
  useEffect(() => {
    handleOnLoad();
  });
  return (
    <div           onClick={() => {
      router.push({
        pathname:"/deals/1",
        query:{
          image:data.image?.id + data.image?.ext,
          title:data.title,
          price:data.price,
          oldPrice:data.oldPrice,
          description:data.description,
          endedAt:data.endedAt,
          categoryName:data.categories?.[0].name,
          categoryID:data.categories?.[0].id,
          brandIMG:data.brand.logo.id + data.brand.logo.ext,
          link:data.link,
        }
      });;
    }} className={classnames("cursor-pointer h-65 pb-1 ml-8 mr-8 mt-2 mb-2 2xl:mb-6",className)}>
      <div className="relative h-21 ">
        <div className="h-21">
          {isFlag ? (
            // <img
            //   id="image"
            //   alt="deals"
            //   className="object-cover aspect-[3.5/2]"
            //   src={src}
            // />
            <div className="relative">
              <Images objectFit="contain" className="rounded-lg" priority placeholder="empty" src={`${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${data.image.id}${data.image.ext}`} width={260} height={150} alt="Picture of the author"/>
              <div className="absolute border-4 border-white border-solid rounded-full avatar left-4 bottom-3 border-round">
                  <div className="w-8 rounded-full">
                  {data.brand ? (
                      <Images
                        priority
                        src={`${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${data.brand?.logo.id}${data.brand?.logo.ext}`}
                        width={50}
                        height={50}
                        className="rounded-lg "
                        alt="Picture of the author"
                      />
                    ) : null}
                  </div>
                </div>
            </div>
          ) : (
            <div className="object-cover max-w-xs aspect-[3.5/2] animate-pulse bg-gray-300"></div>
          )}
        </div>
        <div
          className="absolute w-24 h-8 font-medium leading-8 text-center text-blue-800 rounded-full shadow cursor-pointer bg-gray-50 -bottom-2 -right-8 hover:shadow-md "
        >
          Shop Now
        </div>
      </div>
      <div className="text-base font-medium md:text-lg">{data?.brand?.name}</div>
      <div className="text-sm font-medium md:text-xl overflow-ellipsis css1Overflow-ellipsis">{data?.title}</div>
      <div className="text-sm font-medium leading-4 css2Overflow-ellipsis"dangerouslySetInnerHTML={{__html:data?.description}}></div>
      <div className="text-sm font-medium">Ends at {date.toDateString().split( " " )[1]} {date.getDate()}</div>
      <div className="flex space-x-2">
        <div className="font-bold text-red-400">{data?.price !== 0 ?  `${data?.price}` : null}</div>
        <div className="text-gray-500 line-through"> {data?.oldPrice ? `$${data?.oldPrice}` : null}</div>
      </div>
    </div>
  );
}

export default DealSwiperItem;
