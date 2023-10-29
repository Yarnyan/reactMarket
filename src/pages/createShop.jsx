import React from 'react'
import CreateShopMain from '../userView/components/createShop/createShopMain'
import Footer from '../userView/components/ui/userFooter'
export default function createShop() {
  return (
    <div>
        <CreateShopMain />
        <Footer currentPage="seller" />
    </div>
  )
}
