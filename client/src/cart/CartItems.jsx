import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../authentication/auth-helper";
import { AiOutlineClose } from "react-icons/ai";
import { MyContext } from "../Context-api";
import marketplace from "../assets/images/marketplace.jpg";

const CartItems = (props) => {
  const { getCart, updateCart, removeCartItem } = useContext(MyContext);

  const [addCartItems, setAddCartItems] = useState(getCart);

  const handleChange = (index) => (action) => {
    // const newQuantity = parseInt(event.target.value, 10); // Convert the value to an integer
    // let updatedCartItems = addCartItems.slice(); // Create a shallow copy of the cartItems array

    // if (isNaN(newQuantity) || newQuantity < 1) {
    //   // If the new quantity is not a number or less than 1, set it to 1
    //   updatedCartItems[index].quantity = 1;
    // } else {
    //   updatedCartItems[index].quantity = newQuantity;
    // }

    let updatedCartItems = addCartItems.slice(); // Create a shallow copy of the cartItems array
    const currentQuantity = updatedCartItems[index].quantity;
    const minQuantity = 1;
    const maxQuantity = updatedCartItems[index].product.quantity;

    if (action === "increment" && currentQuantity < maxQuantity) {
      updatedCartItems[index].quantity = currentQuantity + 1;
    } else if (action === "decrement" && currentQuantity > minQuantity) {
      updatedCartItems[index].quantity = currentQuantity - 1;
    }
    setAddCartItems(updatedCartItems);
    updateCart(index, updatedCartItems[index].quantity);
  };

  const getTotal = () => {
    return addCartItems.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
  };

  const removeItem = (i) => {
    let updatedCartItems = removeCartItem(i);
    if (updatedCartItems.length == 0) {
      props.setCheckout(false);
    }
    setAddCartItems(updatedCartItems);
  };

  const openCheckout = () => {
    props.setCheckout(true);
  };
  return (
    <div className="grid mt-[24px] lg:grid-cols-2 grid-cols-1">
      {addCartItems?.length > 0 ? (
        <div className="border-t-2 ">
          {addCartItems.map((item, i) => {
          
            return (
              <div key={i} className="border-b-2 ">
                <div className="flex gap-4 py-[40px]">
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
                        <div className="text-sm sm:text-base font-medium">
                          {item.product.name}
                        </div>
                        <div className="text-gray-400 mb-2 text-sm">
                          by {item.product.shop.name}
                        </div>
                        <div className="text-sm">Rs.{item.product.price}</div>
                        <div className="text-sm hidden font-medium">
                          Total: {item.product.price * item.quantity}
                        </div>
                      </div>
  
                    </div>
                    <div
                      className="right cursor-pointer h-[30px]"
                      onClick={() => removeItem(i)}
                    >
                      <AiOutlineClose size={24} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center mr-3 mb-3 justify-end">
                  <div className="mr-3">
                    <button
                      type="button" // Set the type attribute to "button"
                      onClick={() => handleChange(i)("decrement")}
                      className="border rounded-md px-3 text-xl"
                    >
                      -
                    </button>
                    <span className="px-3 text-lg py-1 rounded-md bg-gray-100">{item.quantity}</span>
                    <button
                      type="button" // Set the type attribute to "button"
                      onClick={() => handleChange(i)("increment")}
                      className="border rounded-md px-3 text-xl"
                      disabled={item.quantity >= item.product.quantity}
                    >
                      +
                    </button>
                  </div>
                  <div className="font-medium text-sm  sm:text-base">
                    Total: {item.product.price * item.quantity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="col-span-2 place-self-center">
          <p className="sm:text-2xl text-xl text-center font-mono text-red-500">
            Your Shopping Cart is empty ?
          </p>
          <div>
            <img
              className="w-full h-full object-cover object-center"
              src={marketplace}
            />
          </div>
          <Link
            to={"/"}
            className=" w-full underline flex justify-center text-lg font-bold text-blue-700"
          >
            Continue Shoping on Aanglo...
          </Link>
        </div>
      )}
      {addCartItems.length > 0 && (
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
                className="mt-[24px] w-full bg-red-500 text-white rounded-md text-xl p-3"
              >
                Checkout
              </button>
            ) : (
              <Link to="/signin">
                <p className="mt-[24px] w-full bg-red-500 text-white text-center rounded-md text-xl p-3">
                  Sign in to checkout
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
