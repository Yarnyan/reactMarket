import React, { useEffect, useState } from 'react'
import BackButton from '../ui/Button/BackButton'
import FooterStore from '../ui/footerStore/FooterStore'
import { Alert } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { buyProducts } from '../../../api/shopReq'
export default function MainBasket() {
    const [totalCost, setTotalCost] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('usdt')
    const [cartItems, setCartItems] = useState([]);
    const [isButtonActive, setIsButtonActive] = useState(false)
    const [isModalContentActive, setIsModalContentActive] = useState(false)
    const [errorMessage, setErrorMesage] = useState('')
    const [shopMessage, setShopMessage] = useState('')
    const [alertErrorType, setAlertErrorType] = useState(false)
    const [alertType, setAlertType] = useState(false)
    const [alertContainer, setAlertContainer] = useState(false)
    let { shopId } = useParams()
    useEffect(() => {
        const payContainer = document.querySelector('.Pay__container')
        const modalContent = document.querySelector('.modal-content')
        const cartItems = sessionStorage.getItem('cartItems')
        if (cartItems && JSON.parse(cartItems).length > 0) {
            setIsButtonActive(true)
            setIsModalContentActive(true)
        } else {
            setIsButtonActive(false)
            setIsModalContentActive(false)
        }
    }, [cartItems])

    useEffect(() => {
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        const contentItems = document.querySelector('.modal-content-items');

        if (cartItems && cartItems.length > 0) {
            const cartElements = cartItems.map((item) => {
                const { image, name, price, id } = item;
                const quantity = item.quantity;
                const totalPrice = (price * quantity).toFixed(2);

                return getCartProduct(image, name, quantity, totalPrice, id);
            });

            contentItems.innerHTML = cartElements.join('');
            const total = cartItems.reduce(
                (accumulator, item) => accumulator + item.price * item.quantity,
                0
            );
            const roundedTotal = total.toFixed(2);
            setTotalCost(roundedTotal);
            setCartItems(cartItems);
        }
    }, []);


    const getCartProduct = (image, name, quantity, price, id) => {
        return `
        <div class="modal-content-item" data-id="${id}">
        <div class="content-item-photo">
            <img src="${image}" alt="">
        </div>
        <div class="content-item-label">
            <div class="content-item-title">    
                ${name}
                <span class="content-item-counter">
                    <span class="counter">${quantity}</span>
                        x
                </span>
            </div>
        </div>
            <div class="content-item-price">
                ${price}$
            </div>
        </div>  
        `
    }
    useEffect(() => {
        const cryptoBtn = document.querySelectorAll('.crypto-btn')
        let btn1 = document.querySelector('#btn-1') //usdt
        let btn2 = document.querySelector('#btn-2') //btc
        cryptoBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                if (e.target.id == "btn-1") {
                    SelectUSDT();
                } else {
                    SelectBTC();
                }
            })
        })

        function SelectUSDT() {
            btn1.classList.add('active')
            btn2.classList.remove('active')
            btn2.style.color = 'gray'
            btn1.style.color = ''
            setPaymentMethod('usdt')
            // selectedItems.set(-1, 1)
        }

        function SelectBTC() {
            btn1.classList.remove('active')
            btn1.style.color = 'gray'
            btn2.style.color = ''
            btn2.classList.add('active')
            setPaymentMethod('btc')
            // selectedItems.set(-1, 2)
        }
        SelectUSDT();
    }, []);
    const createOrder = async () => {
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        const newItems = cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity
        }));

        const orderData = {
            products: newItems,
            currency: paymentMethod.toLocaleUpperCase()
        };
        try {
            const res = await buyProducts(orderData)
            console.log(res)
            const status = res.status ? res.status : res.response.status 
            setTotalCost('')
            const contentItems = document.querySelector('.modal-content-items');
            contentItems.innerHTML = '';
            const cartItems = sessionStorage.removeItem('cartItems')
            setCartItems([]);
            setIsButtonActive(false)
            setIsModalContentActive(false)
            if(status === 400) {
                showErrorAlert()
            } else {
                showAndHideAlert(res.data.orderNum)
            }
        } catch (e) {
            console.log(e)
        }
    };
    const theme = createTheme({
        palette: {
            neutral: {
                main: '#8378f5',
                contrastText: '#fff',
                type: '#fff'
            },
        },
    });
    const showAndHideAlert = (a) => {
        setShopMessage(a)
        setAlertContainer(true)
        setAlertType(true)
        setTimeout(() => {
          setAlertType(false)
          setAlertContainer(false)
        }, 3000)
        };
      const showErrorAlert = () => {
        setErrorMesage('Транзакция не удалась')
        setAlertContainer(true)
        setAlertErrorType(true)
        setTimeout(() => {
          setAlertErrorType(false)
          setAlertContainer(false)
        }, 3000)
      }
    return (
        <div className="modal-container show">
            <div className={isModalContentActive ? 'modal-content active' : 'modal-content'}>
                <header className='modal-backbtn'>
                    <BackButton />
                </header>
                <div className="modal-crypto">
                    <div className="modal-crypto-container">
                        <div className="crypto">
                            <div className="crypto-usdt crypto-subtitle">
                                <button className="crypto-btn" data-title="usdt" id="btn-1">USDT</button>
                            </div>
                            <div className="crypto-btc crypto-subtitle">
                                <button className="crypto-btn" data-title="btc" id="btn-2">BTC</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-header">
                    <div className="header-wrap">
                        <h2 className="header-wrap-title">Your order</h2>
                        {/* <span>Edit</span> */}
                    </div>
                </div>
                <div className="modal-content-items">

                </div>
            </div>
            <div className={isButtonActive ? 'Pay__container active' : 'Pay__container'}>
                <button className='Pay__order' onClick={() => createOrder()}>Pay {totalCost != 0 ? totalCost + '$' : ''}</button>
            </div>
            <div className={alertContainer ? 'alert__footer active' : 'alert__footer'}>
                <ThemeProvider theme={theme}>
                    <Alert severity="success" color="info" className={`order__alert-true sendMain__alert-true ${alertType ? 'active' : ''}`}>
                        {shopMessage}
                    </Alert>
                    <Alert severity="error" color="info" className={`sendMain__alert-false ${alertErrorType ? 'active' : ''}`}>
                        {errorMessage}
                    </Alert>
                </ThemeProvider>
            </div>
            <FooterStore />
        </div>
    )
}
