import React, { useContext, useState } from "react";
import auth from "../authentication/auth-helper";
import { create } from "../apis/order-api";
import { Navigate, useParams } from "react-router-dom";
import { MyContext } from "../Context-api";
const PlaceOrder = (props) => {
  const { emptyCart } = useContext(MyContext);
  const [values, setValues] = useState({
    orderId: "",
    redirect: false,
    order: {},
    error: "",
  });
  const jwt = auth.isAuthenticated();
  const params = useParams();
  const createOrder = async () => {
    try {
      const data = await create(
        { userId: jwt.user._id },
        { t: jwt.token },
        props.checkoutDetails
      );
      emptyCart(() => {
        setValues({ ...values, orderId: data._id, redirect: true });
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
        setValues({...values,error:error.response.data.error})
      }
    }
  };

  if (values.redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-2">
      {values.error && (
        <p className="error bg-red-600 p-1 w-full text-white text-center rounded-md">
          {values.error}
        </p>
      )}
      <button
        className="flex justify-center mt-3 border-red-500 bg-red-500 text-white w-full text-center p-2 rounded-md"
        onClick={createOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
