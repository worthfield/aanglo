import React, {useContext, useState } from "react";
import { TopBar, MiddleBar, BottomBar } from "../components/Home";
import Sidebar from "../components/Home/Sidebar";
import { MyContext } from "../Context-api";
const Header = () => {
  const {toggle,sidebarRef} =useContext(MyContext)

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
    <div
    ref={sidebarRef}>
    <div className={toggle?'opacity-100':'bg-white'}>
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
    </div>
  );
};

export default Header;

