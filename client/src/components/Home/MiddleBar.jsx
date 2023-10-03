import React, { useContext,useState } from "react";
import { MyContext } from "../../Context-api";
import logo from "../../assets/images/ecom.png";
import { Link, NavLink } from "react-router-dom";
import auth from "../../authentication/auth-helper";
import { BsSearch } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FaShoppingBag, FaBars } from "react-icons/fa";
import cart from "../../apis/cart-api";
import ResSearch from "./ResSearch";

const MiddleBar = () => {
  const { toggle, setToggle,getItemCount,hide,sethide} = useContext(MyContext);
  const loggedIn = auth.isAuthenticated();
  return (
    <>
    <div className="container mt-3 mb-3  mx-auto flex items-center justify-between">
      <Link to={'.'} className="w-[200px]">
        <img
          src={logo}
          alt="aanglo.png"
          className="w-full h-full object-cover object-center"
        />
      </Link>
      <div className="hidden items-center text-black font-semibold text-lg font-sans gap-6 lg:flex ">
        <NavLink
          to={"."}
          style={({ isActive }) => {
            return { color: isActive ? "red" : "inherit" };
          }}
          className="hover:text-red-500"
        >
          Home
        </NavLink>
        <NavLink
          to="shops"
          style={({ isActive }) => {
            return { color: isActive ? "red" : "inherit" };
          }}
          className="hover:text-red-500"
        >
          Shops
        </NavLink>
        {loggedIn && loggedIn?.user?.seller && (
          <NavLink
            to="seller/shops"
            style={({ isActive }) => {
              return { color: isActive ? "red" : "inherit" };
            }}
          >
            My shop
          </NavLink>
        )}
       
        <NavLink className="hover:text-red-500">Contact</NavLink>
      </div>
      <div className="hidden items-center gap-6 lg:flex">
        <Link>
          <AiFillHeart size={28} />
        </Link>
        <Link to={"cart"} className="relative">
          <FaShoppingBag size={24} />

          {getItemCount() > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getItemCount()}
            </span>
          )}
        </Link>
      </div>
      <div className="flex items-center gap-4 lg:hidden sm:gap-10">
        <div onClick={()=>sethide(false)}>
          <BsSearch size={24} />
        </div>
        <Link to={"cart"} className="relative">
          <FaShoppingBag size={24} />
          {getItemCount() > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getItemCount()}
            </span>
          )}
        </Link>
        <div className="cursor-pointer" onClick={() => setToggle(!toggle)}>
          <FaBars size={24} />
        </div>
      </div>
      
    </div>
      {!hide&&(<ResSearch/>)}
      </>
  );
};

export default MiddleBar;
