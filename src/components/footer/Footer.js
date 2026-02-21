import React from 'react'
import "./footer.css";

const Footer = () => {

    const year = new Date().getFullYear();
    console.log(year);



    return (
        <footer>
            <div className='footer-box'>
                <div className='footer_container'>
                    <div className='footr_details_one forres' >
                        <h3>Get To Know US </h3>
                        <p>about us </p>
                        <p>Careers </p>
                        <p>Press Releases</p>
                        <p>Amazon Cares </p>
                    </div>
                </div>
                <div className='footer_container'>
                    <div className='footr_details_one forres'>
                        <h3>Connect with Us </h3>
                        <p>Facebook </p>
                        <p>x </p>
                        <p>Instagram</p>

                    </div>
                </div>

                <div className='footer_container'>
                    <div className='footr_details_one forres'>
                        <h3>Make Money with Us</h3>
                        <p>Facebook </p>
                        <p>Careers </p>
                        <p>Press Releases</p>
                        <p>Amazon Cares </p>
                    </div>
                </div>
                <div className='footer_container'>
                    <div className='footr_details_one forres'>
                        <h3>Make Money with Us</h3>
                        <p>Facebook </p>
                        <p>Careers </p>
                        <p>Press Releases</p>
                        <p>Amazon Cares </p>
                    </div>
                </div>

            </div>
            <div className='lastdetails'>
                <img src='assest/amazon_PNG25.png' alt='' />
                <p>Conditions of Use & Sale &nbsp; &nbsp;  &nbsp;  &nbsp;    Privacy Notice  &nbsp; &nbsp;  &nbsp;  &nbsp;  Interest-Based Ads  &nbsp; &nbsp;  &nbsp;  &nbsp;  © 1996-{year},   Amazon.com, Inc. or its affiliates</p>
            </div>

        </footer>
    )
}

export default Footer
