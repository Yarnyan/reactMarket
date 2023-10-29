import React from 'react'
import SettingMain from '../sellerView/components/setting/SettingMain'
import Footer from '../sellerView/components/ui/footer'
export default function setting() {
  return (
    <div>
        <SettingMain />
        <Footer currentPage="settings"/>
    </div>
  )
}
