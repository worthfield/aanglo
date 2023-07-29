import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCart from "../cart/AddToCart";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import marketplace from "../assets/images/marketplace.jpg";


const Products = (props) => {
  const [list, setList] = useState(true);

  const uniqueCategories = [
    ...new Set(props.products.map((product) => product.category)),
  ];

  const imageUrl = props.products?._id
    ? `/api/product/photo/${props.products._id}?${new Date().getTime()}`
    : "/api/product/defaultphoto";
  return (
    <div className="container mt-2 bg-white mx-auto">
      {props.products.length > 0 ? (
        <>
          <div className="top-navigation w-full bg-white border-2 rounded-md  p-2 flex items-center justify-between ">
            <div className="left pl-2 sm:pl-4">
              <div className="flex gap-1 sm:gap-3 items-center">
                <p className="text-sm">Sort By:</p>
                <select className="rounded-md bg-gray-100 text-gray-500 pl-1 sm:pl-2 pr-4 sm:pr-10 py-1 sm:py-2 outline-none ">
                  <option>Best selling</option>
                  <option>Best selling</option>
                  <option>Best selling</option>
                </select>
              </div>
            </div>
            <div className="right flex gap-2 sm:gap-4 items-center pr-2 sm:pr-4 text-red-500">
              <BsGrid3X3Gap
                className={`sm:w-6 sm:h-6 h-5 w-5 cursor-pointer ${
                  list ? "text-gray-400" : "text-red-500"
                }`}
                onClick={() => setList(false)}
              />
              <FaListUl
                className={`sm:w-6 sm:h-6 h-5 w-5 cursor-pointer ${
                  list ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => setList(true)}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row ">
            <div className="hidden w-[25%] lg:flex  flex-col">
              <div className="border-b-4 pb-9">
                <p className="text-lg">Departments</p>
                <div className="mt-3">
                  {uniqueCategories.map((product, i) => (
                    <div
                      key={i}
                      className="text-gray-600 hover:text-red-500 cursor-pointer hover:bg-gray-100 rounded-sm  py-2"
                    >
                      {product}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b-4 mt-7 pb-9">
                <p className="text-lg">Filter By</p>
                <div className="mt-3">
                  <div className="text-black font-bold font-sans text-md  rounded-sm mb-2 py-2">
                    Availability
                  </div>
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />
                  <label className="text-gray-600 ml-2"> In stock</label>
                  <br />
                  <input
                    type="checkbox"
                    id="vehicle2"
                    name="vehicle2"
                    value="Car"
                    className="mt-2"
                  />
                  <label className="text-gray-600 ml-2"> Out of stock</label>
                  <br />
                </div>
              </div>
              <div className="border-b-4 mt-7 pb-9">
                <p className="text-lg">Price</p>
                <div className="mt-3">
                  <div className="flex items-center gap-2 w-full">
                    <label>Rs.</label>
                    <input
                      placeholder="From"
                      className="border-[3px] rounded-l-xl rounded-r-xl w-full border-gray-300 focus:outline-red-500 px-4 py-2"
                      type="number"
                    />
                    <label>Rs.</label>
                    <input
                      placeholder="To"
                      className="border-[3px] rounded-l-xl rounded-r-xl w-full border-gray-300 focus:outline-red-500 px-4 py-2"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`grid w-full ${
                list ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 "
              }`}
            >
              {props.products.map((product, i) => (
                <div key={i} className="px-[7px] lg:px-[5px] md:px-[15px] ">
                  <div
                    className={`pb-[30px] lg:p-[2px] flex ${
                      list
                        ? "sm:flex-row flex-col mb-4 items-center "
                        : "flex-col items-center"
                    }`}
                  >
                    <div className="image w-[270px] h-[270px] lg:px-[10px] lg:pt-[10px]">
                      <img
                        src={
                          "/api/product/photo/" +
                          product._id +
                          "?" +
                          new Date().getTime()
                        }
                        alt="product_image.jpg"
                        className="bg-gray-50 w-full h-full object-cover object-center"
                      />
                    </div>
                    <div
                      className={`${
                        list ? "text-center sm:text-start" : "text-center"
                      } px-5`}
                    >
                      <h4 className="mt-[15px] text-gray-500 ">
                        {product.category}
                      </h4>

                      <Link
                        to={`/product/${product._id}`}
                        className="text-md md:text-lg"
                      >
                        {product.name}
                      </Link>
                      <p
                        className={`${
                          list ? "block mt-[29px] text-gray-500" : "hidden"
                        }`}
                      >
                        {product.description}
                      </p>
                      <div className="mt-[6px] mb-[11px] font-bold">
                        Rs.{product.price}
                      </div>
                      <button
                        className={`bg-red-500 uppercase rounded-full text-white  ${
                          list
                            ? "px-4 py-3 font-bold"
                            : "sm:px-2 sm:py-2 py-1 sm:font-bold"
                        }`}
                      >
                        <AddToCart item={product} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-mono text-red-500">
            Oop's looks like seller hasn't list any product yet!
          </p>
          <div>
            <img
              className="w-full h-full object-cover object-center"
              src={marketplace}
            />
          </div>
          <Link
            to={"/product"}
            className="underline text-lg text-blue-600 font-bold"
          >
            Checkout other amazing products.
          </Link>
        </div>

        // props.searched && <div> No products found</div>
      )}
    </div>
  );
};

export default Products;
