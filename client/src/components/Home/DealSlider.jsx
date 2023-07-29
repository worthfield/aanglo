import React, { useContext } from 'react'
import Slider from "react-slick";
import { MyContext } from '../../Context-api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Headphone from '../../assets/images/headphone.png'

const DealSlider = () => {
    const contexts = useContext(MyContext);
    const {sliderRef}=contexts;
    console.log(sliderRef)
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };
    
  return (
    <Slider ref={sliderRef} {...settings}>
        <div className='px-[18px] flex flex-col pt-[17px] pb-[29px]'>
            <div className='image h-[330px] bg-gray-50'>
                <img src={Headphone} alt='headphone.png' className='w-full h-full object-cover object-center'/>
            </div>
            <div className="info text-center mt-4">
                <p className='text-gray-400'>Electronics</p>
                <h1 className='text-lg font-sans'>Dell HDMI Laptop</h1>
                <span className='font-bold font-sans'>Rs.140000</span>
            </div>
            <p className='text-justify mt-1'>All products are properly selected to ensure customer safety</p>
            <button className='mt-4 flex items-center justify-center w-full bg-orange-400 py-3 rounded-md text-white font-sans font-bold'>
                ADD TO CART
            </button>
        </div>
        <div className='px-[18px] flex flex-col pt-[17px] pb-[29px]'>
            <div className='image   h-[330px] bg-gray-50'>
                <img src={Headphone} alt='headphone.png' className='w-full h-full object-cover object-center'/>
            </div>
            <div className="info text-center mt-4">
                <p className='text-gray-400'>Electronics</p>
                <h1 className='text-lg font-sans'>Dell HDMI Laptop</h1>
                <span className='font-bold font-sans'>Rs.140000</span>
            </div>
            <p className='text-justify mt-1'>All products are properly selected to ensure customer safety</p>
            <button className='mt-4 flex items-center justify-center w-full bg-orange-400 py-3 rounded-md text-white font-sans font-bold'>
                ADD TO CART
            </button>
        </div>
        <div className='px-[18px] flex flex-col pt-[17px] pb-[29px]'>
            <div className='image   h-[330px] bg-gray-50'>
                <img src={Headphone} alt='headphone.png' className='w-full h-full object-cover object-center'/>
            </div>
            <div className="info text-center mt-4">
                <p className='text-gray-400'>Electronics</p>
                <h1 className='text-lg font-sans'>Dell HDMI Laptop</h1>
                <span className='font-bold font-sans'>Rs.140000</span>
            </div>
            <p className='text-justify mt-1'>All products are properly selected to ensure customer safety</p>
            <button className='mt-4 flex items-center justify-center w-full bg-orange-400 py-3 rounded-md text-white font-sans font-bold'>
                ADD TO CART
            </button>
        </div>
  </Slider>
  )
}

export default DealSlider

