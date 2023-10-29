import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ItemsFilter from '../items/itemsFilter';
import { getItems } from '../../../api/sellerReq'
import LoadingModal from '../../../userView/components/ui/loadingModal'
export default function ItemsMain(props) {
  const [newItems, setNewItems] = useState([])
  let { shopId } = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isTrueLoader, setIsTrueLoader] = useState(false)
  const handleFilterClose = () => {
    setIsFilterActive(false);
  };
  useEffect(() => {
    const items = [
      {
        id: 1,
        img: 'https://i.pinimg.com/564x/bd/b5/d1/bdb5d111a2cbea8fb97e03a7051ac7f7.jpg',
        name: 'Аир Джордан 9999 #1',
        price: '400.00',
        category: 'тапки',
        sales: '10',
        availability: '100',
      },
      {
        id: 2,
        img: 'https://i.pinimg.com/564x/90/46/be/9046be978a30b27f79a1db6cbbe56168.jpg',
        name: 'Аир Джордан 9999 #1',
        price: '400.00',
        category: 'боты',
        sales: '10',
        availability: '100',
      },
      {
        id: 3,
        img: 'https://i.pinimg.com/564x/90/46/be/9046be978a30b27f79a1db6cbbe56168.jpg',
        name: 'Аир Джордан 9999 #1',
        price: '400.00',
        category: 'бананы',
        sales: '10',
        availability: '100',
      },
      {
        id: 4,
        img: 'https://i.pinimg.com/564x/90/46/be/9046be978a30b27f79a1db6cbbe56168.jpg',
        name: 'Аир Джордан 9999 #1',
        price: '400.00',
        category: 'тапки',
        sales: '10',
        availability: '100',
      },
      {
        id: 5,
        img: 'https://i.pinimg.com/564x/90/46/be/9046be978a30b27f79a1db6cbbe56168.jpg',
        name: 'Аир Джордан 9999 #1',
        price: '400.00',
        category: 'тапки',
        sales: '10',
        availability: '100',
      },
    ]
    setNewItems(items)
    setFilteredItems(items);
  }, []);
  const handleFilterClick = () => {
    setIsFilterActive(true);
  };
  useEffect(() => {
    const categories = [...new Set(newItems.map(item => item.category))];
    setAllCategories(categories);
  }, []);

  const applyFilters = (categories, priceFrom, priceTo, salesFrom, salesTo) => {
    console.log(categories, priceFrom, priceTo, salesFrom, salesTo)
    let filtered = [...newItems];
    if (categories.length > 0) {
      filtered = filtered.filter(item => categories.includes(item.category));
    }

    if (priceFrom !== '' && priceTo !== '') {
      const minPrice = parseFloat(priceFrom);
      const maxPrice = parseFloat(priceTo);
      filtered = filtered.filter(item => {
        const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return itemPrice >= minPrice && itemPrice <= maxPrice;
      });
    }

    if (salesFrom !== '' && salesTo !== '') {
      const minSales = parseInt(salesFrom);
      const maxSales = parseInt(salesTo);
      filtered = filtered.filter(item => {
        const itemSales = parseInt(item.sales.replace(/[^0-9]/g, ''));
        return itemSales >= minSales && itemSales <= maxSales;
      });
    }

    setFilteredItems(filtered);
  };
  const handleItemClick = (item) => {
    const itemData = JSON.stringify(item);
    sessionStorage.setItem('itemData', itemData);
  };
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        await getItems(shopId)
        setIsTrueLoader(true);
      } catch (e) {
        console.log(e)
      }
    }
    fetchSettings()
  }, []);
  return (
    <div className='shopSeller__container'>
      <div className='shopSeller__container-subtitle'>
        <h1>Items</h1>
      </div>
      <div className='shopSeller__container-tools'>
        <button onClick={handleFilterClick}>Filter</button>
        <KeyboardArrowDownIcon />
      </div>
      <div className='shopSeller__container-items'>
        {filteredItems.map((item, index) => {
          return (
            <Link to={`/shopSeller/${shopId}/items/${item.id}`} className='shopSeller__items-item' key={item.id} onClick={() => handleItemClick(item)}>
              <div className='shopSeller__item-image'>
                <img src={item.img} />
              </div>
              <div className='shopSeller__item-info'>
                <p>{item.name}</p>
                <p>$ {item.price}</p>
                <p>{item.category}</p>
                <p style={{ color: 'gray' }}>{item.sales}</p>
                <p style={{ color: 'gray' }}>{item.availability}</p>
              </div>
            </Link>
          )
        })}
        <Link className='add__btn' to={`/shopSeller/${shopId}/add`}>
          <AddIcon />
        </Link>
      </div>
      <div className={`filter__modal ${isFilterActive ? 'active' : ''}`}>
        <ItemsFilter item={newItems} isActive={isFilterActive} onFilterClose={handleFilterClose} onFilterApply={applyFilters} allCategories={allCategories} />
      </div>
      <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
        <LoadingModal />
      </div>
    </div>
  )
}
