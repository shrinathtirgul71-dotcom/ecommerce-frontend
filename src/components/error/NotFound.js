import React from 'react';
import './notfound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='notfound-container'>
            <div className='notfound-content'>
                <img
                    src='https://images-na.ssl-images-amazon.com/images/G/01/error/title._TTD_.png'
                    alt='404 Error'
                    className='notfound-image'
                />
                <div className='notfound-divider' />
                <h2 className='notfound-title'>Oops! Page Not Found</h2>
                <p className='notfound-desc'>
                    We can't seem to find the page you're looking for.
                    The link may be broken, or the page may have been removed.
                </p>
                <div className='notfound-buttons'>
                    <button onClick={() => navigate('/')} className='home-btn'>
                        🏠 Go to Home Page
                    </button>
                    <button onClick={() => navigate(-1)} className='back-btn'>
                        ← Go Back
                    </button>
                </div>
                <p className='notfound-error-code'>Error Code: 404</p>
            </div>
        </div>
    );
};

export default NotFound;