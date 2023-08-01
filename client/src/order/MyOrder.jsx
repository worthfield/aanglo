import { useState, useEffect } from "react";
import { listByUser } from "../apis/order-api";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import auth from "../authentication/auth-helper";
import marketplace from "../assets/images/marketplace.jpg";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    setLoading(true);
    fetchMyOrder();
  }, []);
  const fetchMyOrder = async () => {
    try {
      const response = await listByUser(
        { userId: jwt.user._id },
        { t: jwt.token }
      );
      setOrders(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="divide-y divide-gray-300 ">
          {orders.map((order, i) => (
            <li key={i} className="py-2">
              <Link to={"/order/" + order._id} className="block">
                <button className="flex items-center">
                  <strong className="text-blue-600">Order #{order._id}</strong>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(order.created).toDateString()}
                  </span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center h-full justify-center">
          <p className="text-2xl font-mono text-red-500">Haven't order yet ?</p>
          <div>
            <img
              className="w-full h-full object-cover object-center"
              src={marketplace}
            />
          </div>
          <Link to={'/'} className="text-blue-500 font-semibold">continue shopping</Link>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
