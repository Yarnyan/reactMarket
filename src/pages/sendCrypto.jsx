import React from 'react'
import SendMain from '../userView/components/send/sendMain'
import Footer from '../userView/components/ui/userFooter'
export default function sendCrypto() {
  return (
    <div className='sendMain__body'>
        <SendMain />
        <Footer currentPage="wallet"/>
    </div>
  )
}
