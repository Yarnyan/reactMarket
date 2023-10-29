import React from 'react'
import {AiOutlineShoppingCart, AiOutlineHistory} from 'react-icons/ai'
import {RiScales3Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
export default function MeMain() {
  let { shopId, userId } = useParams();
  return (
    <div className="me__container">
      <div className="me__container-content">
        <div className="me__content-items">
          <ul>
            <li className="me__item">
              <Link to={`/shopSeller/${shopId}/history`}>
                <AiOutlineHistory />
                <p>Purchase History</p>
              </Link>
            </li>
            <li className="me__item">
              <Link to={`/user/${userId}/profileUser/arbitrationHistory`}>
                <RiScales3Fill />
                <p>History of arbitration</p>
              </Link>
            </li>
            <li className="me__item">
              <Link to={`/user/${userId}/profileUser/orderHistory`}>
                <AiOutlineShoppingCart />
                <p>Order history</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
