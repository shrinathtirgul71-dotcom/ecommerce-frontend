import React, { useState, useEffect } from 'react';
import './backtotop.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {visible && (
                <div className='backtotop' onClick={scrollToTop}>
                    <KeyboardArrowUpIcon style={{ fontSize: 28 }} />
                    <p>Back to top</p>
                </div>
            )}
        </>
    );
};

export default BackToTop;