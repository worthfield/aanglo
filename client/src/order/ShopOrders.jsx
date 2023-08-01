import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { listByShop } from "../apis/order-api";
import auth from "../authentication/auth-helper";
import ProductOrderEdit from "./ProductOrderEdit";
import hero from "../assets/images/hero_bg.jpg";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import marketplace from "../assets/images/marketplace.jpg";
import Loading from "../components/Loading";

const ShopOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(0);
  const params = useParams();

  const jwt = auth.isAuthenticated();
  useEffect(() => {
    setLoading(true)
    fetchOrder();
  }, []);
  const fetchOrder = async () => {
    try {
      const data = await listByShop(
        { shopId: params.shopId },
        { t: jwt.token }
      );
      setOrders(data);
      setLoading(false)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
        setLoading(false)
      }
    }
  };

  const handleClick = (index) => (event) => {
    setOpen(index);
  };

  const updateOrders = (index, updatedOrder) => {
    let updatedOrders = orders;
    updatedOrders[index] = updatedOrder;
    setOrders([...updatedOrders]);
  };

  const options = {
    weekday: "short", // or "short" for abbreviated day name, or "narrow" for a narrow day name
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  if(loading){
    return <Loading/>
  }

  return (
    <div>
      <div className="h-[194px] relative">
        <img className="w-full h-full object-cover object-center" src={hero} />
        <p className="absolute top-1/2 left-1/2 w-full text-center sm:text-2xl md:text-3xl lg:text-4xl transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          Orders in {params.shop}
        </p>
      </div>
      <div className="container mx-auto mt-[50px]">
        {orders.length > 0 ? (
          orders.map((order, index) => {
            return (
              <div key={index} className="mb-[30px]">
                <li
                  onClick={handleClick(index)}
                  className="flex justify-between cursor-pointer items-center mb-2 p-1"
                >
                  <div className="flex flex-col">
                    <h4
                      className={
                        open === index
                          ? "font-extrabold text-red-500"
                          : "font-medium"
                      }
                    >
                      {"Order # " + order._id}
                    </h4>
                    <span className="text-gray-400 text-sm">
                      {new Date(order.created).toLocaleString(
                        undefined,
                        options
                      )}
                    </span>
                  </div>
                  <MdOutlineKeyboardArrowUp size={24} />
                </li>
                <ProductOrderEdit
                  shopId={params.shopId}
                  order={order}
                  orderIndex={index}
                  updateOrders={updateOrders}
                />
                {open == index && (
                  <div className="p-5 bg-gray-100">
                    <h3>Deliver to:</h3>
                    <h3>
                      <strong>{order.customer_name}</strong> (
                      {order.customer_email})
                    </h3>
                    <h3>{order.delivery_address.street}</h3>
                    <h3>
                      {order.delivery_address.city},{" "}
                      {order.delivery_address.state}{" "}
                      {order.delivery_address.zipcode}
                    </h3>
                    <h3>{order.delivery_address.country}</h3>
                    <br />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center h-full justify-center">
            <p className="text-2xl font-mono text-red-500">
              Haven't got any order yet ?
            </p>
            <div>
              <img
                className="w-full h-full object-cover object-center"
                src={marketplace}
              />
            </div>
            <Link to={"/seller/shops"} className="text-blue-500 font-semibold">
              List amazing products here...
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopOrders;

{
  /* <div>
  <div >
    <h3>
      Orders in {params.shop}
    </h3>
    <ul>
      {orders.map((order, index) => (
        <div key={index}>
          <li onClick={handleClick(index)}>
            <h4>{'Order # ' + order._id}</h4>
            {open == index ? <span>ExpandLess</span> : <span>ExpandMore</span>}
          </li>
          <hr />
          <ProductOrderEdit shopId={params.shopId} order={order} orderIndex={index} updateOrders={updateOrders}/>

          {open == index && (
            <div>
              <h3>Deliver to:</h3>
              <h3>
                <strong>{order.customer_name}</strong> ({order.customer_email})
              </h3>
              <h3>{order.delivery_address.street}</h3>
              <h3>
                {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zipcode}
              </h3>
              <h3>{order.delivery_address.country}</h3>
              <br />
            </div>
          )}
          <hr />
        </div>
      ))}
    </ul>
  </div>
</div> */
}
