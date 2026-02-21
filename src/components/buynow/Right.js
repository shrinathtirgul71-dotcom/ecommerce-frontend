import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  // ✅ ADD THIS IMPORT

const Right = ({items}) => {

    const navigate = useNavigate();
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (items && items.length > 0) {
            totalAmount();
        } else {
            setPrice(0);  // ✅ Reset price when cart is empty
        }
    }, [items])

    const totalAmount = () => {
        let total = 0;
        items.map((item) => {
            total = item.price.cost + total
        });
        setPrice(total)
    }

   const handleProceedToBuy = () => {
    if (!items || items.length === 0) {
        toast.warning("Your cart is empty!", {
            position: "top-center",
            autoClose: 2000
        });
        setTimeout(() => navigate('/'), 1000);
        return;
    }
    localStorage.setItem('cartTotal', price);  // 👈 save price
    navigate('/payment');
};

    return (
        <div className='right_buy'>
            <img src='https://images-eu.ss1-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png' alt='' />
            <div className='cost_right'>
                <p>Your order is eligible for FREE Delivery.</p> <br />
                <span style={{ color: '#565959' }}>Select this option at checkout. Details</span>
                <h3>Subtotal ({items.length} items):<span style={{ fontWeight: 700 }}> ₹{price}.00</span> </h3>
                <button className='rightbuy_btn' onClick={handleProceedToBuy}> Process to Buy </button>
                <div className='emi'>
                    Emi available
                </div>
            </div>
        </div>
    )
}

export default Right