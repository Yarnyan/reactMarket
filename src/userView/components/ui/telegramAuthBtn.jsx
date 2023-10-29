import React from 'react'
import TelegramLoginButton from 'react-telegram-login';
export default function TelegramAuthBtn() {
    const redirectLink = 'https://4b71-31-28-113-222.ngrok-free.app/p/main?auth-token=fc785082cfb04e9fbc376057470493758a1e4864292d47f286c2cd5753c06cea'
    const getToken = () => {
        let a = redirectLink.indexOf('=')
        let b = redirectLink.slice(60)
        let c = sessionStorage.setItem('auth-token', b)
    }
    getToken()
    return (
        <div className='content'>
            {/* <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="webapptesthhaasd_bot" data-size="large" data-auth-url="https://4b71-31-28-113-222.ngrok-free.app/api/User/loginUser" data-request-access="write"></script> */}
            <TelegramLoginButton dataOnauth="https://4b71-31-28-113-222.ngrok-free.app/api/User/loginUser" botName="webapptesthhaasd_bot" />
        </div>
    )
}
