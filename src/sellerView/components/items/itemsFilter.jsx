import React, { useState, useEffect } from 'react'
import Footer from '../ui/footer'
import CloseIcon from '@mui/icons-material/Close';
export default function ItemsFilter(props) {
  const [activeCategories, setActiveCategories] = useState([]);
  const [priceFrom, setPriceFrom] = useState('0');
  const [priceTo, setPriceTo] = useState('100000');
  const [salesFrom, setSalesFrom] = useState('0');
  const [salesTo, setSalesTo] = useState('100000');
  const items = Object.values(props.item);
  const categories = [...new Set(items.map((item) => item.category.name))];
  const toggleCategory = (category) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter(item => item !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
  };
  const handleFilterClose = () => {
    props.onFilterClose();
  };
  const handlePriceInputChange = (event) => {
    const { id, value } = event.target || {};
    if (value !== undefined) {
      const numericValue = value.replace(/[a-zA-Z]/g, '');
      if (id === 'priceFrom') {
        setPriceFrom(numericValue);
      } else if (id === 'priceTo') {
        setPriceTo(numericValue);
      } else if (id === 'salesFrom') {
        setSalesFrom(numericValue);
      } else if (id === 'salesTo') {
        setSalesTo(numericValue);
      }
    }
  };
  const handleFilterApply = () => {
    props.onFilterApply(activeCategories, priceFrom, priceTo, salesFrom, salesTo);
    props.onFilterClose();
  };
  return (
    <div>
      <div className='filter__close' onClick={handleFilterClose}>
        <button>
          <CloseIcon />
        </button>
      </div>
      <div className="filter__container">
        <div className="filter__container-subtitle">
          <h1>Filters</h1>
        </div>
        <div className="filter__container-items">
          <div className="filter__category">
            {categories.map(category => (
              <div className={`category ${activeCategories.includes(category) ? 'active' : ''}`} onClick={() => toggleCategory(category)} key={category}>
                {category.length > 7 ? `${category.slice(0, 7)}...` : category}
              </div>
            ))}
          </div>
        </div>
        <div className="filter__container-price">
          <h1>Price</h1>
          <div className="filter__price-input">
            <input type="number" placeholder='From' onChange={handlePriceInputChange} id="priceFrom" value={priceFrom} />
            <input type="number" placeholder='To' onChange={handlePriceInputChange} id="priceTo" value={priceTo} />
          </div>
        </div>
        <div className="filter__container-quantity">
          <h1>Number of sales</h1>
          <div className="filter__price-input">
            <input type="number" placeholder='From' onChange={handlePriceInputChange} id="salesFrom" value={salesFrom} />
            <input type="number" placeholder='To' onChange={handlePriceInputChange} id="salesTo" value={salesTo} />
          </div>
        </div>
      </div>
      <div className='filter__saveBtn'>
        <button onClick={handleFilterApply}>Save filter</button>
      </div>
      <Footer currentPage="items" />
    </div>
  )
}
