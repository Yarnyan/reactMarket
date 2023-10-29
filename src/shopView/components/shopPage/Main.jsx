import React, { useEffect, useState } from 'react';
import image from '../../../image/4k.jpg';
import BackButton from '../../../shopView/components/ui/Button/BackButton';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { RiScales3Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import { getHome } from '../../../api/shopReq'


export default function Main() {
    const [data, setData] = useState(null);
    const [newItem, setNewItem] = useState(null);
    const [isTruncated, setIsTruncated] = useState(true);

    let { shopId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            setNewItem((await getHome(shopId)))
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, []);

    useEffect(() => {
        if (1 > 0) {
            const newItem = {
                id: 1, //data.id
                name: 'test', //data.subtitle
                rating: 'test', //data.rating
                quantity: 'test', //data.quantity
                shopping: 'test', //data.shoping
                arbitration: 'test', //data.arbitration
                description:
                    'test     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi g elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.g elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi g elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nam quo quod, vitae sint cupiditate, sunt voluptatem modi illo voluptas excepturi. Aliquam, architecto! Non, veritatis minima in quasi aperiam modi...',
                img: image, //data.img
                items: ['test', 'test', 'test'],
            };
            setNewItem(newItem);
        }
    }, [data]);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <main className="shopPage__main">
            {newItem && (
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
                            {newItem.items.map((item, index) => (
                                <div className="main__category-item" key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

