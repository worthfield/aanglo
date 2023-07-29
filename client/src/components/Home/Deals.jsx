import React, { useContext } from "react";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Headphone from "../../assets/images/headphone.png";
import DealSlider from "./DealSlider";
import { MyContext } from "../../Context-api";

const Deals = () => {
  const context = useContext(MyContext);
  const { previousSlide, nextSlide } = context;
  return (
    <div className="container mx-auto  mb-[50px] lg:mb-[70px]  mt-[50px] gap-6 lg:mt-[70px]  flex md:flex-row flex-col ">
      <div className="md:w-[40%] lg:w-[30%]">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-2xl md:text-xl xl:text-3xl font-bold font-sans">
            Deals of the day
          </h1>
          <div className="flex gap-2">
            <AiOutlineLeft
              onClick={previousSlide}
              size={40}
              className="border-gray-300 cursor-pointer border-[2px] text-gray-400 p-2 rounded-full"
            />
            <AiOutlineRight
              onClick={nextSlide}
              size={40}
              className="border-gray-300 cursor-pointer border-[2px] text-gray-400 p-2 rounded-full"
            />
          </div>
        </div>
        <div className="mt-6  border-4 border-orange-400 ">
          <DealSlider />
        </div>
      </div>

      <div className="px-[15px]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-sans">Top Rated Products</h1>
          <div className="flex items-center gap-2 cursor-pointer text-red-500">
            <p className="font-bold">See more</p>
            <AiOutlineArrowRight className="font-bold" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <div className="card border-2">
            <div className="card-items flex items-center gap-10 sm:gap-1 md:gap-3 xl:gap-16 p-[10px] lg:h-[191px] h-[181px] sm:h-[131px] md:h-[151px]">
              <div className="image w-[150px] h-[150px]  bg-gray-50 sm:w-[115px] sm:h-[115px] md:w-[135px] md:h-[135px] lg:w-[170px] lg:h-[170px]">
                <img src={Headphone} alt="headphone.png" />
              </div>
              <div className="text flex flex-col items-center justify-center">
                <p className="text-gray-400">Electronics</p>
                <h1 className="text-xl font-sans">Dell xps laptop</h1>
                <span className="font-bold font-sans">Rs. 140000</span>
              </div>
            </div>
          </div>
          <div className="card border-2">
            <div className="card-items flex items-center gap-10 sm:gap-1 md:gap-3 xl:gap-16 p-[10px] lg:h-[191px] h-[181px] sm:h-[131px] md:h-[151px]">
              <div className="image w-[150px] h-[150px]  bg-gray-50 sm:w-[115px] sm:h-[115px] md:w-[135px] md:h-[135px] lg:w-[170px] lg:h-[170px]">
                <img src={Headphone} alt="headphone.png" />
              </div>
              <div className="text flex flex-col items-center justify-center">
                <p className="text-gray-400">Electronics</p>
                <h1 className="text-xl font-sans">Dell xps laptop</h1>
                <span className="font-bold font-sans">Rs. 140000</span>
              </div>
            </div>
          </div>
          <div className="card border-2">
            <div className="card-items flex items-center gap-10 sm:gap-1 md:gap-3 xl:gap-16 p-[10px] lg:h-[191px] h-[181px] sm:h-[131px] md:h-[151px]">
              <div className="image w-[150px] h-[150px]  bg-gray-50 sm:w-[115px] sm:h-[115px] md:w-[135px] md:h-[135px] lg:w-[170px] lg:h-[170px]">
                <img src={Headphone} alt="headphone.png" />
              </div>
              <div className="text flex flex-col items-center justify-center">
                <p className="text-gray-400">Electronics</p>
                <h1 className="text-xl font-sans">Dell xps laptop</h1>
                <span className="font-bold font-sans">Rs. 140000</span>
              </div>
            </div>
          </div>
          <div className="card border-2">
            <div className="card-items flex items-center gap-10 sm:gap-1 md:gap-3 xl:gap-16 p-[10px] lg:h-[191px] h-[181px] sm:h-[131px] md:h-[151px]">
              <div className="image w-[150px] h-[150px]  bg-gray-50 sm:w-[115px] sm:h-[115px] md:w-[135px] md:h-[135px] lg:w-[170px] lg:h-[170px]">
                <img src={Headphone} alt="headphone.png" />
              </div>
              <div className="text flex flex-col items-center justify-center">
                <p className="text-gray-400">Electronics</p>
                <h1 className="text-xl font-sans">Dell xps laptop</h1>
                <span className="font-bold font-sans">Rs. 140000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
