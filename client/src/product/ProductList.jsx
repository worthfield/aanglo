import React, { useEffect, useState, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

const ProductList = ({ product }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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
  return (
    <div className="mx-auto mb-2">
      <ul className="divide-y bg-white px-2 rounded-lg hover:bg-gray-200 cursor-pointer  divide-gray-300">
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
            <p className="text-lg font-medium">{product.name}</p>
          </div>
          <div className="ml-auto flex gap-2 items-center">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                Quantity: 
              {product.quantity}
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md">
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
                      to={
                        "/seller/" +
                        product.shop._id +
                        "/" +
                        product._id +
                        "/edit"
                      }
                      className="w-full text-left"
                    >
                      Edit
                    </Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <button className="w-full text-left">Delete</button>
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
