import { createRef, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

interface Props {

    imageURLs?: string[]
}

const PostCarousel = (props:Props) => {

  return (
    <Carousel>
        {props.imageURLs?.map((image, index) => (
          <Image
          layout="fill"
          alt="Carousel Image"
          src={image}
          key={index}
          />
      ))}
    </Carousel>
);
};

export default PostCarousel