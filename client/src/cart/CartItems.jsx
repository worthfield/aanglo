import React, { useState } from "react";
import cart from "../apis/cart-api";
import { Link } from "react-router-dom";
import auth from "../authentication/auth-helper";
import { AiOutlineClose } from "react-icons/ai";
import marketplace from '../assets/images/marketplace.jpg'

const CartItems = (props) => {
  const [cartItems, setCartItems] = useState(cart.getCart());

  const handleChange = (index) => (event) => {
    let updatedCartItems = cartItems;
    if (event.target.value == 0) {
      updatedCartItems[index].quantity = 1;
    } else {
      updatedCartItems[index].quantity = event.target.value;
    }
    setCartItems([...updatedCartItems]);
    cart.updateCart(index, event.target.value);
  };

  const getTotal = () => {
    return cartItems.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
  };

  const removeItem = (index) => (event) => {
    let updatedCartItems = cart.removeItem(index);
    if (updatedCartItems.length == 0) {
      props.setCheckout(false);
    }
    setCartItems(updatedCartItems);
  };

  const openCheckout = () => {
    props.setCheckout(true);
  };
  return (
    // <div>
    //   <p>Shopping Cart</p>
    //   {cartItems.length > 0 ? (
    //     <span>
    //       {cartItems.map((item, i) => {
    //         return (
    //           <span key={i}>
    //             <div>
    //               <img
    //                 src={"/api/product/image/" + item.product._id}
    //                 alt={item.product.name}
    //               />
    //               <div>
    //                 <div>
    //                   <Link to={"/product/" + item.product._id}>
    //                     <p>{item.product.name}</p>
    //                   </Link>
    //                   <div>
    //                     <p>$ {item.product.price}</p>
    //                     <span>${item.product.price * item.quantity}</span>
    //                     <span>Shop: {item.product.shop.name}</span>
    //                   </div>
    //                 </div>
    //                 <div className="subheading">
    //                   Quantity:
    //                   <input
    //                     value={item.quantity}
    //                     onChange={handleChange(i)}
    //                     type="number"
    //                     min="1"
    //                     className="border-2 border-black"
    //                   />
    //                   <button className="removeButton" onClick={removeItem(i)}>
    //                     x Remove
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //             <br />
    //           </span>
    //         );
    //       })}
    //       <div>
    //         <span >Total: ${getTotal()}</span>
    //         {!props.checkout &&
    //           (auth.isAuthenticated() ? (
    //             <button
    //               onClick={openCheckout}
    //             >
    //               Checkout
    //             </button>
    //           ) : (
    //             <Link to="/signin">
    //               <button>
    //                 Sign in to checkout
    //               </button>
    //             </Link>
    //           ))}
    //         <Link to="/">
    //           <button>Continue Shopping</button>
    //         </Link>
    //       </div>
    //     </span>
    //   ) : (
    //     <p>No items added to your cart.</p>
    //   )}
    // </div>
    <div className="grid mt-[24px] lg:grid-cols-2 grid-cols-1">
      {cartItems.length > 0 ? (
        <div className="border-t-2 ">
          {cartItems.map((item, i) => {
            return (
              <div key={i} className="flex border-b-2 gap-4 py-[40px]">
                <div className="image w-[6rem] h-[6rem] sm:w-[12rem] bg-white sm:h-[12rem]">
                  <img
                    className="w-full h-full"
                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg"
                    alt=""
                  />
                </div>
                <div className="info flex flex-1 justify-between">
                  <div className="left flex mr-[50px] justify-between flex-1">
                    <div className="basic">
                      <div>{item.product.name}</div>
                      <div className="text-gray-400">
                        by {item.product.shop.name}
                      </div>
                      <div>Rs.{item.product.price}</div>
                      <div>Total: {item.product.price * item.quantity}</div>
                    </div>
                    <div className="basic flex gap-1 justify-center">
                      <div className="p-1">Quantity</div>
                      <input
                        value={item.quantity}
                        onChange={handleChange(i)}
                        type="number"
                        min="1"
                        className="border-2 focus:outline-blue-300 w-[50px] h-[30px] rounded-md p-1 border-black"
                      />
                    </div>
                  </div>
                  <div
                    className="right cursor-pointer h-[30px]"
                    onClick={removeItem(i)}
                  >
                    <AiOutlineClose size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="col-span-2 place-self-center">
          <p className="text-2xl text-center font-mono text-red-500">Your Shopping Cart is empty ?</p>
          <div>
            <img
              className="w-full h-full object-cover object-center"
              src={marketplace}
            />
          </div>
          <Link to={'/'} className="text-center lg:ml-20 text-lg font-bold text-blue-700">Continue Shoping on Aanglo...</Link>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="lg:ml-[4rem] mb-[40px] bg-white rounded-md lg:h-[350px] p-[32px]">
          <p className="text-xl font-bold">Order Summary</p>
          <div className="mt-[24px]">
            <div className="flex justify-between">
              <p className="text-md text-gray-500">Subtotal</p>
              <p>Rs.{getTotal()}</p>
            </div>
            <div className="flex border-t-2 mt-[16px] pt-[16px] justify-between">
              <p className="text-md text-gray-500">Tax estimate</p>
              <p>Rs.0.00</p>
            </div>
            <div className="flex border-t-2 mt-[16px] pt-[16px] justify-between">
              <p className="text-xl">Order total</p>
              <p>Rs.{getTotal()}</p>
            </div>
          </div>
          {!props.checkout &&
            (auth.isAuthenticated() ? (
              <button
                onClick={openCheckout}
                className="mt-[24px] w-full bg-[#4f46e5] text-white rounded-md text-xl p-3"
              >
                Checkout
              </button>
            ) : (
              <Link
                to="/signin"
                className="mt-[24px] w-full bg-[#4f46e5] text-white rounded-md text-xl p-3"
              >
                Sign in to checkout
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
