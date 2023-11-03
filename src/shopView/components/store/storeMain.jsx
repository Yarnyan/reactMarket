import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import BasketBtn from '../ui/BusketButton/BasketBtn'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import LoadingModal from '../../../userView/components/ui/loadingModal';
import { getCategory } from '../../../api/shopReq'
export default function StoreMain() {
  const [newItem, setNewItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTrueLoader, setIsTrueLoader] = useState(false)
  let { shopId, category } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let a = await getCategory()
        setNewItem(a)
        setIsTrueLoader(true)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  function levenshteinDistance(a, b) {
    const distanceMatrix = [];

    for (let i = 0; i <= a.length; i++) {
      distanceMatrix[i] = [i];
    }

    for (let j = 0; j <= b.length; j++) {
      distanceMatrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        distanceMatrix[i][j] = Math.min(
          distanceMatrix[i - 1][j] + 1,
          distanceMatrix[i][j - 1] + 1,
          distanceMatrix[i - 1][j - 1] + cost
        );
      }
    }

    return distanceMatrix[a.length][b.length];
  }

  const filteredItems = searchQuery
    ? newItem.filter((item) => {
      const nameWords = item.name.toLowerCase().split(' ');
      const isMatchingTitleCategory = item.titleCategory.toLowerCase().includes(searchQuery.toLowerCase());
      const isMatchingSubtitle = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isMatchingTitleCategory || isMatchingSubtitle;
    })
    : newItem;


  const groupedItems = filteredItems.reduce((grouped, item) => {
    if (!grouped[item.titleCategory]) {
      grouped[item.titleCategory] = [];
    }
    grouped[item.titleCategory].push(item);
    return grouped;
  }, {});


  return (
    <div className="store__container">
      <div className="store__about">
        <h1 className="Category">Categories</h1>
        <form action="">
          <div className="input__search">
            <FiSearch />
          </div>
          <input type="text" placeholder="Search for a product..." onChange={handleSearch} />
        </form>
      </div>
      <div className="store__container-content">
        {Object.keys(groupedItems).length > 0 ? (
          Object.keys(groupedItems).map((category) => (
            <div className="item__container" key={category}>
              <h1 className="store__content-subtitle">{category}</h1>
              <div className="store__content-items">
                {groupedItems[category].map((item) => (
                  <Link to={`/shop/${shopId}/store/${item.id}`} className="store__item" key={item.id}>
                    <div className="store__item-image">
                      <img src={item.imageUrl} alt="" />
                    </div>
                    <div className="store__item-about">
                      <h1 style={{ wordWrap: 'break-word' }}>{item.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h1 style={{textAlign: 'center', color: '#fff'}}>{filteredItems.length > 0 ? 'No items found' : 'Item not found'}</h1>
        )}
      </div>
      <BasketBtn />
      <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
        <LoadingModal />
      </div>
    </div>
  );
}






