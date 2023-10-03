import React, { useEffect, useState, useRef } from "react";
const MyContext = React.createContext();
const Context = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [hide, sethide] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("carts");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const calculateItemCount = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };
  const [itemCount, setItemCount] = useState(calculateItemCount());

  const sliderRef = useRef(null);
  const sidebarRef = useRef(null);

 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (windowWidth > 1023) {
      setToggle(false);
    }
  }, [windowWidth]);
  useEffect(()=>{
    if(windowWidth > 1023){
      sethide(true)
    }
  },[windowWidth])


  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    // Calculate the item count whenever the cartItems change
    setItemCount(calculateItemCount());
  }, [cartItems]);

  const addToCart = (item) => {
    // Find the existing item in the cart
    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.product._id === item._id && cartItem.shop === item.shop._id
    );

    if (existingItem) {
      // If the item already exists in the cart, check its quantity before updating
      if (existingItem.quantity < item.quantity) {
        // If the cart quantity is less than the available quantity, increase the cart quantity
        setCartItems((prevCartItems) =>
          prevCartItems.map((cartItem) =>
            cartItem.product._id === item._id && cartItem.shop === item.shop._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        // If the cart quantity is equal to or greater than the available quantity, show a message or take appropriate action
        alert("The product quantity in the cart is already at its maximum.");
      }
    } else {
      // If the item is not in the cart, add it with quantity = 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        {
          product: item,
          quantity: 1,
          shop: item.shop._id,
        },
      ]);
    }
  };

  const updateCart = (itemIndex, quantity) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("carts")) {
        cart = JSON.parse(localStorage.getItem("carts"));
      }
      cart[itemIndex].quantity = quantity;
      setCartItems(cart);
      // Update the local storage as well
      localStorage.setItem("carts", JSON.stringify(cart));
    }
  };

  const getCart = () => {
    if (localStorage.getItem("carts")) {
      return JSON.parse(localStorage.getItem("carts"));
    }
    return [];
  };

  const removeCartItem = (itemIndex) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("carts")) {
        cart = JSON.parse(localStorage.getItem("carts"));
      }
      cart.splice(itemIndex, 1);
      localStorage.setItem("carts", JSON.stringify(cart));
      setCartItems(cart);
      // Update the local storage as well
      localStorage.setItem("carts", JSON.stringify(cart));
    }
    return cart;
  };
  const emptyCart = (cb) => {
    if (typeof window !== "undefined") localStorage.removeItem("carts");
    setCartItems([]);
    cb();
  };

  const getItemCount = () => {
    return itemCount;
  };
  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  return (
    <MyContext.Provider
      value={{
        toggle,
        setToggle,
        sliderRef,
        previousSlide,
        nextSlide,
        addToCart,
        getCart,
        getItemCount,
        updateCart,
        removeCartItem,
        emptyCart,
        hide,
        sethide,
        sidebarRef
        
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { Context, MyContext };
