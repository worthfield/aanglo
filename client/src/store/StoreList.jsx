import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { listByOwner } from "../apis/store-api";
import auth from '../authentication/auth-helper'
import { HiDotsVertical } from "react-icons/hi";

const StoreList = ({ shop }) => {
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
  return (
    <div className="mx-auto mb-2">
      <ul className="divide-y bg-white px-2 rounded-lg hover:bg-gray-200 cursor-pointer  divide-gray-300">
        <li className="flex items-center  py-4">
          <div className="flex items-center  justify-center w-12 h-12 bg-gray-200 rounded-full">
            {/* Replace with avatar component or image */}
            <img
              className="w-full h-full object-cover bg-cover bg-center rounded-full"
              src={"/api/shops/logo/" + shop._id + "?" + new Date().getTime()}
              alt=""
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-lg font-medium">{shop.name}</p>
          </div>
          {auth.isAuthenticated() &&
            auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == shop.owner._id && (
              <div className="ml-auto flex gap-2 items-center">
                <Link to={`${shop._id}/products/new`} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Add New Product
                </Link>
                <Link to={`/seller/orders/${shop.name}/${shop._id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  View orders
                </Link>
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
                        <Link to={`edit/${shop._id}`} className="w-full text-left">Edit</Link>
                      </li>
                      <li className="py-2 px-4 hover:bg-gray-100">
                        <button className="w-full text-left">Delete</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
        </li>
        {/* Add more list items here */}
      </ul>
    </div>
  );
};

export default StoreList;
