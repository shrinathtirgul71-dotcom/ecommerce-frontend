import React from 'react';
import './emptycart.css';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const navigate = useNavigate();

    return (
        <div className='empty-cart-container'>
            <div className='empty-cart-content'>
                <img 
                    src='https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg' 
                    alt='Empty Cart' 
                    className='empty-cart-image'
                />
                <h2>Your Amazon Cart is empty</h2>
                <p>Shop today's deals and discover great products at amazing prices!</p>
                <button onClick={() => navigate('/')} className='shop-now-btn'>
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default EmptyCart;