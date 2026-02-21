import React, { useEffect } from 'react'
import Banner from './Banner'
import "./home.css";
import Slide from './Slide';
import NoProducts from './NoProducts';
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux"

const Maincomp = () => {

  const { products } = useSelector(state => state.getproductsdata);
  console.log(products);

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getProducts());
  }, [Dispatch]);

  // 🎲 Function to shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 🎯 Create different product sets
  const shuffledProducts = shuffleArray(products);
  const dealOfTheDay = shuffledProducts.slice(0, 6);
  const todaysDeal = shuffledProducts.slice(6, 12);
  const bestSeller = shuffledProducts.slice(12, 18);
  const uptoOff = shuffledProducts.slice(18, 24);

  return (
    <div className='home_section'>
      <div className='banner_part'>
        <Banner />
      </div>
      
      {products && products.length > 0 ? (
        <>
          <div className='slide_part'>
            <div className='left_slide'>
              <Slide title="Deal of the Day" products={dealOfTheDay} />
            </div>
            <div className='right_slide'>
              <h4>festive latest launches</h4>
              <img src='https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg' alt='' />
              <a href='#'>See More</a>
            </div>
          </div>

          <Slide title="Today's Deal" products={todaysDeal} />
          
          <div className='center_img'>
            <img src='https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg' alt='' />
          </div>
          
          <Slide title="Best seller" products={bestSeller} />
          <Slide title="Upto 80% off" products={uptoOff} />
        </>
      ) : (
        <NoProducts />
      )}
    </div>
  )
}

export default Maincomp