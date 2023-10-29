import React from 'react'
import MainProfile from '../userView/components/user/MainUser'
import Footer from '../userView/components/ui/userFooter'
export default function ProfileUser() {
  return (
    <div>
        <MainProfile />
        <Footer currentPage="wallet"/>
    </div>
  )
}
