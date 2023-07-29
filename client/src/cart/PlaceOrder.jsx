import React, { useState } from "react";
import auth from "../authentication/auth-helper";
import { create } from "../apis/order-api";
import cart from "../apis/cart-api";
import { useParams } from "react-router-dom";
const PlaceOrder = (props) => {
  const [values, setValues] = useState({
    orderId: "",
    redirect: false,
    order: {},
  });
  const jwt = auth.isAuthenticated();
  const params = useParams();
  const createOrder = async () => {
    try {
      const data = await create(
        { userId: jwt.user._id },
        { t: jwt.token },props.checkoutDetails
      );
      cart.emptyCart(() => {
        setValues({ ...values, orderId: data._id, redirect: true });
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };
  console.log(values)

  return (
    <div>
      <button onClick={createOrder}>Place Order</button>
    </div>
  );
};

export default PlaceOrder;
