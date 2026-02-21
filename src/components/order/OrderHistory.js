import React, { useState, useEffect } from 'react';
import './orderhistory.css';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const OrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // 👇 load orders from localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrders(savedOrders);
    }, []);

    const getPaymentMethod = (method) => {
        switch(method) {
            case 'card': return '💳 Credit/Debit Card';
            case 'upi': return '📱 UPI';
            case 'netbanking': return '🏦 Net Banking';
            case 'cod': return '💵 Cash on Delivery';
            default: return method;
        }
    };

    return (
        <div className='orderhistory_section'>
            <div className='orderhistory_container'>
                <h1>Your Orders</h1>

                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div className='order_card' key={index}>
                            <div className='order_card_header'>
                                <div className='order_card_header_left'>
                                    <p>ORDER PLACED</p>
                                    <h4>{order.date}</h4>
                                </div>
                                <div className='order_card_header_left'>
                                    <p>TOTAL</p>
                                    <h4>₹{order.amount}.00</h4>
                                </div>
                                <div className='order_card_header_left'>
                                    <p>PAYMENT</p>
                                    <h4>{getPaymentMethod(order.method)}</h4>
                                </div>
                                <div className='order_card_header_right'>
                                    <p>ORDER ID</p>
                                    <h4>#{order.orderId}</h4>
                                </div>
                            </div>

                            <div className='order_card_body'>
                                <div className='order_status'>
                                    <CheckCircleIcon style={{ color: '#007600', fontSize: 20 }} />
                                    <span className='status_text'>
                                        {order.status} — {order.date}
                                    </span>
                                </div>
                                <p className='order_payment_id'>
                                    Payment ID: {order.paymentId}
                                </p>
                            </div>

                            <div className='order_card_footer'>
                                <button
                                    onClick={() => navigate('/')}
                                    className='buy_again_btn'
                                >
                                    Buy Again
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className='view_order_btn'
                                >
                                    View Order Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    // 👇 empty order history
                    <div className='empty_orders'>
                        <ShoppingBagIcon style={{ fontSize: 80, color: '#d5d9d9' }} />
                        <h2>No Orders Yet!</h2>
                        <p>You haven't placed any orders yet.</p>
                        <button onClick={() => navigate('/')} className='shop_now_btn'>
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;