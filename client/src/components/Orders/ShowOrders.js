import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../utils/axiosConfig";

const ShowOrders = () => {
  const [orders, setOrders] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const res = await axios.get(`/order/${user._id}`);

        const ordersWithItems = res.data.map((order) => {
          const items = order.order.items.map((item) => {
            return {
              id: item._id,
              name: item.name,
              price: item.price,
              photo: item.photo.path || item.photo,
            };
          });
          return {
            ...order,
            items: items,
          };
        });
        setOrders(ordersWithItems);
      } catch (error) {
        console.log(error);
      }
    };

    getUserOrders();
  }, [user._id]);
  console.log(orders);
  return (
    <div>
      {orders &&
        orders.map((order) => (
          <div
            className="w-1/2 flex flex-col mx-auto justify-end gap-2 mb-3"
            key={order._id}
          >
            <h1 className="text-center">
              <strong>Order Number:</strong> {order.confirmationNum}{" "}
            </h1>

            <span>
              {" "}
              <strong>Order Total:</strong> ${order.order.cartTotal}
            </span>
            <div className="font-bold">Shipping Address:</div>
            <ul className="flex flex-col">
              <li>{order.address.streetAddress}</li>
              <li>{order.address.city}</li>
              <li>{order.address.state}</li>
              <li>{order.address.zip}</li>
            </ul>
            {order.items.map((item) => (
              <ul className="border w-1/2 mx-auto" key={item._id}>
                <h1>{item.name}</h1>
                <li>${item.price}</li>
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-20 object-cover border-r-1"
                />
              </ul>
            ))}
          </div>
        ))}
    </div>
  );
};

export default ShowOrders;
