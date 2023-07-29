// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { auth } from "../Export";
// import cart from "../apis/cart-api";

// // const isActive = (path)=>{
// //   const location = useLocation();
// //   return location.pathname === path ? "text-pink-500" : "text-white";

// // }
// const Menu = () => {
//   const loggedIn = auth.isAuthenticated();
//   return (
//     <div>
//       <NavLink to="/" style={({isActive})=>{
//         return { color:isActive?"red":"inherit"}
//       }}>Home</NavLink>
//       {loggedIn && loggedIn.user.seller && (
//         <NavLink to="/seller/shops" style={({isActive})=>{
//           return { color:isActive?"red":"inherit"}
//         }}>My Shop</NavLink>
//       )}

//       {!loggedIn ? (
//         <>
//           <NavLink to="/signup" style={({isActive})=>{
//             return { color:isActive?"red":"inherit"}
//           }}>Signup</NavLink>

//           <NavLink to="/signin" style={({isActive})=>{
//             return { color:isActive?"red":"inherit"}
//           }}>Signin</NavLink>
//         </>
//       ) : (
//         <NavLink to={`user/${loggedIn.user._id}`} style={({isActive})=>{
//           return { color:isActive?"red":"inherit"}
//         }}>Profile</NavLink>
//       )}
//       <NavLink to="/users" style={({isActive})=>{
//         return { color:isActive?"red":"inherit"}
//       }}>Users</NavLink>
//       <NavLink to="/seller/shop/new" style={({isActive})=>{
//         return { color:isActive?"red":"inherit"}
//       }}>New</NavLink>
//       <NavLink to="/shops/all" style={({isActive})=>{
//         return { color:isActive?"red":"inherit"}
//       }}>Shops</NavLink>
//       <NavLink to="/cart" style={({isActive})=>{
//         return { color:isActive?"red":"inherit"}
//       }}>
//             Cart{cart.itemTotal()}
//         </NavLink>

//     </div>
//   );
// };

// export default Menu;

// import React from "react";
// import MiddleNav from "../components/MiddleNav";
// import TopNav from "../components/TopNav";
// import ButtonNav from "../components/ButtonNav";
// const Menu = () => {
//   return (
//     <div className="flex relative bg-white z-40 flex-col md:px-[32px] lg:px-[34px] xl:px-[56px]   gap-1">
//       <div className="hidden lg:flex flex-col gap-3">
//         <TopNav />
//         <MiddleNav />
//       </div>
//       <div className="relative lg:mt-[16px] py-[16px] mt-[0px] lg:border-t border-gray-300">
//         <ButtonNav />
//       </div>
//     </div>
//   );
// };

// export default Menu;

// import React,{useContext} from "react";
// import { NavLink,Link } from "react-router-dom";
// import { auth } from "../Export";
// import {CiSearch} from 'react-icons/ci'
// import {BsHandbag} from 'react-icons/bs'
// import TopNav from "../components/TopNav";
// import MiddleNav from "../components/MiddleNav";
// import { MyContext } from "../Context-api";
// import { VscThreeBars } from "react-icons/vsc";
// import ButtonNav from "../components/ButtonNav";

// const Menu = () => {
//   const contexts = useContext(MyContext);
//   const { hidetoggle, setHidetoggle } = contexts;
//   const loggedIn = auth.isAuthenticated();
//   const handleSignout = () => {
//     auth.clearJWT(() => {
//       window.location.reload();
//     });
//   };
//   return (
//     <div className="bg-white">
//       <TopNav/>
//       <MiddleNav/>
//       <ButtonNav/>
//     </div>
//   );
// };

// export default Menu;
import React, {useState } from "react";
import { TopBar, MiddleBar, BottomBar } from "../components/Home";
import Sidebar from "../components/Home/Sidebar";
const Header = () => {
  const [scrollTop, setScrollTop] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return (
    <>
    <div className="bg-white">
      <div className="bg-red-500">
        <TopBar />
      </div>
      <div
        className={`${
          scrollTop ? "sticky top-0 p-2 z-[50] drop-shadow-lg bg-white" : "p-1 "
        }`}
      >
        <MiddleBar />
      </div>
      <BottomBar />
    </div>
    <Sidebar/>
    </>
  );
};

export default Header;

