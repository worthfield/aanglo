import React,{useState,useEffect, useContext} from 'react'
import { Outlet } from 'react-router-dom'
import Menu from '../container/Menu';
import Footer from '../components/Footer'
import { IoIosArrowUp } from "react-icons/io";
import { MyContext } from '../Context-api';

const Layout = () => {
  const {toggle} =useContext(MyContext)

  const [scrollToTop, setscrollToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setscrollToTop(true);
      } else {
        setscrollToTop(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className='w-full h-full relative'>
        <Menu/>
        <div className={toggle?'bg-black opacity-5':'opacity-100'}>

        <Outlet/>
        {scrollToTop && (
        <button
          onClick={scrollUp}
          className="hover:bg-red-500 z-50 animate-bounce rounded-full group transition delay-100 flex items-center justify-center border-red-500 border-[3px] fixed bottom-[50px] right-[50px] h-[55px] w-[55px]"
        >
          <IoIosArrowUp
            className="text-red-500 group-hover:text-white"
            size={30}
          />
        </button>
      )}

        <Footer/>
        </div>

    </div>
  )
}

export default Layout