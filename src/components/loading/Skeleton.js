import React from 'react';
import './skeleton.css';

const Skeleton = ({ type }) => {
    if (type === 'product-card') {
        return (
            <div className='skeleton-card'>
                <div className='skeleton-image'></div>
                <div className='skeleton-title'></div>
                <div className='skeleton-price'></div>
                <div className='skeleton-button'></div>
            </div>
        );
    }

    if (type === 'product-detail') {
        return (
            <div className='skeleton-detail'>
                <div className='skeleton-detail-left'>
                    <div className='skeleton-large-image'></div>
                </div>
                <div className='skeleton-detail-right'>
                    <div className='skeleton-title-large'></div>
                    <div className='skeleton-text'></div>
                    <div className='skeleton-text'></div>
                    <div className='skeleton-price-large'></div>
                    <div className='skeleton-button-large'></div>
                </div>
            </div>
        );
    }

    return null;
};

export default Skeleton;