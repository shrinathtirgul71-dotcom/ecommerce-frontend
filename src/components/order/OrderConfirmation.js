import React, { useEffect } from 'react';
import './orderconfirmation.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderData = location.state;  // 👈 get data passed from payment

    useEffect(() => {
        // redirect to home if no order data
        if (!orderData) {
            navigate('/');
        }
    }, []);

    return (
        <div className='order_confirmation'>
            <div className='order_card'>

                <div className='order_success'>
                    <CheckCircleIcon style={{ fontSize: 60, color: '#007600' }} />
                    <h1>Order Placed Successfully!</h1>
                    <p>Thank you for shopping with us!</p>
                </div>

                <div className='order_details'>
                    <h3>Order Summary</h3>
                    <div className='order_info'>
                        <div className='order_row'>
                            <span>Order ID:</span>
                            <span>#{orderData?.orderId}</span>
                        </div>
                        <div className='order_row'>
                            <span>Payment ID:</span>
                            <span>{orderData?.paymentId}</span>
                        </div>
                        <div className='order_row'>
                            <span>Amount Paid:</span>
                            <span style={{ color: '#B12704', fontWeight: 700 }}>
                                ₹{orderData?.amount}
                            </span>
                        </div>
                        <div className='order_row'>
                            <span>Date:</span>
                            <span>{new Date().toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </div>
                </div>

                <div className='order_delivery'>
                    <p>📦 Estimated Delivery: <strong>3-5 Business Days</strong></p>
                    <p>📧 Confirmation email sent to your registered email</p>
                </div>

                <div className='order_buttons'>
                    <button onClick={() => navigate('/')} className='continue_btn'>
                        Continue Shopping
                    </button>
                    <button onClick={() => navigate('/orderhistory')} className='history_btn'>
                        View Order History
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderConfirmation;