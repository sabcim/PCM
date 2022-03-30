import { createRef, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface Props {

    imageURLs?: string[]
}

const PostCarousel = (props:Props) => {

  return (
    <Carousel>
        {props.imageURLs?.map((image) => (
          <div>
            <img src={image}/>
          </div>
      ))}
    </Carousel>
);
};

export default PostCarousel