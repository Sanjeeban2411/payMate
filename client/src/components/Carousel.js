import React from 'react'
import { Carousel } from 'react-responsive-carousel';
// import log1 from '../components/assests/log-1.png';
// import log2 from '../components/assests/log-2.png';

export default function CarouselComp() {
    const data = ['../components/assests/log-1.png', '../components/assests/log-2.png']
    console.log(data)
    return (
        <div>
            {/* <Carousel axis='horizontal' autoPlay={true}>
                <div>
                    <img src="/assests/log-2.png" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/assests/log-1.png" />
                    <p className="legend">Legend 2</p>
                </div>
                
            </Carousel> */}


            <Carousel
                infiniteLoop
                useKeyboardArrows
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                // autoPlay={true}
                emulateTouch={true}
                swipeable={true}
            >
                <img src="/assests/log-1.png" alt="log1" />
                <img src="/assests/log-2.png" alt="log2" />
                {/* {data.map((slide, index) => {
                    return ( */}
                        {/* <img
                            src={slide}
                            key={index}
                            alt={slide}
                        ></img> */}
                    {/* );
                })} */}
            </Carousel>
        </div>
    )
}
