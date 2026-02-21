import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SIgnUp = () => {

    const navigate = useNavigate();

    const [udata, setUdata] = useState({
        fname: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: ''
    });

    // 👇 real-time error state
    const [errors, setErrors] = useState({
        fname: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: ''
    });

    // 👇 validate each field while typing
    const validate = (name, value) => {
        let error = '';

        if (name === 'fname') {
            if (!value) error = 'Name is required';
            else if (value.length < 2) error = 'Name must be at least 2 characters';
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) error = 'Email is required';
            else if (!emailRegex.test(value)) error = 'Please enter a valid email';
        }

        if (name === 'mobile') {
            if (!value) error = 'Mobile is required';
            else if (value.length < 10) error = 'Enter a valid 10-digit mobile number';
        }

        if (name === 'password') {
            if (!value) error = 'Password is required';
            else if (value.length < 6) error = 'Password must be at least 6 characters';
        }

        if (name === 'cpassword') {
            if (!value) error = 'Please confirm your password';
            else if (value !== udata.password) error = 'Passwords do not match';
        }

        return error;
    };

    // 👇 handle input change with validation
     const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 👇 only allow numbers for mobile
    if (name === 'mobile' && !/^\d*$/.test(value)) return;
    
    setUdata({ ...udata, [name]: value });
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
};

    const senddata = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = udata;

        // validate all fields before submit
        const newErrors = {
            fname: validate('fname', fname),
            email: validate('email', email),
            mobile: validate('mobile', mobile),
            password: validate('password', password),
            cpassword: validate('cpassword', cpassword)
        };

        setErrors(newErrors);

        // stop if any error
        if (Object.values(newErrors).some(e => e !== '')) return;

        try {
            const res = await fetch("https://ecommerce-backend-1-b285.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fname, email, mobile, password, cpassword })
            });

            const data = await res.json();

            if (res.status === 422) {
                if (data.error === "User already exists") {
                    setErrors({ ...errors, email: "Email already registered!" });
                } else {
                    toast.error(data.error || "Invalid details.", { position: "top-center" });
                }
            } else if (!data) {
                toast.error("Something went wrong. Please try again.", { position: "top-center" });
            } else {
                toast.success("Account created successfully! 🎉", {
                    position: "top-center",
                    autoClose: 2000
                });
                setUdata({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
                setErrors({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
                setTimeout(() => { navigate('/login'); }, 2000);
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Network error. Please check your connection.", { position: "top-center" });
        }
    }

    return (
        <section>
            <div className='sign_container'>
                <div className='sign_header'>
                    <img src='assest/blacklogoamazon.png' alt='amazonlogo' />
                </div>
                <div className='sign_form'>
                    <form method='POST'>
                        <h1>Sign-Up</h1>

                        <div className='form_data'>
                            <label htmlFor='fname'>Your Name</label>
                            <input
                                type='text'
                                onChange={handleChange}
                                value={udata.fname}
                                name='fname'
                                id='fname'
                                placeholder='First and last name'
                                className={errors.fname ? 'input_error' : ''}
                            />
                            {errors.fname && <p className='error_msg'>⚠️ {errors.fname}</p>}
                        </div>

                        <div className='form_data'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                onChange={handleChange}
                                value={udata.email}
                                name='email'
                                id='email'
                                placeholder='Enter your email'
                                className={errors.email ? 'input_error' : ''}
                            />
                            {errors.email && <p className='error_msg'>⚠️ {errors.email}</p>}
                        </div>

                        <div className='form_data'>
                            <label htmlFor='mobile'>Mobile</label>
                            <input
                                type='tel'
                                onChange={handleChange}
                                value={udata.mobile}
                                name='mobile'
                                id='mobile'
                                placeholder='10-digit mobile number'
                                maxLength='10'
                                className={errors.mobile ? 'input_error' : ''}
                            />
                            {errors.mobile && <p className='error_msg'>⚠️ {errors.mobile}</p>}
                        </div>

                        <div className='form_data'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                onChange={handleChange}
                                value={udata.password}
                                name='password'
                                id='password'
                                placeholder='At least 6 characters'
                                className={errors.password ? 'input_error' : ''}
                            />
                            {errors.password && <p className='error_msg'>⚠️ {errors.password}</p>}
                        </div>

                        <div className='form_data'>
                            <label htmlFor='cpassword'>Confirm Password</label>
                            <input
                                type='password'
                                onChange={handleChange}
                                value={udata.cpassword}
                                name='cpassword'
                                id='cpassword'
                                placeholder='Re-enter password'
                                className={errors.cpassword ? 'input_error' : ''}
                            />
                            {errors.cpassword && <p className='error_msg'>⚠️ {errors.cpassword}</p>}
                        </div>

                        <button className='signin_btn' onClick={senddata}>Continue</button>

                        <div className='signin_info'>
                            <p>Already have an account?</p>
                            <NavLink to='/login'>Sign In</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}

export default SIgnUp
