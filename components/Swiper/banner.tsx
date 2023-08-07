import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Images from "next/image";
import classnames from "classnames";
function DealSwiperItem(props) {
  const { data, className } = props;
  const router = useRouter();
  const [src, setSrc] = useState(data.image as string);
  const [isFlag, setIsFlag] = useState(false);
  const date = new Date(data?.endedAt);
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
    <div
      onClick={() => {
        router.push(data?.link);
      }}
      className={classnames(
        "cursor-pointer   pr-0 mr-10 pt-8 shadow-md rounded-lg  bg-blue-900 backdrop-opacity-50 min-h-[260px] w-full  h-full",
        className
      )}
    >
      <Images
        className="rounded-lg "
        priority
        placeholder="empty"
        src={`${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${data?.image?.id}${data?.image?.ext}`}
        width="100%"
        layout="fill"
        height={269}
        objectFit="cover"
        alt="Picture of the author"
      />
    </div>
  );
}

export default DealSwiperItem;
