import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react'
import moment from 'moment'
import './Confirmation.css'
const Confirmation = ({ order }) => {
    const { user } = useContext(AuthContext);
    console.log(order)
    return (
        <div className="confirm-page">
            <div className="order-confirm">
                <h1 className="thank-you-statement">Thanks for your order, {user?.name}</h1>
                <div className="receipt">
                    <h3>Receipt</h3>
                    <div className="receipt-items">
                        {order && order?.order.items.map((item) => {
                            return (
                                <div className="items" key={item._id}>
                                    <div>
                                        <img src={item.photo?.path || item.photo} alt={item.name} />
                                        <div style={{fontWeight: "bolder"}}>{item.name}</div>
                                    </div>
                                    <div>
                                        <div>Quantity: {item.shopped}</div>
                                        <div>${item.price * item.shopped}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="receipt-order-details">
                        <div className="invoice">
                            <h4>Order Details</h4>
                            <div>
                                <p>Confirmation Number: <span className="confirm-num">{order?.confirmationNum}</span></p>
                                <p>Order Date: <span className="date">{moment().format('MMM Do YYYY')}</span></p>
                            </div>
                        </div>
                        <div className="total-info">
                            <div>
                                <h4>Total:</h4>
                                <p>${order?.order.cartTotal}</p>
                            </div>
                            <div>
                                <h4>Discount:</h4>
                                <p>$0.00</p>
                            </div>
                            <div>
                                <h4>Shipping:</h4>
                                <p>$0.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="total-paid">
                        <h1>TOTAL PAID: ${order?.order.cartTotal}</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Confirmation