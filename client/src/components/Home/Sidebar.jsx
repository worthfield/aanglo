import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../Context-api";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import logo from "../../assets/images/ecom.png";
import { Link, NavLink,useNavigate } from "react-router-dom";
import auth from "../../authentication/auth-helper";
import { list, listCategories } from "../../apis/product-api";

const Sidebar = () => {
  const { toggle, setToggle,sidebarRef } = useContext(MyContext);
  const [hide, setHide] = useState(true);
  const [hideCategory, setHideCategory] = useState(true);
  const loggedIn = auth.isAuthenticated();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Function to handle clicks outside the sidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    // Add click event listener when the sidebar is open
    if (toggle) {
      document.addEventListener("click", handleClickOutside);
    }
    // Remove the event listener when the component unmounts or sidebar is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggle]);
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
  const handleCategory = async(category)=>{
    try{
      const data = await list({
        category:category
      })
     
      navigate('/search',{state:{results:data}})
      setToggle(false)
    }
    catch(error){
      console.log(error)
    }
  }

  const handleSignout = () => {
    auth.clearJWT(() => {
      window.location.reload();
    });
  };
  return (
    <div
    
      className={`fixed top-0 z-[50] h-full w-[80%] sm:w-[50%] md:w-[30%] ${
        toggle
          ? " bg-white transition-[386ms] left-0"
          : "transition-[386ms] -left-[700px]"
      }`}
    >
      <div className="logo flex items-center justify-between px-[50px] border-b-2 py-1">
        <Link to={"."} onClick={()=>setToggle(false)} className="w-[200px]">
          <img
            src={logo}
            alt="aanglo.png"
            className="w-full h-full object-cover object-center"
          />
        </Link>

        <AiOutlineClose
          size={24}
          onClick={() => setToggle(false)}
          className="cursor-pointer"
        />
      </div>
      <div>
        <ul>
          <li className="px-5 border-b border-dashed">
            <NavLink
              to={"."}
              style={({ isActive }) => {
                return { color: isActive ? "red" : "" };
              }}
              onClick={()=>setToggle(false)}
              className="capitalize hover:text-red-500 text-gray-500 leading-12"
            >
              Home
            </NavLink>
          </li>
          <li className="px-5 border-b border-dashed">
            <NavLink
              to={"shops"}
              onClick={()=>setToggle(false)}
              style={({ isActive }) => {
                return { color: isActive ? "red" : "" };
              }}
              className="capitalize hover:text-red-500 text-gray-500 leading-12"
            >
              Shops
            </NavLink>
          </li>
          {loggedIn && loggedIn?.user?.seller && (
            <li className="px-5 border-b border-dashed">
              <NavLink
                to={"seller/shops"}
                onClick={()=>setToggle(false)}
                style={({ isActive }) => {
                  return { color: isActive ? "red" : "" };
                }}
                className="capitalize hover:text-red-500 text-gray-500 leading-12"
              >
                My Shop
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div
        onClick={() => setHideCategory(!hideCategory)}
        className="flex items-center cursor-pointer px-5 text-gray-500 border-b justify-between"
      >
        <span className="capitalize  leading-12  ">Category</span>
        <BiChevronRight
          className={
            hideCategory ? "transition-[386px]" : "rotate-90 transition-[386px]"
          }
          size={24}
        />
      </div>
      {!hideCategory && (
        <>
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                onClick={()=>handleCategory(category)}
                className="border-b-2 cursor-pointer pr-5 pl-10 border-dashed p-3"
              >
                {category}
              </div>
            );
          })}
        </>
      )}

      <div
        onClick={() => setHide(!hide)}
        className="flex items-center cursor-pointer  px-5 text-gray-500 border-b justify-between"
      >
        <span className="capitalize  leading-12  ">Account</span>
        <BiChevronRight
          className={
            hide ? "transition-[386px]" : "rotate-90 transition-[386px]"
          }
          size={24}
        />
      </div>

      {hide ? (
        ""
      ) : !loggedIn ? (
        <>
          <div className="border-b border-dashed ">
            <NavLink
              to={"signin"}
              style={({ isActive }) => {
                return { color: isActive ? "red" : "" };
              }}
              onClick={()=>setToggle(false)}
              className="capitalize w-full pr-5 pl-10 hover:text-red-500 text-gray-500 leading-12"
            >
              Sign in
            </NavLink>
          </div>
          <div className="border-b border-dashed">
            <NavLink
              to={"signup"}
              onClick={()=>setToggle(false)}
              style={({ isActive }) => {
                return { color: isActive ? "red" : "" };
              }}
              className="capitalize pr-5 pl-10 hover:text-red-500 text-gray-500 leading-12"
            >
              Sign Up
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="border-b border-dashed">
            <NavLink
              to={`/user/${loggedIn?.user?._id}`}
              onClick={()=>setToggle(false)}
              style={({ isActive }) => {
                return { color: isActive ? "red" : "" };
              }}
              className="capitalize pr-5  w-full pl-10 hover:text-red-500 text-gray-500 leading-12"
            >
              Account
            </NavLink>
          </div>

          <div
            className="capitalize pr-5 pl-10 hover:text-red-500 text-gray-500 leading-12"
            onClick={handleSignout}
          >
            Logout
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
