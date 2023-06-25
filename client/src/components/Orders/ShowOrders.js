import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../utils/axiosConfig";
import { formatDate } from "../../utils/formatDate";
import "./orders.css";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const res = await axios.get(`/order/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserOrders();
  }, [user._id]);
  console.log(orders);
  return (
    <div className="border bg-stone-300">
      {orders &&
        orders.map((order) => (
          <div
            className="w-full md:w-1/2 border-2 rounded-md shadow-lg border-slate-800 flex flex-col  flex-wrap content-center justify-between mx-auto  gap-2 mb-3"
            key={order._id}
          >
            <div className="flex justify-around gap-5 bg-zinc-300 border-b-2 w-full">
              <div>
                {" "}
                <div className="flex gap-2">
                  <span>
                    <strong className="mx-auto">Order #: </strong>

                    {order.confirmationNum}
                  </span>
                  <strong className="ml-5">Ordered: </strong>
                  <div className="ml-0">
                    {" "}
                    {formatDate(order.created)}
                  </div>
                </div>
              </div>
              <span className="self-center">
                <strong>Total:</strong> ${order.order.cartTotal}
              </span>{" "}
            </div>

            <details className=" flex-col  open:bg-slate-600 cursor-pointer">
              <summary className="bg-white">
                Order Details{" "}
                <span className="float-right">
                  Ship to {order.orderOwner.name}
                </span>
              </summary>
              <span className="font-bold ">Shipping Address:</span>
              <ul className="py-2 px-2">
                <li>{order.address.streetAddress}</li>
                <li>
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.zip}
                </li>
              </ul>

              {order.order.items.map((item) => (
                <div className="flex" key={item._id}>
                  {" "}
                  <img
                    src={item.photo.path || item.photo}
                    alt={item.name}
                    className="w-24 object-fit rounded-sm  "
                  />
                  <ul
                    className="flex flex-col flex-wrap content-center items-center w-1/2 mx-auto"
                    key={item._id}
                  >
                    {" "}
                    <h1 className="self-end font-bold text-cyan-700 ">
                      {item.name}
                    </h1>
                    <li className="self-start">${item.price}</li>
                    <span className="w-full  border-b-2">
                      <strong>Quantity:</strong>
                      {item.shopped}
                    </span>
                  </ul>
                </div>
              ))}
            </details>
          </div>
        ))}
    </div>
  );
};

export default ShowOrders;
