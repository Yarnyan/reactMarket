import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiStore } from 'react-icons/bi'
import { BsChatLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
export default function Footer() {
  let { shopId } = useParams();
  return (
    <footer className="shopPage__footer">
    <div className="shopPage__footer-content">
        <ul>
            <li>
                <Link to={`/shop/${shopId}/store`}>
                    <BiStore />
                    <p className='text'>Store</p>
                </Link>
            </li>
            <li>
                <Link to={`/shop/${shopId}/home`}>
                    <AiOutlineHome className='icon__active'/>
                    <p className='text text__active'>Home</p>
                </Link>
            </li>
            <li>
                <Link to={`/shop/${shopId}/reviews`}>
                    <BsChatLeft />
                    <p className='text'>Reviews</p>
                </Link>
            </li>
        </ul>
    </div>
</footer>
  )
}
