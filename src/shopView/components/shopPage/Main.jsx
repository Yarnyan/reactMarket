import React, { useEffect, useState } from 'react';
import image from '../../../image/4k.jpg';
import BackButton from '../../../shopView/components/ui/Button/BackButton';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { RiScales3Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import LoadingModal from '../../../userView/components/ui/loadingModal';
import { getShop } from '../../../api/shopReq'


export default function Main() {
    const [data, setData] = useState(null);
    const [newItem, setNewItem] = useState(null);
    const [isTruncated, setIsTruncated] = useState(true);
    const [isTrueLoader, setIsTrueLoader] = useState(false)
    let { shopId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            setNewItem((await getShop(shopId)))
            setIsTrueLoader(true)
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, []);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <main className="shopPage__main">
            {newItem && newItem.description && (
                <div>
                    <div className="shopPage__main-prev" key={newItem.id}>
                        <img src={image} alt="" />
                        <BackButton />
                        <div className="shopPage__main-info">
                            <div className="shopPage__main-subtitle">
                                <h1>{newItem.name}</h1>
                                <div className="shopPage__main-rating">
                                    <AiFillStar className="icon__active" />
                                    <p>{newItem.rating}</p>
                                    <p className="shopPage__rating-text">
                                        (<span>{newItem.quantity}</span>)
                                    </p>
                                </div>
                            </div>
                            <div className="shopPage__main-arbit">
                                <div className="main__deals">
                                    <MdOutlineLocalGroceryStore className="icon__active" />
                                    <p>{newItem.shopping}</p>
                                </div>
                                <div className="main__arbit">
                                    <RiScales3Fill className="icon__active" />
                                    <p>{newItem.arbitration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shopPage__main-description">
                        <h1>Description</h1>
                        <div className="main__description-title">
                            <div className="Description__text">
                                {isTruncated
                                    ? newItem.description.slice(0, 350).trim() + '...'
                                    : newItem.description}
                            </div>
                            {newItem.description.length > 350 && (
                                <button className="Description__btn" onClick={toggleTruncate}>
                                    {isTruncated ? 'Read more' : 'Read less'}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="shopPage__main-category">
                        <h1>Categories</h1>
                        <div className="main__category-items">
                            {newItem.categories.map((item, index) => (
                                <div className="main__category-item" key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
                  <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
        <LoadingModal />
      </div>
        </main>
    );
}

