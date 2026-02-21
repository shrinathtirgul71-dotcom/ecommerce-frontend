import React from 'react'
import "./buynow.css";
import Option from './Option';
import Right from './Right';
import Subtotal from './Subtotal';
import { Divider } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react'; // 👈 Add this
import { LoginContext } from "../context/ContextProvider"; // 👈 Add this
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Buynow = () => {

    const [cartData, setCartdata] = useState([]);
    const navigate = useNavigate();
    const { account } = useContext(LoginContext); // 👈 Add this to check login status

    const getdatabuy = async () => {
        try {
            const res = await fetch("/cartdetails", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (res.status === 401) {
                toast.error("Session expired. Please login again.", { position: "top-center" });
                setTimeout(() => navigate('/login'), 1500);
            } else if (res.status !== 201) {
                toast.error("Failed to load cart. Please try again.", { position: "top-center" });
            } else {
                setCartdata(data.carts);
            }
        } catch (error) {
            console.error("Cart loading error:", error);
            toast.error("Network error. Please check your connection.", { position: "top-center" });
        }
    };

    const getGroupedItems = (items) => {
        const grouped = {};
        items.forEach((item) => {
            if (grouped[item.id]) {
                grouped[item.id].quantity += 1;
            } else {
                grouped[item.id] = { ...item, quantity: 1 };
            }
        });
        return Object.values(grouped);
    };

    const groupedCart = getGroupedItems(cartData);

    useEffect(() => {
        getdatabuy();
    }, []);

    return (
        <>
            <div className='buynow_section'>
                <div className='buynow_container'>
                    {
                        cartData.length ? (
                            <div className='left_buy'>
                                <h1>Shopping Cart</h1>
                                <p>Select all items</p>
                                <span className='leftbuyprice'>price</span>
                                <Divider />
                                {
                                    groupedCart.map((e, k) => {
                                        return (
                                            <>
                                                <div className='item_containert' key={k}>
                                                    <img src={e.url} alt='' />
                                                    <div className='item_details'>
                                                        <h3>{e.title.longTitle}</h3>
                                                        <h3>{e.title.shortTitle}</h3>
                                                        <h3 className='diffrentprice'>₹{e.price.cost}.00</h3>
                                                        <p className='unusuall'>Usually dispatched in 8 days.</p>
                                                        <p>Eligible for FREE Shipping</p>
                                                        <img src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png' alt='' />
                                                        
                                                        <Option deletedata={e.id} get={getdatabuy} quantity={e.quantity} /> 
                                                    </div>
                                                    <h3 className='item_price'>₹{e.price.cost * e.quantity}.00</h3>
                                                </div>
                                                <Divider />
                                            </>
                                        )
                                    })
                                }
                                <Subtotal items={cartData} />
                            </div>
                        ) : (
                            <div className='empty_buy'>
                                <img
                                    src='https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg'
                                    alt='Empty Cart'
                                />
                                <div className='emptydata'>
                                    <h1>Your Amazon Cart is Empty</h1>
                                    
                                    {/* 👇 CONDITIONAL MESSAGE BASED ON LOGIN STATUS */}
                                    {account ? (
                                        // ✅ LOGGED IN - Show this message
                                        <p className='logged_in_msg'>
                                            Check your Saved for later items below or continue shopping.
                                        </p>
                                    ) : (
                                        // ❌ LOGGED OUT - Show login buttons
                                        <>
                                            <p onClick={() => navigate('/')} className='shop_deals_link'>
                                                Shop today's deals
                                            </p>
                                            <div className='empty_buttons'>
                                                <button onClick={() => navigate('/login')} className='signin_btn'>
                                                    Sign in to your account
                                                </button>
                                                <button onClick={() => navigate('/register')} className='signup_btn'>
                                                    Sign up now
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    }
                    <Right items={cartData} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Buynow