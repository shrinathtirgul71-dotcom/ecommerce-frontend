import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Subtotal = ({items}) => {   // 👈 changed item to items

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if(items && items.length > 0) {   // 👈 added safety check
      totalAmount();
    }
  }, [items])

  const totalAmount = () => {
    let total = 0;
    items.map((item) => {
      total = item.price.cost + total
    });
    setPrice(total)
  }

  return (
    <div className='sub_item'>
        <h3>Subtotal ({items?.length} items): <strong style={{fontWeight:700, color:"#111"}}> ₹{price}.00</strong></h3>
    </div>
  )
}

export default Subtotal