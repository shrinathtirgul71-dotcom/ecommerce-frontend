import React, { useState } from 'react';
import './payment.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const Payment = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('');
    const cartTotal = localStorage.getItem('cartTotal') || 0;

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
        bankName: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePayment = () => {
        if (!selectedMethod) {
            toast.warn('Please select a payment method', { position: "top-center" });
            return;
        }

        if (selectedMethod === 'card') {
            if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
                toast.error('Please fill all card details', { position: "top-center" });
                return;
            }
            if (formData.cardNumber.length < 13 || formData.cardNumber.length > 19) {
                toast.error('Please enter a valid card number', { position: "top-center" });
                return;
            }
            if (formData.cvv.length < 3) {
                toast.error('Please enter a valid CVV', { position: "top-center" });
                return;
            }
        } else if (selectedMethod === 'upi') {
            if (!formData.upiId) {
                toast.error('Please enter your UPI ID', { position: "top-center" });
                return;
            }
            if (!formData.upiId.includes('@')) {
                toast.error('Please enter a valid UPI ID (e.g., name@paytm)', { position: "top-center" });
                return;
            }
        } else if (selectedMethod === 'netbanking') {
            if (!formData.bankName) {
                toast.error('Please select your bank', { position: "top-center" });
                return;
            }
        }

        toast.success('Payment Successful! 🎉', {
            position: "top-center",
            autoClose: 2000
        });

        // 👇 fixed syntax - added comma after callback function
        setTimeout(() => {
            const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
            const newOrder = {
                orderId: `ORD${Date.now()}`,
                paymentId: `PAY${Date.now()}`,
                amount: cartTotal,
                method: selectedMethod,
                date: new Date().toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                status: 'Delivered'
            };
            existingOrders.unshift(newOrder);
            localStorage.setItem('orderHistory', JSON.stringify(existingOrders));
            localStorage.removeItem('cartTotal');

            navigate('/orderconfirmation', {
                state: {
                    orderId: newOrder.orderId,
                    paymentId: newOrder.paymentId,
                    amount: cartTotal,
                    method: selectedMethod
                }
            });
        }, 2000);  // 👈 comma was missing here
    };  // 👈 closing brace for handlePayment was missing

    return (
        <div className='payment_section'>
            <div className='payment_container'>
                <div className='payment_header'>
                    <h2>Select a payment method</h2>
                    <p>Amazon accepts all major credit & debit cards</p>
                    <h3 style={{ color: '#B12704', marginTop: 10 }}>
                        Total: ₹{cartTotal}.00
                    </h3>
                </div>

                <div className='payment_methods'>
                    {/* Credit/Debit Card */}
                    <div className={`payment_option ${selectedMethod === 'card' ? 'active' : ''}`}>
                        <div className='option_header' onClick={() => setSelectedMethod('card')}>
                            <div className='option_icon'><CreditCardIcon /></div>
                            <h3>Credit or Debit Card</h3>
                            <input type='radio' name='payment' checked={selectedMethod === 'card'} readOnly />
                        </div>
                        {selectedMethod === 'card' && (
                            <div className='payment_form'>
                                <input type='text' name='cardNumber' placeholder='Card Number' value={formData.cardNumber} onChange={handleInputChange} maxLength='16' />
                                <input type='text' name='cardName' placeholder='Name on Card' value={formData.cardName} onChange={handleInputChange} />
                                <div className='form_row'>
                                    <input type='text' name='expiryDate' placeholder='MM/YY' value={formData.expiryDate} onChange={handleInputChange} maxLength='5' />
                                    <input type='text' name='cvv' placeholder='CVV' value={formData.cvv} onChange={handleInputChange} maxLength='3' />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* UPI */}
                    <div className={`payment_option ${selectedMethod === 'upi' ? 'active' : ''}`}>
                        <div className='option_header' onClick={() => setSelectedMethod('upi')}>
                            <div className='option_icon'><PhoneAndroidIcon /></div>
                            <h3>UPI</h3>
                            <input type='radio' name='payment' checked={selectedMethod === 'upi'} readOnly />
                        </div>
                        {selectedMethod === 'upi' && (
                            <div className='payment_form'>
                                <input type='text' name='upiId' placeholder='Enter UPI ID (e.g., yourname@paytm)' value={formData.upiId} onChange={handleInputChange} />
                                <p className='upi_info'>You will be redirected to your UPI app to complete the payment</p>
                            </div>
                        )}
                    </div>

                    {/* Net Banking */}
                    <div className={`payment_option ${selectedMethod === 'netbanking' ? 'active' : ''}`}>
                        <div className='option_header' onClick={() => setSelectedMethod('netbanking')}>
                            <div className='option_icon'><AccountBalanceIcon /></div>
                            <h3>Net Banking</h3>
                            <input type='radio' name='payment' checked={selectedMethod === 'netbanking'} readOnly />
                        </div>
                        {selectedMethod === 'netbanking' && (
                            <div className='payment_form'>
                                <select name='bankName' value={formData.bankName} onChange={handleInputChange}>
                                    <option value=''>Choose your bank</option>
                                    <option value='sbi'>State Bank of India</option>
                                    <option value='hdfc'>HDFC Bank</option>
                                    <option value='icici'>ICICI Bank</option>
                                    <option value='axis'>Axis Bank</option>
                                    <option value='kotak'>Kotak Mahindra Bank</option>
                                    <option value='pnb'>Punjab National Bank</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Cash on Delivery */}
                    <div className={`payment_option ${selectedMethod === 'cod' ? 'active' : ''}`}>
                        <div className='option_header' onClick={() => setSelectedMethod('cod')}>
                            <div className='option_icon'><LocalAtmIcon /></div>
                            <h3>Cash on Delivery</h3>
                            <input type='radio' name='payment' checked={selectedMethod === 'cod'} readOnly />
                        </div>
                        {selectedMethod === 'cod' && (
                            <div className='payment_form'>
                                <p className='cod_info'>Pay digitally or with cash when you receive your order</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='payment_actions'>
                    <button className='use_payment_btn' onClick={handlePayment}>
                        Use this payment method
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Payment;