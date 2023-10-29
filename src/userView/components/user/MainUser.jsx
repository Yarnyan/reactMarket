import React, { useState, useEffect } from 'react'
import img from '../../../image/KK.gif'
import NorthIcon from '@mui/icons-material/North';
import { useDispatch, useSelector } from 'react-redux';
import SouthIcon from '@mui/icons-material/South';
import { Link } from 'react-router-dom';
import UserModal from '../user/userModal'
import { useParams } from 'react-router-dom';
import {getMainUser} from '../../../api/userReq'
import LoadingModal from '../ui/loadingModal'
export default function MainUser() {
  let {  userId } = useParams();
  const dispatch = useDispatch()
  const newItemUser = useSelector((state) => state.newItemUser)
  const isOpen = useSelector((state) => state.isOpen)
  const [isTrueLoader, setIsTrueLoader] = useState(false)
  const [totalBalance, setTotalBalance] = useState(0)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let a = await getMainUser()
        dispatch({ type: 'SET_NEW_ITEM_USER', payload: a });
        setIsTrueLoader(true)
        const total = myBalance(a)
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [dispatch]);
  const currencyBalance = (actualPrice, balance) => {
    return (actualPrice * balance).toFixed(2)
  }
  
  const myBalance = (items) => {
    let Balance = 0
    for(const item of items) {
      Balance += parseFloat(currencyBalance(item.exchangeRate, item.balance))
    }
    setTotalBalance(Balance)
    const h = sessionStorage.setItem('balance', Balance)
  }

  const formatName = (name) => {
    if(name) {
      const spaceIndex = name.indexOf(' ')
      const wordBeforeSpace = name.slice(0, spaceIndex)
      return wordBeforeSpace
    }
  }
  const setSessionItem = (item) => {
    const newItem = {
      name: item.fullname,
      price: item.price,
      currency: item.currency,
      actualPrice: item.exchangeRate,
      count: item.balance,
      img: item.img
    }
    const a = sessionStorage.setItem('itemCurrency', JSON.stringify(newItem))
  }
  const handleSendClick = () => {
    const btnType = "withdraw";
    sessionStorage.setItem("btn-type", btnType);
    dispatch({ type: "SET_MODAL", payload: true });
  };
  
  const handleReceiveClick = () => {
    const btnType = "deposit";
    sessionStorage.setItem("btn-type", btnType);
    dispatch({ type: "SET_MODAL", payload: true });
  };
  return (
    <div className="user__container">
      <div className="user__container-balance">
        <div className="user__container-img">
          <img src={img} alt="" autoPlay="" />
        </div>
        <div className="user__container-subtitle">
          <h1>${totalBalance}</h1>
        </div>
        <div className="user__container-title">
          <p>My balance</p>
        </div>
      </div>
      <div className="user__container-tools">
        <div className="user__tools-Withdraw user__tools-btn">
          <button onClick={() => handleSendClick()} data-btn-type="withdraw"><NorthIcon /></button>
          <p>Withdraw</p>
        </div>
        <div className="user__tools-Replenish user__tools-btn">
          <button onClick={() => handleReceiveClick()} data-btn-type="deposit"><SouthIcon /></button>
          <p>Deposit</p>
        </div>
      </div>
      <div className="user__crypto">
        <div className="user__crypto-items">
          {newItemUser && newItemUser.length > 0 ? (
            newItemUser.map((item, index) => {
              return (
                <Link to={`/user/${userId}/profileUser/${formatName(item.fullname)}`} className="items" onClick={() => setSessionItem(item)} key={index}>
                  <div className="item__img">
                    <img src={item.img} alt="" />
                    <div className="item__name">
                      {formatName(item.fullname)}
                      <p className='item__info-price'>${item.exchangeRate}</p>
                    </div>
                  </div>
                  <div className="item__info">
                    <p>{item.balance} {item.currency}</p>
                    <p className='item__info-price'>${currencyBalance(item.exchangeRate, item.balance)}</p>
                  </div>
                </Link>
              )
            })
          ) : (
            <p>net</p>
          )}
        </div>
      </div>
      <div className={`user__modal ${isOpen ? 'active' : ''}`}>
        <UserModal />
      </div>
      <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
        <LoadingModal />
      </div>
    </div>
  )
}
