// const Home = () => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [suggestionTitle, setSuggestionTitle] = useState(
//     "This is new Suggestion title"
//   );

import React from "react";
import RelatedProducts from "../components/Home/RelatedProducts";
import Promotion from "../components/Home/Promotion";
import Deals from "../components/Home/Deals";
import AdsSlider from "../components/Home/AdsSlider";
import main_banner from "../assets/images/main_banner.jpg";
import first from "../assets/images/first.jpg";
import second from "../assets/images/second.jpg";
import third from "../assets/images/thrid.jpg";
import fouth from "../assets/images/fourth.jpg";
import { FaSellsy, FaUserAlt } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Home = () => {
  return (
    <div>
      <div className="container w-full mx-auto">
        <div className="flex gap-4 md:flex-row flex-col w-full">
          <div className="md:w-2/4 ">
            <div className="hero rounded-lg">
              <img
                src={main_banner}
                className="img1 rounded-lg w-full h-full"
                alt="main banner"
              />
              <div className="hero-content font-bold text-sm md:text-xl">
                <button className="bg-[#1D9BF0] md:p-2 p-1 text-white rounded-lg">
                  Discover Products
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-2/4 gap-3 flex flex-col bg-green-100">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="banner-first rounded-lg relative sm:w-2/4">
                <img
                  src={first}
                  className="img1 rounded-lg w-full h-full"
                  alt="first banner"
                />

                <div className="content bottom-0 absolute left-0 top-[40%] h-full flex justify-center items-center">
                  <button className="bg-red-600 md:p-2 p-1 text-white rounded-lg">
                    Be a Seller
                  </button>
                </div>
              </div>
              <div className="banner-second relative rounded-lg sm:w-2/4">
                <img
                  src={fouth}
                  className="img1 rounded-lg w-full h-full"
                  alt="second banner"
                />

                <div className="content bottom-0 absolute left-0 top-[40%] h-full flex justify-center items-center">
                  <button className="bg-red-600 md:p-2 p-1 text-white rounded-lg">
                    Be a Seller
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex gap-3 flex-row">
              <div className="banner-third relative rounded-lg sm:w-2/4">
                <img
                  src={second}
                  className="img1 rounded-lg w-full h-full"
                  alt="thrid banner"
                />

                <div className="content bottom-0 absolute left-0 top-[40%] h-full flex justify-center items-center">
                  <button className="bg-red-600 md:p-2 p-1 text-white rounded-lg">
                    Discover a shop
                  </button>
                </div>
              </div>
              <div className="banner-four relative rounded-lg sm:w-2/4">
                <img
                  src={third}
                  className="img1 rounded-lg w-full h-full"
                  alt="fourth banner"
                />

                <div className="content bottom-0 absolute left-0 top-[40%] h-full flex justify-center items-center">
                  <button className="bg-red-600 md:p-2 p-1 text-white rounded-lg">
                    Be a Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdsSlider />
      {/* seller and creation of it */}
      <div className="mt-[50px] lg:mt-[60px] container mx-auto ">
        <div className="text-center">
          <h1 className="text-4xl lg:text-7xl italic text-red-500 font-serif">
            Be A Seller
          </h1>
          <span className="text-4xl sm:text-5xl  lg:text-9xl text-gray-300">
            Create your store
          </span>
        </div>
        <div className="mt-10 lg:mt-16 md:border-4 grid gap-6 md:gap-0 text-white grid-cols-1 p-10 items-center justify-center md:grid-cols-3">
          <div className="border-2 p-4 md:p-0 md:border-0 cursor-pointer  group md:border-r-4">
            <div className="flex items-center gap-8 justify-center">
              <h1 className="bg-gray-300 px-4 py-2 font-bold   rounded-full">
                1
              </h1>
              <FaUserAlt
                className="text-red-500 transition delay-100 group-hover:animate-bounce"
                size={40}
              />
            </div>
            <p className="text-center text-black mt-2 text-lg font-bold">
              Create an account
            </p>
          </div>
          <div className="border-2 p-4 md:p-0 md:border-0 cursor-pointer group md:border-r-4">
            <div className="flex items-center gap-8 justify-center">
              <h1 className="bg-gray-300 px-4 py-2 font-bold   rounded-full">
                2
              </h1>
              <FaSellsy
                className="text-red-500 transition delay-100 group-hover:animate-bounce"
                size={40}
              />
            </div>
            <p className="text-center text-black mt-2 text-lg font-bold">
              Be a seller
            </p>
          </div>
          <div className="border-2 p-4 md:p-0 cursor-pointer group md:border-0">
            <div className="flex items-center gap-8 justify-center">
              <h1 className="bg-gray-300 px-4 py-2 font-bold   rounded-full">
                3
              </h1>
              <RiMoneyDollarCircleFill
                className="text-red-500 transition delay-100 group-hover:animate-bounce"
                size={40}
              />
            </div>
            <p className="text-center text-black mt-2 text-lg font-bold">
              Earn Money
            </p>
          </div>
        </div>
      </div>
      {/* end of seller and creation of it */}
      {/* Related product */}
      <div className="container mx-auto mt-[50px] lg:mt-[70px]">
        <div className="text-center">
          <p className="text-xl text-gray-500 italic font-serif">
            All the best item for you
          </p>
          <h1 className="text-3xl text-black mt-2 font-bold font-serif">
            Related Products
          </h1>
        </div>
        <RelatedProducts />
      </div>

      <Promotion />

      <Deals />
    </div>
  );
};

export default Home;
