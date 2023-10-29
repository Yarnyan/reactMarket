import React from 'react'
import MainReviews from '../shopView/components/reviews/MainReviews'
// import FooterReviews from '../shopView/components/reviews/FooterRevies'
import StoreFooter from '../shopView/components/ui/footerStore/FooterStore'
export default function reviews() {
  return (
    <div>
      <MainReviews />
      <StoreFooter currentPage="reviews"/>
    </div>
  )
}
