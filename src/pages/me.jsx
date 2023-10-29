import React from 'react'
import MeMain from '../userView/components/me/MeMain'
import Footer from '../userView/components/ui/userFooter'  
export default function me() {
  return (
    <div className='me__body'>
        <MeMain />
        <Footer currentPage="history"/>
    </div>
  )
}
