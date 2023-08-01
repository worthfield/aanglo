import React, { useState, useEffect } from "react";
import {
  cancelProduct,
  getStatusValues,
  processCharge,
  update,
} from "../apis/order-api";
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
      console.log(data);
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
    // <div>
    //   <span>{values.error}</span>
    //   <ul style={{ backgroundColor: "#f8f8f8", padding: 0 }}>
    //     {props.order.products.map((item, index) => (
    //       <span key={index}>
    //         {item.shop == props.shopId && (
    //           <li>
    //             <div>
    //               <img src={`/api/product/image/${item.product._id}`} />
    //               <div>
    //                 {item.product.name}
    //                 <p>{"Quantity: " + item.quantity}</p>
    //               </div>
    //             </div>
    //             <select
    //               id="select-status"
    //               value={item.status}
    //               onChange={handleStatusChange(index)}
    //             >
    //               {values.statusValues.map((option) => (
    //                 <option key={option} value={option}>
    //                   {option}
    //                 </option>
    //               ))}
    //             </select>
    //           </li>
    //         )}
    //         <hr style={{ margin: "auto", width: "80%" }} />
    //       </span>
    //     ))}
    //   </ul>
    // </div>
    <div className="p-5 border-t-2 bg-gray-100">
      {props.order.products.map((item, index) => {
        console.log(item.status);
        return (
          <span key={index}>
            {item.shop == props.shopId && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 rounded-lg">
                    <img
                      width={100}
                      height={50}
                      className="rounded-lg"
                      src={`/api/product/photo/${item.product._id}`}
                    />
                  </div>
                  <div>
                    <p className="font-medium lg:text-xl">
                      {item.product.name}
                    </p>
                    <p className="text-gray-600">
                      {"Quantity: " + item.quantity}
                    </p>
                  </div>
                </div>
                <select
                  id="select-status"
                  value={item.status}
                  className="border-2 p-2 focus:outline-blue-300"
                  onChange={handleStatusChange(index)}
                >
                  {values.statusValues.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <hr style={{ margin: "auto", width: "80%" }} />
          </span>
        );
      })}
    </div>
  );
};

export default ProductOrderEdit;
