import React from 'react'
import CurrencyMain from '../userView/components/currency/CurrencyMain'
import Footer from '../userView/components/ui/userFooter'
export default function currency() {
  return (
    <div>
        <CurrencyMain />
        <Footer currentPage="wallet"/>
    </div>
  )
}
