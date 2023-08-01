import React, { useEffect, useState } from "react";
import hero from "../assets/images/hero_bg.jpg";
import { Link, useParams } from "react-router-dom";
import { read } from "../apis/order-api";
import auth from "../authentication/auth-helper";
import Loading from "../components/Loading";
const Order = () => {
  const params = useParams();
  const [order, setOrder] = useState({ products: [], delivery_address: {} });
  const [loading, setLoading] = useState(true);

  const jwt = auth.isAuthenticated();
  useEffect(() => {
    setLoading(true)
    fetchOrder();

    return () => {};
  }, []);
  const fetchOrder = async () => {
    try {
      const data = await read({ orderId: params.orderId }, { t: jwt.token });
      setOrder(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  if(loading){
    return <Loading/>
  }
  const getTotal = () => {
    return order.products.reduce((a, b) => {
       const quantity = b.status == "Cancelled" ? 0 : b.quantity
        return a + (quantity*b.product.price)
    }, 0)
  }
  return (
    <div>
      <Link to={".."}>Back</Link>
      <div className="h-[194px] relative">
        <img className="w-full h-full object-cover object-center" src={hero} />
        <p className="absolute top-1/2 left-1/2 w-full text-center sm:text-2xl md:text-3xl lg:text-4xl transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          Order Details
        </p>
      </div>
      <div className="container mt-[30px] mx-auto">
        <div className="bg-white p-4 shadow-md">
          <p className="text-base text-gray-500">
            Order Code: <strong>{order._id}</strong> <br />
            Placed on {new Date(order.created).toDateString()}
          </p>
          <br />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="p-6 bg-gray-100">
              {order.products.map((item, i) => (
                <span key={i}>
                  <div className="flex">
                    <img
                      className="w-24 h-20 object-cover mr-4"
                      src={`/api/product/photo/${item.product._id}`}
                      alt={item.product.name}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">
                        <Link to={`/product/${item.product._id}`}>
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-base text-blue-600">
                        Rs.{item.product.price} x {item.quantity}
                      </p>
                      <p className="text-lg font-semibold text-green-600">
                        Rs.{item.product.price * item.quantity}
                      </p>
                      <p className="text-base text-gray-600">
                        Shop:
                        {item.shop.name}
                      </p>
                      <p
                        className={`text-base 
                  ${
                    item.status === "Cancelled"
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                      >
                        Status:
                        {item.status}
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" />
                </span>
              ))}
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">
                  Total:
                  Rs.{getTotal()}
                </p>
              </div>
            </div>
            <div className="p-6 bg-gray-100">
              <h2 className="text-lg font-semibold text-blue-600">
                Deliver to:
              </h2>
              <p className="text-base text-blue-600">
                <strong>{order.customer_name}</strong>
              </p>
              <p className="text-base text-blue-600">{order.customer_email}</p>
              <hr className="my-4" />
              <p className="text-base text-blue-600">
                {order.delivery_address.street}
              </p>
              <p className="text-base text-blue-600">
                {order.delivery_address.city}, {order.delivery_address.state}{" "}
                {order.delivery_address.zipcode}
              </p>
              <p className="text-base text-blue-600">
                {order.delivery_address.country}
              </p>
              <br />
              <p className="italic text-base text-green-600">
                Thank you for shopping with us! <br />
                You can track the status of your purchased items on this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
