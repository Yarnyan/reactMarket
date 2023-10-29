import React from 'react'
import HistoryMain from '../sellerView/components/history/historyItemMain'
import ItemsFooter from '../sellerView/components/ui/footer'
export default function shopSellerEdit() {
  return (
    <div className='editItemMain__body'>
      <HistoryMain />
      <ItemsFooter currentPage="edit"/>
    </div>
  )
}
