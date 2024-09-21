import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Myycarosuel.css";

import img1 from './img/img13.jpg'
import img2 from './img/img12.jpg'
import img3 from './img/img11.jpg'

const Myycarousel = () => {
  const carousel_img = [img1, img2, img3];
  return (
    <div className="my-styled-carousel" style={{zIndex:'1'}} >
      <Carousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showArrows={false}
        showThumbs={false}
        interval={3500}
      >
        {carousel_img &&
          carousel_img.map((img, index) => (
              <img key={index} src={img} alt="item1" loading="lazy"/>
          ))}
      </Carousel>
    </div>
  );
};

export default Myycarousel;
