import React, { useEffect, useState} from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import BasketBtn from '../../../shopView/components/ui/BusketButton/BasketBtn'
import { useParams } from 'react-router-dom';
import { getProducts } from '../../../api/shopReq'
import {AiOutlineClose} from 'react-icons/ai'
import LoadingModal from '../../../userView/components/ui/loadingModal';
export default function MainItems() {
  let { category, shopId } = useParams();
  const [basketVisible, setBasketVisible] = useState(false);
  let [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [newItem, setNewItem] = useState([]);
  const [isVisible, setIsVisible] = useState(true)
  const [isTrueLoader, setIsTrueLoader] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const res = setNewItem(updateQuantities(await getProducts(shopId, parseInt(category))))
        console.log(res)
        setIsTrueLoader(true)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
      const counterAll = document.querySelectorAll('.item-counter')
      update();
      const checkQuantityItems = () => {
        counterAll.forEach((item) => {
          const quantity = item.getAttribute('qty')
          const btn = item.closest('.page-item').querySelector('.item-incr-button')
          const btnId = btn.getAttribute('data-btn-id')
          console.log(quantity);
          if(quantity == 0 || quantity == '') {
            console.log('3')
          } else {
            console.log('2')
            btn.classList.add('add')
            btn.innerText = ''
            addSubCounter(btnId, 0)
          }
        })
      }      
      checkQuantityItems()
  }, [newItem]);


  const footerOnclick = (btn) =>
  {
    btn.closest('.page-item').querySelector('.item-description').classList.remove('active')
    btn.closest('.page-item').querySelector('.item-incr-button').click()
    setBasketVisible(true);
  }
  const btnDecOnclick = (btn) =>
  {
    let btnId = btn.getAttribute('data-btn-id')
    addSubCounter(btnId, -1)
  }

  const btnOnclick = (button) =>
  {
    button.classList.add('add')
    button.innerText = ''
    let btnId = button.getAttribute('data-btn-id')
    addSubCounter(btnId, 1)
  }

  const imageOnclick = (image) =>
  {
    let imageAtr = image.getAttribute('data-image')
    
    let desc = document.querySelector(imageAtr)
    desc.classList.add('active'); 
    setShowModal(true);
    setIsVisible(false);
  }

  const closeOnclick = (item) =>
  {
    let desc = document.querySelector(item)

    desc.classList.remove('active')
    setShowModal(false)
    setIsVisible(true);
  }

  const updateQuantities = (arr) => {
    const storedItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    
    const updatedNewItems = arr.map((item) => {
      const existingItem = storedItems.find((storedItem) => storedItem.name === item.name);
      if (existingItem) {
        return {
          ...item,
          qty: existingItem.quantity
        };
      }
      
      return item;
    });
    
    return updatedNewItems;
  };
  
  function addSubCounter(id, value) {
    console.log(value)
    let btnAtr = document.querySelector('[data-btn-add="' + id + '"]');
    let counter = document.querySelector(id)
    let counterMax = counter.getAttribute('data-max-counter')
    counter.classList.toggle('anim-dec')
    let qty = parseInt(counter.getAttribute('qty')) || 0;
    qty += value
    if (qty <= 0) {
      counter.classList.remove('show')
      btnAtr.classList.remove('add')
      counter.style.backgroundColor = ""
      btnAtr.style.backgroundColor = ""
      btnAtr.innerText = "ADD"
      btnAtr.disabled = false
      qty = ''
    } else if (counterMax == qty) {
      counter.classList.add('show')
      btnAtr.disabled = true
      btnAtr.style.backgroundColor = "#f7c362"
      counter.style.backgroundColor = "rgb(251,111,95)"
    } else {
      counter.style.backgroundColor = ""
      btnAtr.style.backgroundColor = ""
      btnAtr.disabled = false
      counter.classList.add('show')
    }
    counter.innerText = qty
    counter.setAttribute('qty', qty)
    newItem.map((item) => { 
      if('#btn_'+item.id == id)
        qty = item.qty
    });
  } 
  
  useEffect(() => {
    const item = {
      qty: '',
    };
    setNewItem([item])
    setNewItem(updateQuantities([item]))
  }, [data]); 

  const update = () => {
    const QuantityBasket = document.querySelector('.Quantity__items');
    if (!QuantityBasket) {
      return;
    }
  
    const storedItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const k = storedItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
  
    if (storedItems.length === 0) {
      QuantityBasket.innerText = '';
    } else {
      QuantityBasket.innerText = k.toString();
    }
  };
  

  const handleDecrease = (item) => {
    const storedItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const existingItemIndex = storedItems.findIndex((storedItem) => storedItem.name === item.name);
    
    if (existingItemIndex !== -1) {
      storedItems[existingItemIndex].quantity -= 1;
      if (storedItems[existingItemIndex].quantity === 0) {
        storedItems.splice(existingItemIndex, 1);
      }
    }
    
    const updatedNewItems = newItem.map((newItem) => {
      if (newItem.name === item.name) {
        return {
          ...newItem
        };
      }
      return newItem;
    });
  
    const jsonString = JSON.stringify(storedItems);
    sessionStorage.setItem('cartItems', jsonString);
    setNewItem(updatedNewItems);
    update();
  };
  

  const handleIncrease = (item) => {  
    const newItem1 = {
      id: item.id,
      name: item.name,
      price: item.priceUSD,
      quantity: 1,
      image: item.img,
    };
    const storedItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const existingItemIndex = storedItems.findIndex((storedItem) => storedItem.name === newItem1.name);
  
    if (existingItemIndex !== -1) {
      storedItems[existingItemIndex].quantity += 1;
    } else {
      storedItems.push(newItem1);
    }
    const jsonString = JSON.stringify(storedItems);
    sessionStorage.setItem('cartItems', jsonString);
    update()
  };
  return (
    <div className="item-container">
      <BackBtn />
      <section className="page page-items">
        {newItem.map((item, index) => {
          const kl = index + 1
          return (
            <div className="page-item" key={item.id}>
              <div className="item-counter" id={"btn_" + kl} qty={item.qty}  data-max-counter={item.count}>{item.qty}</div>
              <div className="item-photo" onClick={(a) => imageOnclick(a.currentTarget)} data-image={'#image_' + kl}>
                <picture className="item-lottie">
                  <img src={item.img} alt="" />
                  <source type="application/x-tgsticker" srcSet="src/image/Burger_148.png" />
                  <canvas width="74" height="74"></canvas>
                </picture>
              </div>
              <div className="item-label">
                <span className="item-title">
                  {item.name}
                </span>
                <span className="item-price">
                  {item.priceUSD}$
                </span>
              </div>
              <div className="item-buttons">
              <button
                  className="item-decr-button" onClick={(a) => {handleDecrease(item); btnDecOnclick(a.currentTarget);}} data-btn-id={"#btn_" + kl}></button>
                <button className="item-incr-button" onClick={(a) => {handleIncrease(item); btnOnclick(a.currentTarget);}} data-btn-id={"#btn_" + kl} data-btn-add={"#btn_" + kl}>
                  <span className="button-item-label">Add</span>
                </button>
              </div>
              <div className="item-description" id={"image_" + kl}>
                <div className="item-description-content">
                  <div className="item-content-header">
                    <button className="item-button-close" onClick={() => closeOnclick('#image_' + kl)}><AiOutlineClose /></button>
                  </div>
                  <div className="item-content-description">
                    <div className="item-content-image">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="item-content-subtitle">
                      <h1>{item.subtitle}</h1>
                    </div>
                    <div className="item-content-title">
                      <p>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="item-content-footer">
                    <button className="footer-btn" onClick={(a) => footerOnclick(a.currentTarget)} data-btn-id={"#btn_" + kl}>
                      Taste it for ${item.priceUSD}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className={isVisible ? null : "basketBtnHide"}>
          <BasketBtn/>
        </div>
      </section>
      <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
        <LoadingModal />
      </div>
    </div>
  )
}
