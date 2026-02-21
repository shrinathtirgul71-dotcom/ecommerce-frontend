import React from 'react'
import "./signup.css";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Sign_in = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [logdata, setData] = useState({
        email: '',
        password: ''
    });

    const { account, setAccount } = useContext(LoginContext);

    // Show alert when redirected from cart
    useEffect(() => {
        if (location.state?.message) {
            toast.warn(location.state.message, {
                position: "top-center",
            });
        }
    }, [location]);

    const adddata = (e) => {
        const { name, value } = e.target;

        setData(prev => ({
            ...logdata,
            [name]: value
        }))
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        // ✅ Better validation
        if (!email || !password) {
            toast.error("Please fill in all fields", {
                position: "top-center",
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address", {
                position: "top-center",
            });
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters", {
                position: "top-center",
            });
            return;
        }

        try {
            const res = await fetch("https://ecommerce-backend-1-b285.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password,
                })
            });

            const data = await res.json();

            if (res.status === 400) {
                toast.error("Invalid email or password", {
                    position: "top-center",
                });
            } else if (res.status === 401) {
                toast.error("Incorrect password. Please try again.", {
                    position: "top-center",
                });
            } else if (res.status === 404) {
                toast.error("No account found with this email", {
                    position: "top-center",
                });
            } else if (!data) {
                toast.error("Something went wrong. Please try again.", {
                    position: "top-center",
                });
            } else {
                setAccount(data);
                toast.success("Login successful! Welcome back 🎉", {
                    position: "top-center",
                    autoClose: 1500
                });
                setData({ email: "", password: "" });
                
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Network error. Please check your connection and try again.", {
                position: "top-center",
            });
        }
    }

    return (
        <>
            <section>
                <div className='sign_container'>
                    <div className='sign_header'>
                        <img src='assest/blacklogoamazon.png' alt='amazonlogo' />
                    </div>
                    <div className='sign_form'>
                        <form method='POST'>
                            <h1>Sign-In</h1>
                            <div className='form_data'>
                                <label htmlFor='email'>Email</label>
                                <input type='email'
                                    onChange={adddata}
                                    value={logdata.email}
                                    name='email' 
                                    id='email' 
                                    placeholder='Enter your email'
                                />
                            </div>
                            <div className='form_data'>
                                <label htmlFor='password'>Password</label>
                                <input type='password'
                                    onChange={adddata}
                                    value={logdata.password}
                                    name='password' 
                                    placeholder='At least 6 characters' 
                                    id='password' 
                                />
                            </div>
                            <button className='signin_btn' onClick={senddata}>Continue</button>
                        </form>
                    </div>
                    <div className='create_accountinfo'>
                        <p>New To Amazon</p>
                        <NavLink to='/register'> <button>Create Your Amazon Account</button></NavLink>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Sign_in
