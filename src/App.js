
import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import Sign_in from './components/signup_sing/Sign_in';
import SIgnUp from './components/signup_sing/SIgnUp';
import Cart from './components/cart/Cart';
import Buynow from "./components/buynow/Buynow";
import { Routes, Route, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import Payment from './components/payment/Payment';
import NotFound from './components/error/NotFound';
import BackToTop from './components/backtotop/BackToTop';
import OrderConfirmation from './components/order/OrderConfirmation';
import OrderHistory from './components/order/OrderHistory';
import Profile from './components/profile/Profile';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {

  const [data, setData] = useState(false);
  const location = useLocation();

  const isNotFound = location.pathname !== '/' && 
    !['/login', '/register', '/buynow', '/payment', '/orderconfirmation', '/orderhistory', '/profile'].includes(location.pathname) &&
    !location.pathname.startsWith('/getproductsone');

  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 2000)
  }, [])

  // Fast scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {
        data ? (
          <>
            {!isNotFound && <Navbar />}
            {!isNotFound && <Newnav />}
            
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames="page-transition"
                timeout={200}
              >
                <div className="page-wrapper">
                  <Routes location={location}>
                    <Route path='/' element={<Maincomp />} />
                    <Route path='/login' element={<Sign_in />} />
                    <Route path='/register' element={<SIgnUp />} />
                    <Route path='/getproductsone/:id' element={<Cart />} />
                    <Route path="/buynow" element={<Buynow />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/orderconfirmation" element={<OrderConfirmation />} />
                    <Route path="/orderhistory" element={<OrderHistory />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </CSSTransition>
            </TransitionGroup>

            {!isNotFound && <Footer />}
            {!isNotFound && <BackToTop />}
          </>
        ) : (
          <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        )
      }
    </>
  );
}

export default App;