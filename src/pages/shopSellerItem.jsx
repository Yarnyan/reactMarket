import React from 'react'
import SellerItem from '../sellerView/components/item/sellerItem'
import ItemsFooter from '../sellerView/components/ui/footer'
export default function shopSellerItem() {
  return (
    <div>
      <SellerItem />
      <ItemsFooter currentPage="items"/>
    </div>
  )
}
