// import React from "react";

// const AdsSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     autoplaySpeed: 3000,
//     arrows: false,

//   };
//   return (
//     <div className=" container  mx-auto mt-[30px] sm:mt-[40px] md:mt-[86px] w-full">
//       <Slider {...settings}>
//         <div className="carousel-item">
//           <div className="carousel-content flex flex-col sm:flex-row items-center text-center">
//             <div className="image-column w-1/2 h-1/2 ">
//               <img
//                 src={camera}
//                 className="w-full h-full bg-white object-cover"
//                 alt="Image 1"
//               />
//             </div>
//             <div className="text-column w-1/2">
//               <h3 className="font-bold text-2xl sm:text-3xl">Camera</h3>
//               <p className="text-gray-400 text-lg sm:text-xl mt-2">Wanna grab amazing offers ?</p>
//               <button className="mt-3 px-5 py-3 rounded-3xl  bg-red-500 text-white font-bold text-lg sm:text-xl">CLICK HERE</button>
//             </div>
//           </div>
//         </div>
//         <div className="carousel-item">
//           <div className="carousel-content flex flex-col sm:flex-row items-center text-center">
//             <div className="image-column w-1/2 h-1/2">
//               <img
//                 src={headphone}
//                 className="w-full h-full object-cover"
//                 alt="Image 1"
//               />
//             </div>
//             <div className="text-column w-1/2">
//               <h3 className="font-bold text-2xl sm:text-3xl">Headphone</h3>
//               <p className="text-gray-400 text-lg sm:text-xl mt-2">Wanna grab amazing offers ?</p>
//               <button className="mt-3 px-5 py-3 rounded-3xl  bg-red-500 text-white font-bold text-lg sm:text-xl">CLICK HERE</button>
//             </div>
//           </div>
//         </div>
//         <div className="carousel-item">
//           <div className="carousel-content flex flex-col sm:flex-row items-center text-center">
//             <div className="image-column w-1/2 h-1/2">
//               <img
//                 src={gadgets1}
//                 className="w-full h-full object-cover"
//                 alt="Image 1"
//               />
//             </div>
//             <div className="text-column w-1/2">
//               <h3 className="font-bold text-2xl sm:text-3xl">Mobiles</h3>
//               <p className="text-gray-400 text-lg sm:text-xl mt-2">Wanna grab amazing offers ?</p>
//               <button className="mt-3 px-5 py-3 rounded-3xl  bg-red-500 text-white font-bold text-lg sm:text-xl">CLICK HERE</button>
//             </div>
//           </div>
//         </div>
//       </Slider>
//     </div>

//   );
// };

// export default AdsSlider;

import React from "react";
import camera from "../../assets/images/camera.png";

import headphone from "../../assets/images/headphone.png";
import gadgets1 from "../../assets/images/gadgets.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <div className=" container  mx-auto mt-[30px] sm:mt-[40px] md:mt-[86px] w-full">
      <Slider {...settings}>
        <div className="carousel-item">
          <div className="carousel-content flex flex-col sm:flex-row items-center text-center">
            <div className="image-column w-1/2 h-1/2 ">
              <img
                src={camera}
                className="w-full h-full bg-white object-cover"
                alt="Image 1"
              />
            </div>
            <div className="text-column w-1/2">
              <h3 className="font-bold text-2xl sm:text-3xl">Camera</h3>
              <p className="text-gray-400 text-lg sm:text-xl mt-2">
                Wanna grab amazing offers ?
              </p>
              <button className="mt-3 px-5 py-3 rounded-3xl  bg-red-500 text-white font-bold text-lg sm:text-xl">
                CLICK HERE
              </button>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-content flex flex-col sm:flex-row items-center text-center">
            <div className="image-column w-1/2 h-1/2">
              <img
                src={headphone}
                className="w-full h-full object-cover"
                alt="Image 1"
              />
            </div>
            <div className="text-column w-1/2">
              <h3 className="font-bold text-2xl sm:text-3xl">Headphone</h3>
              <p className="text-gray-400 text-lg sm:text-xl mt-2">
                Wanna grab amazing offers ?
              </p>
              <button className="mt-3 px-5 py-3 rounded-3xl  bg-red-500 text-white font-bold text-lg sm:text-xl">
                CLICK HERE
              </button>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-content flex flex-col sm:flex-row items-center text-center">
            <div className="image-column w-1/2 h-1/2">
              <img
                src={gadgets1}
                className="w-full h-full object-cover"
                alt="Image 1"
              />
            </div>
            <div className="text-column w-1/2">
              <h3 className="font-bold text-2xl sm:text-3xl">Mobiles</h3>
              <p className="text-gray-400 text-lg sm:text-xl mt-2">
                Wanna grab amazing offers ?
              </p>
              <button className="mt-3 px-5 py-3 rounded-3xl  bg-red-500 text-white font-bold text-lg sm:text-xl">
                CLICK HERE
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default AdsSlider;
