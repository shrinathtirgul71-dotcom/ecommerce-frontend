import React from 'react';
import './noproducts.css';

const NoProducts = () => {
    return (
        <div className='no-products-container'>
            <div className='no-products-content'>
                <div className='no-products-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                </div>
                <h2>No products found</h2>
                <p>We couldn't find any products matching your search.</p>
                <p>Try searching for something else or browse our categories.</p>
            </div>
        </div>
    );
};

export default NoProducts;