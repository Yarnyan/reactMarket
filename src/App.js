import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './pages/home'
import Store from './pages/store'
import Reviews from './pages/reviews'
import Basket from './pages/basket'
import Items from './pages/Items'
import ItemsSeller from './pages/shopSellerItems'
import Settings from './pages/setting'
import Add from './pages/add'
import SellerItem from './pages/shopSellerItem'
import ProfileUser from './pages/ProfileUser'
import './styles/App.css'
import Me from './pages/me'
import CreateShop from './pages/createShop';
import HistoryItem from './pages/shopSellerHistory'
import Currency from './pages/currency'
import SendCrypto from './pages/sendCrypto'
import ReceiveCrypto from './pages/receiveCrypto'
import ArbitrationHistory from './pages/arbitrationHistory'
import OrderHistory from './pages/orderHistory'
import Login from './pages/login'
import Shops from './pages/shops'
import Order from './pages/order'
const tg = window.Telegram.WebApp
function App() {
  tg.expand() 
  const [shopId, setShopId] = useState(null);
  const [category, setCategory] = useState(null);
  const [userId, setUserId] = useState(null);   
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shopIdParam = searchParams.get('shopId');
    const userIdParam = searchParams.get('userId')
    const categoryNameParam = searchParams.get('category');
    setShopId(shopIdParam);
    setCategory(categoryNameParam)
    setUserId(userIdParam)
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="shop/:shopId/store" element={<Store />} />
        <Route path="shop/:shopId/home" element={<Home />} />
        <Route path="shop/:shopId/reviews" element={<Reviews />} />
        <Route path="shop/:shopId/store/basket" element={<Basket />} />
        <Route path="shop/:shopId/store/:category" element={<Items />} />
        <Route path="shopSeller/:shopId/settings" element={<Settings />} />
        <Route path="shopSeller/:shopId/items" element={<ItemsSeller />} />
        <Route path="/shopSeller/:shopId/add" element={<Add />} />
        <Route path='/shopSeller/:shopId/items/:itemId' element={<SellerItem />} />
        <Route path='/shopSeller/:shopId/history' element={<HistoryItem />} />
        <Route path="/user/:userId/profileUser" element={<ProfileUser />} />
        <Route path="/user/:userId/profileUser/me" element={<Me />} />
        <Route path='/user/:userId/create' element={<CreateShop />} />
        <Route path='/user/:userId/profileUser/:currency' element={<Currency />} />
        <Route path='/user/:userId/profileUser/:currency/send' element={<SendCrypto />} />
        <Route path='/user/:userId/profileUser/:currency/receive' element={<ReceiveCrypto />} />
        <Route path='/user/:userId/profileUser/arbitrationHistory' element={<ArbitrationHistory />} />
        <Route path='/user/:userId/profileUser/orderHistory' element={<OrderHistory />} />
        <Route path='/user/:userId/profileUser/orderHistory/:orderId' element={<Order />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/:userId/shops' element={<Shops />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
