import React, { useState } from "react";
import auth from "../authentication/auth-helper";
import cart from "../apis/cart-api";
import PlaceOrder from "./PlaceOrder";
const Checkout = () => {
  const user = auth.isAuthenticated().user;
  const [values, setValues] = useState({
    checkoutDetails: {
      products: cart.getCart(),
      customer_name: user.name,
      customer_email: user.email,
      delivery_address: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
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
    // <div className="card fixed inset-0 flex items-center justify-center z-50">
    //   <h2 className="title">Checkout</h2>
    //   <label htmlFor="name">Name</label>
    //   <input
    //     id="name"
    //     type="text"
    //     className="textField"
    //     value={values.checkoutDetails.customer_name}
    //     onChange={handleCustomerChange("customer_name")}
    //   />
    //   <br />
    //   <label htmlFor="email">Email</label>
    //   <input
    //     id="email"
    //     type="email"
    //     className="textField"
    //     value={values.checkoutDetails.customer_email}
    //     onChange={handleCustomerChange("customer_email")}
    //   />
    //   <br />
    //   <h3 className="subheading">Delivery Address</h3>
    //   <label htmlFor="street">Street Address</label>
    //   <input
    //     id="street"
    //     type="text"
    //     className="streetField"
    //     value={values.checkoutDetails.delivery_address.street}
    //     onChange={handleAddressChange("street")}
    //   />
    //   <br />
    //   <label htmlFor="city">City</label>
    //   <input
    //     id="city"
    //     type="text"
    //     className="addressField"
    //     value={values.checkoutDetails.delivery_address.city}
    //     onChange={handleAddressChange("city")}
    //   />
    //   <br />
    //   <label htmlFor="state">State</label>
    //   <input
    //     id="state"
    //     type="text"
    //     className="addressField"
    //     value={values.checkoutDetails.delivery_address.state}
    //     onChange={handleAddressChange("state")}
    //   />
    //   <br />
    //   <label htmlFor="zipcode">Zip Code</label>
    //   <input
    //     id="zipcode"
    //     type="text"
    //     className="addressField"
    //     value={values.checkoutDetails.delivery_address.zipcode}
    //     onChange={handleAddressChange("zipcode")}
    //   />
    //   <br />
    //   <label htmlFor="country">Country</label>
    //   <input
    //     id="country"
    //     type="text"
    //     className="addressField"
    //     value={values.checkoutDetails.delivery_address.country}
    //     onChange={handleAddressChange("country")}
    //   />
    //   <br />
    //   {values.error && (
    //     <p className="error">
    //       <span className="error-icon">error</span>
    //       {values.error}
    //     </p>
    //   )}
    //   <div>
    //   <PlaceOrder checkoutDetails={values.checkoutDetails} />
    //   </div>
    // </div>

    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white p-6 rounded-lg shadow-xl z-20">
        {/* <div className="flex justify-between">
          <button
            className="mt-4 px-4 py-2 text-white bg-red-400 rounded font-bold"
            
          >
            CANCEL
          </button>
          <button className="mt-4 px-4 py-2 text-white bg-[#1D9BF0] rounded font-bold">
            Submit
          </button>
        </div> */}
        <p className="text-md md:text-lg font-bold">Checkout</p>
        <div className="form gap-2 flex flex-col mt-[20px]">
          <div className="flex gap-2 items-center">
            <label htmlFor="name" className="italic">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.customer_name}
              onChange={handleCustomerChange("customer_name")}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="email" className="italic">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.customer_email}
              onChange={handleCustomerChange("customer_email")}
            />
          </div>
          <hr />
          <p className="font-bold">Delivery Address</p>
          <div className="flex gap-2 items-center">
            <label htmlFor="street" className="italic">
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
          <div className="flex gap-2 items-center">
            <label htmlFor="city" className="italic">
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
          <div className="flex gap-2 items-center">
            <label htmlFor="state" className="italic">
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
          <div className="flex gap-2 items-center">
            <label htmlFor="zipcode" className="italic">
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
          <div className="flex gap-2 items-center">
            <label htmlFor="country" className="italic">
              Country
            </label>
            <input
              id="country"
              type="text"
              className="textField border-2 px-2 py-1 rounded-md focus:outline-blue-400"
              value={values.checkoutDetails.delivery_address.country}
              onChange={handleAddressChange("country")}
            />
          </div>
            {values.error && (
              <p className="error">
                <span className="error-icon">error</span>
                {values.error}
              </p>
            )}
        </div>
          <PlaceOrder checkoutDetails={values.checkoutDetails} />

      </div>
    </div>
  );
};

export default Checkout;
// import React, { useState } from "react";

// const Checkout = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
//       <div className="bg-white p-6 rounded-lg shadow-xl z-20">
//         <div className="flex justify-between">
//           <button
//             className="mt-4 px-4 py-2 text-white bg-red-400 rounded font-bold"
//             onClick={onClose}
//           >
//             CANCEL
//           </button>
//           <button className="mt-4 px-4 py-2 text-white bg-[#1D9BF0] rounded font-bold">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
