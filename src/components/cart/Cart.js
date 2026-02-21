import React from 'react'
import './cart.css';
import { Divider } from '@mui/material';
import Skeleton from '../loading/Skeleton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import {LoginContext} from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {

  const { id } = useParams();
  const history = useNavigate();
  const { account, setAccount} = useContext(LoginContext);

  const [inddata, setInddata] = useState(null);  // 👈 null instead of []
  const [loading, setLoading] = useState(true);

  const getinddata = async () => {
    setLoading(true);
    
    const fetchPromise = fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    const delayPromise = new Promise(resolve => setTimeout(resolve, 1000));
    
    const [res] = await Promise.all([fetchPromise, delayPromise]);
    const data = await res.json();

    if (res.status !== 201) {
      console.log("no data available");
      setInddata(null);  // 👈 set null on error
    } else {
      console.log("get data");
      setInddata(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getinddata();
  }, [id]);

  const addtocart = async (id) => {
    if (!account) {
      history("/login", { state: { message: "Please login to add items to cart" } });
      return;
    }

    try {
      const checkres = await fetch(`/addcart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await checkres.json();

      if (checkres.status === 401) {
        toast.error("Session expired. Please login again.", { position: "top-center" });
        setTimeout(() => history("/login"), 1500);
      } else if (checkres.status === 404) {
        toast.error("Product not found", { position: "top-center" });
      } else if (!data) {
        toast.error("Failed to add to cart. Please try again.", { position: "top-center" });
      } else {
        toast.success("Item added to cart! 🛒", { position: "top-center", autoClose: 800 });
        setAccount(data);
        setTimeout(() => { history("/buynow"); }, 800);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Network error. Please check your connection.", { position: "top-center" });
    }
  };

  const buynow = async (id) => {
    if (!account) {
      history("/login", { state: { message: "Please login to continue shopping" } });
      return;
    }

    try {
      const checkres = await fetch(`/addcart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await checkres.json();

      if (checkres.status === 401) {
        toast.error("Session expired. Please login again.", { position: "top-center" });
        setTimeout(() => history("/login"), 1500);
      } else if (checkres.status === 404) {
        toast.error("Product not found", { position: "top-center" });
      } else if (!data) {
        toast.error("Failed to proceed. Please try again.", { position: "top-center" });
      } else {
        setAccount(data);
        history("/buynow");
      }
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error("Network error. Please check your connection.", { position: "top-center" });
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton type="product-detail" />
      ) : inddata ? (  // 👈 simple null check
          <div className='cart_section'>
            <div className='cart_container'>
              <div className='left_cart'>
                <img src={inddata?.url} alt="cart_img" />
                <div className='cart_btn'>
                  <button className='cart_btn1' onClick={() => addtocart(inddata._id)}>Add to cart</button>
                  <button className='cart_btn2' onClick={() => buynow(inddata._id)}>Buy now</button>
                </div>
              </div>

              <div className='right_cart'>
                <h3>{inddata?.title?.shortTitle}</h3>
                <h4>{inddata?.title?.longTitle}</h4>
                <Divider />
                <p className='mrp'>M.R.P. : ₹{inddata?.price?.mrp}</p>
                <p>Deal of the Day:<span style={{ color: "#B12704" }}>₹{inddata?.price?.cost}.00</span></p>
                <p>You save:<span style={{ color: "#B12704" }}>₹{inddata?.price?.mrp - inddata?.price?.cost}({inddata?.price?.discount})</span></p>

                <div className='discount_box'>
                  <h5>Discount :<span style={{ color: '#111' }}>{inddata?.discount}</span></h5>
                  <h4>Free delivery :<span style={{ color: "#111", fontWeight: 600 }}>oct 8 - 21</span>Details</h4>
                  <p>Fastest delivery:<span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
                </div>

                <p className='Discription'>
                  About the Item:
                  <span style={{ color: '#565959', fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>
                    {inddata?.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          // 👇 No Product Found message
          <div className='noproduct_section'>
            <img
              src='https://m.media-amazon.com/images/G/31/error/title._TTD_.png'
              alt='Not Found'
              className='noproduct_img'
            />
            <h2>Product Not Found</h2>
            <p>We couldn't find the product you're looking for.</p>
            <button onClick={() => history('/')} className='noproduct_btn'>
              Back to Home
            </button>
          </div>
        )
      }
      <ToastContainer />
    </>
  );
};

export default Cart;