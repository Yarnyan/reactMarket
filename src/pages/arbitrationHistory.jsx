import React from 'react'
import ArbitMain from '../userView/components/arbitrationHistory/arbitHistoryMain'
import Footer from '../userView/components/ui/userFooter'
export default function arbitrationHistory() {
  return (
    <div className='arbitration__body'>
        <ArbitMain />
        <Footer currentPage="history"/>
    </div>
  )
}
