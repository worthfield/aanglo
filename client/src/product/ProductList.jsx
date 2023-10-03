import React, { useEffect, useState, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import auth from "../authentication/auth-helper";
import { remove } from "../apis/product-api";

const ProductList = ({ product, removeProduct, shopId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  const deleteProduct = async () => {
    try {
      const data = await remove(
        {
          shopId: shopId,
          productId: product._id,
        },
        { t: jwt.token }
      );
      removeProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto mb-2">
      <ul className="divide-y bg-white px-2 sm:rounded-lg hover:bg-gray-200 cursor-pointer  divide-gray-300">
        <li className="flex items-center  py-4">
          <div className="flex items-center  justify-center w-12 h-12 bg-gray-200 rounded-full">
            {/* Replace with avatar component or image */}
            <img
              className="w-full h-full object-cover bg-cover bg-center rounded-full"
              src={
                "/api/product/photo/" + product._id + "?" + new Date().getTime()
              }
              alt=""
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="lg:text-lg text-sm font-medium">{product.name}</p>
          </div>
          <div className="ml-auto flex gap-2 items-center">
            <button className="px-4 py-2 hidden md:block bg-gray-500 text-white text-sm rounded-md">
              Qty:
              {product.quantity}
            </button>
            <button className="px-4 py-2 hidden md:block bg-red-500 text-white text-sm rounded-md">
              Rs. {product.price}
            </button>
            <button className="ml-2">
              <HiDotsVertical
                className="text-gray-500 hover:text-gray-700"
                onClick={handleMenuClick}
              />
            </button>
            {showMenu && (
              <div ref={menuRef}>
                <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow">
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <Link
                      to={product._id}
                      className="w-full text-left"
                    >
                      Edit
                    </Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <button
                      onClick={deleteProduct}
                      className="w-full text-left"
                    >
                      Delete
                    </button>
                  </li>
                  <li className="py-2 px-4  md:hidden bg-gray-100">
                    <button className="w-full text-left">
                      Qty:
                      {product.quantity}
                    </button>
                  </li>
                  <li className="py-2 px-4  md:hidden bg-gray-100">
                    <button className="w-full text-left">
                      price
                      {product.price}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </li>
        {/* Add more list items here */}
      </ul>
    </div>
  );
};

export default ProductList;
