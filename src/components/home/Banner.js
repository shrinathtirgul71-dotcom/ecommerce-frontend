import React from 'react'
import Carousel from 'react-material-ui-carousel';
import "./banner.css";

const data = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
]

const Banner = () => {
  return (
    <Carousel
        className='carasousel'
        autoPlay={true}
        animation='slide'
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
            style: {
                backgroundColor: "rgba(255,255,255,0.8)",
                color: "#494949",
                borderRadius: 0,
                padding: "10px 5px",
            }
        }}
        navButtonsWrapperProps={{
            style: {
                top: "0",
                bottom: "0",
                height: "280px",  // 👈 match banner height
            }
        }}
    >
        {
            data.map((image, i) => {
                return (
                    <img key={i} src={image} alt="" className='Banner_img' />
                )
            })
        }
    </Carousel>
  )
}

export default Banner