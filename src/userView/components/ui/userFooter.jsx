import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { TfiWallet } from 'react-icons/tfi'
import {AiOutlineShoppingCart} from 'react-icons/ai'
export default function UserFooter(props) {
    let { shopId, userId } = useParams();
    const { currentPage } = props
    const ka = 'seller'
    const kk = ka === 'seller' ? `/shopSeller/${shopId}/items` : `/user/${userId}/create`
    return (
        <footer className="shopPage__footer">
            <div className="shopPage__footer-content">
                <ul>
                    <li>
                        <Link to={`/user/${userId}/profileUser`}>
                            <TfiWallet className={currentPage === "wallet" ? "icon__active" : ''} />
                            <p className={currentPage === "wallet" ? "text text__active" : 'text'}>Wallet</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={kk}>
                            <CgProfile className={currentPage === "seller" ? "icon__active" : ''}/>
                            <p className={currentPage === "seller" ? "text text__active" : 'text'}>Seller</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/user/${userId}/profileUser/me`}>
                            <CgProfile className={currentPage === "history" ? "icon__active" : ''} />
                            <p className={currentPage === "history" ? "text text__active" : 'text'}>History</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/user/${userId}/shops`}>
                            <AiOutlineShoppingCart className={currentPage === "reviews" ? "icon__active" : ''} />
                            <p className={currentPage === "reviews" ? "text text__active" : 'text'}>Shops</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}