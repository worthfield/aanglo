import React, { useState, useEffect } from "react";
import {
  cancelProduct,
  getStatusValues,
  processCharge,
  update,
} from "../apis/order-api";
// import { auth } from "../Export";
import useAuth from "../authentication/auth-helper";

const ProductOrderEdit = (props) => {
  const [values, setValues] = useState({
    open: 0,
    statusValues: [],
    error: "",
  });
  const jwt = useAuth.isAuthenticated();
  useEffect(() => {
    getStatusValue();
  }, []);

  const getStatusValue = async () => {
    try {
      const data = await getStatusValues();
      setValues({ ...values, statusValues: data });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
      }
    }
  };
  const handleStatusChange = (productIndex) => async (event) => {
    let order = props.order;
    order.products[productIndex].status = event.target.value;
    let product = order.products[productIndex];
    if (event.target.value == "Cancelled") {
      try {
        const data = await cancelProduct(
          { shopId: props.shopId, productId: product.product._id },
          { t: jwt.token },
          {
            cartItemId: product._id,
            status: event.target.value,
            quantity: product.quantity,
          }
        );
        props.updateOrders(props.orderIndex, order);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
          setValues({ ...values, error: "Status not updated" });
        }
      }
    } else if (event.target.value == "Processing") {
      try {
        const data = await processCharge(
          { userId: jwt.user._id, shopId: props.shopId, orderId: order._id },
          { t: jwt.token },
          {
            cartItemId: product._id,
            status: event.target.value,
            amount: product.quantity * product.product.price,
          }
        );
        props.updateOrders(props.orderIndex, order);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
          setValues({ ...values, error: "Status not updated" });
        }
      }
    } else {
      try {
        const data = await update(
          { shopId: props.shopId },
          { t: jwt.token },
          { cartItemId: product._id, status: event.target.value }
        );
        props.updateOrders(props.orderIndex, order);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.error);
        }
      }
    }
  };
  return (
    <div>
      <span>{values.error}</span>
      <ul style={{ backgroundColor: "#f8f8f8", padding: 0 }}>
        {props.order.products.map((item, index) => (
          <span key={index}>
            {item.shop == props.shopId && (
              <li>
                <div>
                  <img src={`/api/product/image/${item.product._id}`} />
                  <div>
                    {item.product.name}
                    <p>{"Quantity: " + item.quantity}</p>
                  </div>
                </div>
                <select
                  id="select-status"
                  value={item.status}
                  onChange={handleStatusChange(index)}
                >
                  {values.statusValues.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </li>
            )}
            <hr style={{ margin: "auto", width: "80%" }} />
          </span>
        ))}
      </ul>
    </div>
  );
};

export default ProductOrderEdit;
