import React from 'react'
import StoreFooter from '../shopView/components/ui/footerStore/FooterStore'
import StoreMain from '../shopView/components/store/storeMain'
import StoreHeader from '../shopView/components/store/storeHeader'

export default function about() {
  return (
    <div>
      <div className="store__main-page">
        <StoreHeader />
        <StoreMain /> 
      </div>
      <StoreFooter currentPage="store" />
    </div>
  )
}

