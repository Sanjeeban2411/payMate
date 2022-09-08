import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const CarouselIndicater = () => {
  return (
    <div>
      <Carousel interval={2500} pause fade>
      <Carousel.Item>
      <img src="/assests/indicator-1.png" alt="" className="mx-auto mt-6"/>
      </Carousel.Item>
      <Carousel.Item>
      <img src="/assests/indicator-2.png" alt="" className="mx-auto mt-6"/>
      </Carousel.Item>
      <Carousel.Item>
      <img src="/assests/indicator-3.png" alt="" className="mx-auto mt-3"/>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default CarouselIndicater
