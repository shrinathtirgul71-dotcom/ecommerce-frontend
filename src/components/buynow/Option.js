import {React, useContext} from 'react'
import { LoginContext } from '../context/ContextProvider';
import { toast } from 'react-toastify';

const Option = ({ deletedata, get, quantity }) => {  // 👈 added quantity prop

  const { account, setAccount } = useContext(LoginContext);

  const removedata = async () => {
    try {
      const res = await fetch(`/remove/${deletedata}`, {
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
        toast.success("Item removed from cart!", {
          position: "top-center"
        });
      } else {
        toast.error("Failed to remove item", {
          position: "top-center"
        });
      }

    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!", {
        position: "top-center"
      });
    }
  }

  return (
    <div className='add_remove_select'>
      {/* 👇 replaced select with qty badge */}
      <div className='quantity_badge'>Qty: {quantity}</div>
      <p style={{ cursor: "pointer" }} onClick={removedata}>Delete</p> <span> | </span>
      <p className='forremovemedia'>Save Or Later</p><span> | </span>
      <p className='forremovemedia'>See More like this</p>
    </div>
  )
}

export default Option