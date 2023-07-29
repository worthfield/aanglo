import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CartItems from "./CartItems";
import Checkout from "./Checkout";
import hero from '../assets/images/hero_bg.jpg'
const Cart = () => {
  const [checkout, setCheckout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  const showCheckout = (val) => {
    setCheckout(val);
  };
  return (
    <>
      <div className="h-[194px] relative">
        <img className="w-full h-full object-cover object-center" src={hero} />
        <p className="absolute top-1/2 left-1/2 w-full text-center sm:text-2xl md:text-3xl lg:text-4xl transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          Shopping Cart
        </p>
      </div>
      <div className="container mt-[24px] mx-auto">
        <p className="md:text-2xl text-xl font-bold">Shopping Cart</p>
        <CartItems checkout={checkout} setCheckout={showCheckout} />
        {checkout && <Checkout isOpen={isOpen} onClose={closeDialog} />}
      </div>
    </>
  );
};

export default Cart;
