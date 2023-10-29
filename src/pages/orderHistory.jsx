import React from 'react'
import OrderHistoryMain from '../userView/components/orderHistory/orderHistoryMain'
import Footer from '../userView/components/ui/userFooter' 
export default function OrderHistory() {
  return (
    <div>
        <OrderHistoryMain />
        <Footer currentPage="history"/>
    </div>
  )
}
