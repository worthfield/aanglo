import React, { useState,useEffect } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { listCategories } from "../../apis/product-api";

const BottomBar = () => {
  const [toggleDown, setToggleDown] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    try {
      const data = await listCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto hidden mt-2 mb-4 gap-10  lg:flex">
      <div className="relative">
        <div
          onClick={() => setToggleDown(!toggleDown)}
          className="flex cursor-pointer items-center group py-4 px-7 bg-red-500 gap-8 rounded-t-md font-bold justify-between text-white"
        >
          <div className="flex items-center gap-2">
            <CgMenuGridO size={28} />
            <p className="text-lg">All departments</p>
          </div>
          <AiFillCaretDown
            size={20}
            className={`${
              toggleDown && "rotate-180"
            } transition duration-300 delay-100 ease-in-out`}
          />
        </div>
        {toggleDown && (
          <div className="bg-white w-full border-b-2 rounded-b-md absolute z-50">
            {categories.map((category,index)=>{
              return (
                
                  <div key={index}  className="border-b-2 border-dashed p-3">{category}</div>

               
              )
            })}
          </div>
        )}
      </div>
      <div className="flex items-center border-2 w-[50%]  rounded-3xl justify-between pl-4 ">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full focus:outline-none text-gray-500 focus:text-black"
        />
        <div className=" flex items-center">
          <select className="mx-2 text-gray-500  focus:text-black focus:outline-none">
            <option>All categories</option>
            <option>anish</option>
            <option>anish</option>
          </select>

          <div className="px-10 py-3 cursor-pointer border-l-2">
            <BsSearch size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
