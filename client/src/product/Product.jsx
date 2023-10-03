import React, { useContext, useEffect, useState } from "react";
import { listRelated, read } from "../apis/product-api";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../Context-api";
import Suggestions from "./Suggestions";

const Product = () => {
  const { addToCart } = useContext(MyContext);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const params = useParams();
  useEffect(() => {
    fetchData();
  }, [params.productId]);
  useEffect(() => {
    relatedData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await read({ productId: params.productId });
      setProduct(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };
  const relatedData = async () => {
    try {
      const data = await listRelated({ productId: params.productId });
      setRelated(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const imageUrl = product?._id
    ? `/api/product/photo/${product._id}?${new Date().getTime()}`
    : "/api/product/defaultphoto";

  const handleAddToCart = (item) => {
    addToCart(item);
  };
  return (
    <div className="container mx-auto py-10">
      {product && (
        <section class="text-gray-700 body-font overflow-hidden bg-white">
          <div className="flex lg:flex-row flex-col gap-4">
            <div className="image w-full lg:w-[35%] lg:border-2 lg:p-2 ">
              <img
                alt="ecommerce"
                class="w-full object-cover object-center rounded border border-gray-200"
                src={imageUrl}
              />
            </div>
            <div className="flex lg:w-[35%] w-full mt:4 md:mt-0 flex-col">
              <h1 class="text-gray-900 border-b-2 md:text-3xl text-xl title-font  font-medium mb-1">
                {product.name}
              </h1>
              <div className="mt-4">
                <div className="">
                  <div className="flex">
                    <p>Category:</p>
                    <p className="pl-2 font-medium">{product.category}</p>
                  </div>
                  <div className="flex mt-4">
                    <p>Quantity:</p>
                    <p className="pl-2 font-medium">{product.quantity}</p>
                    <p className="pl-2 ">only {product.quantity} available</p>
                  </div>
                </div>
                <div className="border-t-2 flex justify-between px-4 pt-3 mt-4">
                  <div>
                    <span>Price:</span>
                    <span className="pl-2 font-medium text-2xl">
                      Rs. {product.price}
                    </span>
                  </div>
                  <div className="flex gap-4 flex-col">
                    {product.quantity >= 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button className="flex ml-auto text-black bg-gray border-0 py-2 px-6 focus:outline-none  rounded">
                        Out of Stock
                      </button>
                    )}
                    <button className="flex ml-auto text-black hover:text-white  border border-red-500 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
                <div className=" mt-8 ">
                  <div className="flex">
                    <p>Delivery:</p>
                    <p className="pl-2 font-medium">
                      Estimated between 2 to 3 days.
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <p>Returns:</p>
                    <p className="pl-2 font-medium">
                      1 week returns. Buyer pays for return shipping
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[25%] w-full gap-4 flex  flex-col">
              <div className="border-2 rounded-md p-4  w-full">
                <span className="text-black font-medium">
                  Seller Information
                </span>
                <div className=" mt-2">
                  <Link
                    to={"/shops/" + product.shop._id}
                    className="text-blue-600 underline"
                  >
                    {product?.shop?.name}
                  </Link>
                  <p>100% positive feedback</p>
                </div>
                <div className="border-t-2 flex flex-col gap-2 text-blue-600 border-dashed mt-4">
                  <Link to={"/shops/" + product.shop._id} className="mt-4">
                    visit store
                  </Link>
                  <Link to={"/shops/" + product.shop._id}>see other items</Link>
                </div>
              </div>
              <div className="border-2 rounded-md p-1 w-full">
                <span className="text-black font-medium">
                  Product Information
                </span>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </section>
      )}
      {product && (
        <div className="flex items-center justify-between rounded-lg w-full bg-white mb-2 mt-2 px-4 py-4 gap-4">
          <div className="p">
            <p className="text-2xl md:text-3xl">{product?.shop?.name}</p>
            <p className="text-gray-400">100% positive response</p>
          </div>
          <Link
            to={"/shops/" + product.shop._id}
            className="bg-blue-600 rounded-xl px-3 py-3 text-white "
          >
            Visit Store
          </Link>
        </div>
      )}
    </div>
  );
};

export default Product;
