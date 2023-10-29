import React from 'react'
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiStore } from 'react-icons/bi'
import { BsChatLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
export default function Footer(props) {
  let { shopId } = useParams();
  const {currentPage} = props
  return (
    <footer className="shopPage__footer">
        <div className="shopPage__footer-content">
            <ul>
                <li>
                    <Link to={`/shop/${shopId}/store`}>
                        <BiStore className={currentPage === "store" ? "icon__active" : ''} />
                        <p className={currentPage === "store" ? "text text__active" : 'text'}>Store</p>
                    </Link>
                </li>
                <li>
                    <Link to={`/shop/${shopId}/home`}>
                        <AiOutlineHome className={currentPage === "home" ? "icon__active" : ''}/>
                        <p className={currentPage === "home" ? "text text__active" : 'text'}>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to={`/shop/${shopId}/reviews`}>
                        <BsChatLeft className={currentPage === "reviews" ? "icon__active" : ''}/>
                        <p className={currentPage === "reviews" ? "text text__active" : 'text'}>Reviews</p>
                    </Link>
                </li>
            </ul>
        </div>
    </footer>
  )
}
