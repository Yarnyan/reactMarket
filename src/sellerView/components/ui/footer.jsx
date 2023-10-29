import React from 'react'
import { AiOutlineHome, AiFillSetting, AiOutlineHistory } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
export default function Footer(props) {
    let { shopId } = useParams();
    const { currentPage } = props
    return (
        <footer className="shopPage__footer">
            <div className="shopPage__footer-content">
                <ul>
                    <li>
                        <Link to={`/shopSeller/${shopId}/settings`}>
                            <AiFillSetting className={currentPage === "settings" ? "icon__active" : ''} />
                            <p className={currentPage === "settings" ? "text text__active" : 'text'}>Settings</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/shopSeller/${shopId}/items`}>
                            <AiOutlineHome className={currentPage === "items" ? "icon__active" : ''} />
                            <p className={currentPage === "items" ? "text text__active" : 'text'}>Items</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/shopSeller/${shopId}/history`}>
                            <AiOutlineHistory className={currentPage === "edit" ? "icon__active" : ''} />
                            <p className={currentPage === "edit" ? "text text__active" : 'text'}>History</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}