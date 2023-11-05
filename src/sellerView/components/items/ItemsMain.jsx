import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ItemsFilter from '../items/itemsFilter';
import { getProducts } from '../../../api/sellerReq'
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
        console.log(item.priceUSD)
        const itemPrice = parseFloat(item.priceUSD);
        return itemPrice >= minPrice && itemPrice <= maxPrice;
      });
    }

    if (salesFrom !== '' && salesTo !== '') {
      const minSales = parseInt(salesFrom);
      const maxSales = parseInt(salesTo);
      filtered = filtered.filter(item => {
        const itemSales = parseInt(item.sales);
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
        let response = await getProducts(shopId)
        setNewItems(response)
        setFilteredItems(response);
        setIsTrueLoader(true);
      } catch (e) {
        console.error(e)
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
      {filteredItems.length === 0 ? (
        <p className='error_response-title'>Goods are missing</p>
      ) : (
        <div className='shopSeller__container-items'>
          {filteredItems.map((item, index) => {
            return (
              <Link 
                to={`/shopSeller/${shopId}/items/${item.id}`}
                className='shopSeller__items-item'
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className='shopSeller__item-image'>
                  <img src={item.category.imageUrl} />
                </div>
                <div className='shopSeller__item-info'>
                  <p>{item.name}</p>
                  <p>${item.priceUSD}</p>
                  <p style={{'wordBreak': 'break-all'}}>Category: {item.category.name}</p>
                  <p style={{ color: 'gray' }}>Sales: {item.sales}</p>
                  <p style={{ color: 'gray' }}>Count: {item.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <Link className='add__btn' to={`/shopSeller/${shopId}/add`}>
        <AddIcon />
      </Link>
      <div className={`filter__modal ${isFilterActive ? 'active' : ''}`}>
      <ItemsFilter item={newItems} isActive={isFilterActive} onFilterClose={handleFilterClose} onFilterApply={applyFilters} allCategories={allCategories} />
      </div>
      <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
        <LoadingModal />
      </div>
    </div>
  )
}
