import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const mapStateToProps = (state) => {
    return {
        counter: state.newItemUser,
    };
};

const UserModal = ({ counter }) => {
    let { shopId } = useParams();
    const isOpen = useSelector((state) => state.isOpen)
    const dispatch = useDispatch()
    const btnType = sessionStorage.getItem('btn-type');

    const formatName = (name) => {
        if (name) {
            const spaceIndex = name.indexOf(' ')
            const wordBeforeSpace = name.slice(0, spaceIndex)
            return wordBeforeSpace
        }
    }
    const handleModalClick = () => {
        dispatch({ type: 'SET_MODAL', payload: false })
    }
    const currencyBalance = (actualPrice, balance) => {
        return (actualPrice * balance).toFixed(2)
    }
    const setSessionItem = (item) => {
        const newItem = {
            name: item.name,
            price: item.price,
            actualPrice: item.actualPrice,
            count: item.count,
            img: item.img
        }
        const a = sessionStorage.setItem('itemCurrency', JSON.stringify(newItem))
    }
    return (
        <div className="user__modal-container">
            <div className="user__modal-content">
                <div className='filter__close'>
                    <button onClick={() => handleModalClick()}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="user__content-subtitle">
                    <h1>Select currency</h1>
                </div>
                <div className="user__crypto">
                    <div className="user__crypto-items">
                        {counter && counter.map((item, index) => {
                            const profileUrl = btnType === 'deposit' ? `/user/${shopId}/profileUser/${formatName(item.fullname)}/receive` : `/user/${shopId}/profileUser/${formatName(item.name)}/send`
                            return (
                                <Link to={profileUrl} className="items" key={item.id} onClick={() => setSessionItem(item)}>
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
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(UserModal);
