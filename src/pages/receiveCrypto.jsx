import React from 'react'
import ReceiveMain from '../userView/components/receive/receiveMain'
import Footer from '../userView/components/ui/userFooter'
export default function receiveCrypto() {
  return (
    <div className='sendMain__body'>
        <ReceiveMain />
        <Footer currentPage="wallet"/>
    </div>
  )
}
