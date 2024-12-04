import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: { token },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders when the token changes
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order, index) => (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                  {order.items.map((item, index) => (
                      <span key={index}>
                  {item.name} x {item.quantity}
                        {index < order.items.length - 1 && ", "}
                </span>
                  ))}
                </p>
                <p>{currency}{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
          ))}
        </div>
      </div>
  );
};

export default MyOrders;