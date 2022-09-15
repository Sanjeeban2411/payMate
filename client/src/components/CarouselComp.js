import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

// import image1 from '/assests/log-1.png';
// import image2 from '/assests/log-2.png';
// import image3 from '/assests/log-3.png';

const CarouselComp = () => {
  return (
    <div>
      <Carousel interval={2500} pause>
      <Carousel.Item>
        <img
          className="w-[60%] h-[40%] object-center flex items-center justify-center mt-16 mx-auto"
          src="/assests/log-1.png"
          alt="First slide"
        /> 
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-[60%] h-[40%] object-center flex items-center justify-center mt-16 mx-auto"
          src="/assests/log-2.png"
          alt="Second slide"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-[60%] h-[40%] object-center flex items-center justify-center mt-16 mx-auto"
          src="/assests/log-3.png"
          alt="Third slide"
        />

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default CarouselComp
