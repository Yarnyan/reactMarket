import React from 'react'
import ItemsMain from '../sellerView/components/items/ItemsMain'
import ItemsHeader from '../sellerView/components/items/ItemsHeader'
import ItemsFooter from '../sellerView/components/ui/footer'
export default function shopSellerItems() {
  return (
    <div className='shopSeller__body'>
        <ItemsHeader />
        <ItemsMain />
        <ItemsFooter currentPage="items"/>
    </div>
  )
}
