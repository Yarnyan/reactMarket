import React, {useEffect} from 'react'
import {CiShoppingBasket} from 'react-icons/ci'
import classes from './BasketBtn.module.css'
import { Link, useParams } from 'react-router-dom'

export default function BasketBtn() {
  let {shopId} = useParams()
  useEffect(() => {
    const update = () => {
      const QuantityBasket = document.querySelector('.Quantity__items');
      const storedItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
      const k = storedItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
      if (storedItems.length === 0) {
        QuantityBasket.innerText = '';
      } else {
        QuantityBasket.innerText = k
      }
    };
    update()
  }, []);
  return (
  <Link to={`/shop/${shopId}/store/basket`} className={classes.BacketBtn}>
    <div>
      <span className="Quantity__items"></span>
      <CiShoppingBasket className={classes.haha}/>
    </div>
  </Link>
  )
}
