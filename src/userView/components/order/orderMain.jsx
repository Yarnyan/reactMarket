import React, {useState, useEffect} from 'react'
import LoadingModal from '../ui/loadingModal'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import { CiCalendarDate } from 'react-icons/ci'
export default function OrderMain() {
  const [isTrueLoader, setIsTrueLoader] = useState(true)
  const [orderItems, setOrderItems] = useState([])
  useEffect(() => {
    const item = [
      {
        id: 1,
        date: '12/07/2015',
        orderId: 123321331,
        title: ['Bot', 'Sok', 'Gaga'],
        description: ['                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate recusandae quam eaque voluptatibus asperiores odit, minus, facilis labore illum ut amet libero alias? Quasi quis fuga velit, nam earum blanditiis?', '321', '231']
      }
    ]
    setOrderItems(item)
  }, []);
  return (
    <div className='arbitration__body-container' style={{height: '100%', minHeight: '100vh'}}>
            <BackBtn />
            <div className="arbitration__container-content">
                <div className="arbitration__content-subtitle">
                    <h1>Order</h1>
                </div>
                <div className="arbitration__container-items">
                    {orderItems.map((item) => (
                        <div className="InfOrder__container-item" key={item.id}>
                            <div className="InfOrder__item-info">
                                <div className="order__info-title">
                                    <div className="order__title-numberOrder">
                                        <p style={{ color: 'white' }}><CiCalendarDate style={{color: 'rgb(131, 120, 245)'}}/> {item.date}</p>
                                        <p style={{ marginTop: '2px', color: 'gray' }}>#{item.orderId}</p>
                                    </div>
                                </div>
                                <div className="order__info-desc">
                                    {item.title.map((title, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='order__title'>{title}</div>
                                                <div className='order__description'>{item.description[index]}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
                <LoadingModal />
            </div>
        </div>
  )
}
