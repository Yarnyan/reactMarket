import React from 'react'
import Main from '../shopView/components/shopPage/Main'
// import Footer from '../shopView/components/shopPage/Footer'
import StoreFooter from '../shopView/components/ui/footerStore/FooterStore'
export default function shopPage() {
    return (
        <div className="App">
            <div className="shopPage__container">
                <div className="shopPage__container-content">
                    <Main />
                    <StoreFooter currentPage="home"/>
                </div>
            </div>
        </div>
    )
}
