import React from 'react'
import AddMain from '../sellerView/components/items/itemsAdd'
import AddFooter from '../sellerView/components/ui/footer'
export default function add() {
  return (
    <div>
        <AddMain />
        <AddFooter currentPage="items" />
    </div>
  )
}
