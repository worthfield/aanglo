import React, { useContext, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { MyContext } from "../Context-api";
import marketplace from "../assets/images/marketplace.jpg";
import { list } from "../apis/product-api";

const Products = (props) => {
  const { addToCart } = useContext(MyContext);
  const [lists, setLists] = useState(true);
  const [sortOption, setSortOption] = useState(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(props.products);
  useEffect(() => {
    // Sort products whenever the sortOption changes
    if (sortOption) {
      let sortedProducts = [...filteredProducts];
      if (sortOption === "lowest") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "highest") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      setFilteredProducts(sortedProducts);
    }
  }, [sortOption]); // This effect will re-run whenever sortOption changes

  const uniqueCategories = [
    ...new Set(props.products.map((product) => product.category)),
  ];

  const imageUrl = props.products?._id
    ? `/api/product/photo/${props.products._id}?${new Date().getTime()}`
    : "/api/product/defaultphoto";

  const handleAddToCart = (item) => {
    addToCart(item);
  };
  const handleFilter = async () => {
    try {
      const data = await list({
        minPrice,
        maxPrice,
      });
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-2 bg-white mx-auto">
      {props.products.length > 0 ? (
        <>
          <div className="top-navigation w-full bg-white border-2 sm:rounded-md  p-2 flex items-center justify-between ">
            <div className="left pl-2 sm:pl-4">
              <div className="flex gap-1 sm:gap-3 items-center">
                <p className="text-sm">Sort By:</p>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="rounded-md bg-gray-100 text-gray-500 pl-1 sm:pl-2 pr-4 sm:pr-10 py-1 sm:py-2 outline-none "
                >
                  <option value={'lowest'}>Lowest Price</option>
                  <option value={'highest'}>Highest Price</option>
                </select>
              </div>
            </div>
            <div className="right flex gap-2 sm:gap-4 items-center pr-2 sm:pr-4 text-red-500">
              <BsGrid3X3Gap
                className={`sm:w-6 sm:h-6 h-5 w-5 cursor-pointer ${
                  lists ? "text-gray-400" : "text-red-500"
                }`}
                onClick={() => setLists(false)}
              />
              <FaListUl
                className={`sm:w-6 sm:h-6 h-5 w-5 cursor-pointer ${
                  lists ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => setLists(true)}
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
                      min={0}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label>Rs.</label>
                    <input
                      placeholder="To"
                      className="border-[3px] rounded-l-xl rounded-r-xl w-full border-gray-300 focus:outline-red-500 px-4 py-2"
                      type="number"
                      min={0}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center">
                <button
                  className="bg-red-500 text-white rounded-md border-2 px-9 py-3 "
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>

            <div
              className={`grid gap-2  mx-3 ${
                lists ? "grid-cols-1" : "grid-cols-2  md:grid-cols-3 "
              }`}
            >
              {filteredProducts.map((product, i) => (
                <div
                  key={i}
                  className={`flex bg-white rounded-lg shadow-md ${
                    lists
                      ? "sm:flex-row flex-col mb-4 items-center "
                      : "flex-col items-center"
                  }`}
                >
                  <div className="image">
                    <img
                      src={
                        "/api/product/photo/" +
                        product._id +
                        "?" +
                        new Date().getTime()
                      }
                      alt="product_image.jpg"
                      className="object-cover bg-cover bg-center w-full h-48"
                    />
                  </div>
                  <div
                    className={`${
                      lists ? "text-center sm:text-start" : "text-center"
                    } px-5`}
                  >
                    <h4 className="mt-[15px] text-sm text-gray-500 ">
                      {product.category}
                    </h4>

                    <Link
                      to={`/product/${product._id}`}
                      className="text-gray-900 text-sm font-medium md:text-lg"
                    >
                      {product.name}
                    </Link>
                    <p
                      className={`${
                        lists ? "block mt-[10px] text-gray-500" : "hidden"
                      }`}
                    >
                      {product.description}
                    </p>
                    <div className="mt-[6px] mb-[11px] font-semibold">
                      Rs.{product.price}
                    </div>

                    {product.quantity >= 0 ? (
                      <button
                        className="text-center bg-red-500 p-2 mb-3 text-white  text-sm rounded-lg font-medium lg:uppercase w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <button className="text-center bg-gray-500 p-2 mb-3 text-white text-sm rounded-lg font-medium lg:uppercase w-full pointer-events-none">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-mono text-red-500">
            Oop's looks like seller hasn't lists any product yet!
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
      )}
    </div>
  );
};

export default Products;
