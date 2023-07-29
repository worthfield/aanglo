// import React, { useEffect, useState } from "react";

// // Create a context
// const MyContext = React.createContext();

// const Context = ({ children }) => {
//   const [hidetoggle, setHidetoggle] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [cartItems, setCartItems] = useState([]);
//   const [show, setShow] = useState(false);

//   // Load cart items from localStorage on component mount
//   // useEffect(() => {
//   //   const savedCart = localStorage.getItem("cart");
//   //   if (savedCart) {
//   //     setCartItems(JSON.parse(savedCart));
//   //   }
//   // }, []);
//   // useEffect(() => {
//   //   localStorage.setItem("cart", JSON.stringify(cartItems));
//   // }, [cartItems]);
//   // const addToCart = (item) => {
//   //   setCartItems((prevItems) => [
//   //     ...prevItems,
//   //     {
//   //       product: item,
//   //       quantity: 1,
//   //       shop: item.shop._id,
//   //     },
//   //   ]);
//   // };

//   // const removeFromCart = (item) => {
//   //   setCartItems((prevItems) =>
//   //     prevItems.filter((prevItem) => prevItem.product.id !== item.product.id)
//   //   );
//   // };
//   // const cartCount = cartItems.length;

//   const addToCart = (item) => {
//     const updatedCartItems = [...cartItems, {
//       product: item,
//       quantity: 1,
//       shop: item.shop._id,
//     }];
//     setCartItems(updatedCartItems);
//     // setCartItems([...cartItems, {product:item,quantity:1,shop:item.shop._id}]);
//     // Store updated cartItems in localStorage
//     localStorage.setItem('cart', JSON.stringify(updatedCartItems));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (windowWidth > 1023) {
//       setHidetoggle(false);
//     }
//   }, [windowWidth]);
// const itemTotal = JSON.parse(localStorage.getItem("cart"));
//   return (
//     <MyContext.Provider
//       value={{
//         hidetoggle,
//         setHidetoggle,
//         cartItems,
//         itemTotal,
//         addToCart,
//         show,
//         setShow
//       }}
//     >
//       {children}
//     </MyContext.Provider>
//   );
// };

// export { Context, MyContext };












import React, { useEffect, useState,useRef } from "react";
const MyContext = React.createContext();
const Context = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const sliderRef = useRef(null);

  useEffect(()=>{
    const handleResize = ()=>{
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize",handleResize)
  },[])
  useEffect(()=>{
    if(windowWidth>1023){
      setToggle(false)
    }
  },[windowWidth])
  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  return (
    <MyContext.Provider value={{ toggle, setToggle,sliderRef,previousSlide,nextSlide }}>
      {children}
    </MyContext.Provider>
  );
};

export { Context, MyContext };

