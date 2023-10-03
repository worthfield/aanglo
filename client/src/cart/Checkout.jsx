import React, { useContext, useState } from "react";
import auth from "../authentication/auth-helper";
import cart from "../apis/cart-api";
import PlaceOrder from "./PlaceOrder";
import { MyContext } from "../Context-api";
const Checkout = () => {
  const {getCart}=useContext(MyContext)
  const user = auth.isAuthenticated().user;
  const [values, setValues] = useState({
    checkoutDetails: {
      products: getCart(),
      customer_name: user.name,
      customer_email: user.email,
      delivery_address: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "Nepal",
      },
    },
    error: "",
  });
  const handleCustomerChange = (name) => (event) => {
    let checkoutDetails = values.checkoutDetails;
    checkoutDetails[name] = event.target.value || undefined;
    setValues({ ...values, checkoutDetails: checkoutDetails });
  };

  const handleAddressChange = (name) => (event) => {
    let checkoutDetails = values.checkoutDetails;
    checkoutDetails.delivery_address[name] = event.target.value || undefined;
    setValues({ ...values, checkoutDetails: checkoutDetails });
  };
  return (


    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white p-6 rounded-lg shadow-xl z-20">

        <p className="text-md md:text-lg font-bold">Checkout</p>
        <div className="form gap-2 flex flex-col mt-[20px]">
          <div className="flex gap-2 items-center">
            <label htmlFor="name" className="italic">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="textField pointer-events-none border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.customer_name}
              onChange={handleCustomerChange("customer_name")}
              disabled
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="email" className="italic">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="textField pointer-events-none border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.customer_email}
              onChange={handleCustomerChange("customer_email")}
              disabled
            />
          </div>
          <hr />
          <p className="font-bold">Delivery Address</p>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="street" className="italic text-sm">
              Street Address
            </label>
            <input
              id="street"
              type="text"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.delivery_address.street}
              onChange={handleAddressChange("street")}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="city" className="italic text-sm">
              City
            </label>
            <input
              id="city"
              type="text"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.delivery_address.city}
              onChange={handleAddressChange("city")}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="state" className="italic text-sm">
              State
            </label>
            <input
              id="state"
              type="text"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.delivery_address.state}
              onChange={handleAddressChange("state")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="zipcode" className="italic text-sm">
              Zip Code
            </label>
            <input
              id="zipcode"
              type="text"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.delivery_address.zipcode}
              onChange={handleAddressChange("zipcode")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="italic text-sm">
              Country
            </label>
            <input
              id="country"
              type="text"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.delivery_address.country}
              onChange={handleAddressChange("country")}
              disabled
            />

          </div>
        </div>
          <PlaceOrder checkoutDetails={values.checkoutDetails} />

      </div>
    </div>
  );
};

export default Checkout;
