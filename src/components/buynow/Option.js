import {React, useContext} from 'react'
import { LoginContext } from '../context/ContextProvider';
import { toast } from 'react-toastify';

const BASE_URL = "https://ecommerce-backend-1-b285.onrender.com";

const Option = ({ deletedata, get, quantity }) => {

  const { account, setAccount } = useContext(LoginContext);

  const removedata = async () => {
    try {
      const res = await fetch(`${BASE_URL}/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();

      if (res.status === 201 || res.status === 200) {
        setAccount(data);
        get();
        toast.success("Item removed from cart!", { position: "top-center" });
      } else {
        toast.error("Failed to remove item", { position: "top-center" });
      }

    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!", { position: "top-center" });
    }
  }

  return (
    <div className='add_remove_select'>
      <div className='quantity_badge'>Qty: {quantity}</div>
      <p style={{ cursor: "pointer" }} onClick={removedata}>Delete</p> <span> | </span>
      <p className='forremovemedia'>Save Or Later</p><span> | </span>
      <p className='forremovemedia'>See More like this</p>
    </div>
  )
}

export default Option
