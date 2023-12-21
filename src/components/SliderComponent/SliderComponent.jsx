import React from 'react'
import Slider from "react-slick"
import {Image} from 'antd'
import { WrapperSliderStyle } from './style';

const SliderComponent = ({arrImages}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };
  return (
    <WrapperSliderStyle {...settings}>
        {arrImages.map((image) => {
            return (
                <Image key={image} src={image} alt="comics slider" preview={false} width='92%' height='550px'/>
            )
        })}
    </WrapperSliderStyle>
  )
}

export default SliderComponent
