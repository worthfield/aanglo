import React from 'react'
import Headphone from '../../assets/images/headphone.png'

const Promotion = () => {
  return (
    <div className="mt-[50px] ">
        <div className="banner_promotion relative text-white">
            <div className="pt-52 container text-center lg:text-left mx-auto">
                <h3 className='text-3xl font-serif italic'>Reliable Products</h3>
                <h1 className='lg:text-5xl sm:text-4xl text-2xl mt-10 font-bold'>Wanna Grab Amazing Offer ?</h1>
                <button className='bg-red-500 px-6 py-4 rounded-xl mt-10'>CLICK HERE!!!</button>
            </div>
            <div className='absolute hidden  animate-bounce transition delay-100  lg:block top-0 left-0 w-[300px] h-[200px]'>
                <img className='h-full w-full object-cover' src={Headphone} alt="headphone.png"/>
            </div>
            <div className='absolute hidden  animate-ping transition delay-100  lg:block top-0 left-[600px] w-[300px] h-[200px]'>
                <img className='h-full w-full object-cover' src={Headphone} alt="headphone.png"/>
            </div>
            <div className='absolute hidden  animate-bounce transition delay-100  lg:block bottom-0 right-0 w-[300px] h-[200px]'>
                <img className='h-full w-full object-cover' src={Headphone} alt="headphone.png"/>
            </div>
        </div>
    </div>
  )
}

export default Promotion