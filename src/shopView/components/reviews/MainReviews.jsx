import React, { useEffect, useState } from 'react'
import BackBtn from '../../components/ui/Button/BackButton'
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { LinearProgress } from '@mui/material'
import { BsStarHalf } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { BsStar } from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { getReviews } from '../../../api/shopReq'
import {getReviewsAll} from '../../../api/shopReq'
export default function MainReviews() {
  const [data, setData] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const [newInfo, setNewInfo] = useState(null);
  const [currentPageAll, setCurrentPageAll] = useState(1)
  const [currentPageNegative, setCurrentPageNegative] = useState(1)
  const [currentPagePositive, setCurrentPagePositive] = useState(1)
  let { shopId } = useParams();
  useEffect(() => {
    if (1 > 0) {
      const newItems = [
        {
          id: 1,
          name: 'test',
          date: 'test',
          description: 'test Lorem ipsum dolor sit amet...',
          productName: 'test',
          rating: 5,
          isTruncated: true,
        },
        {
          id: 2,
          name: 'test',
          date: 'test',
          description: 'test Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam et rem impedit voluptates provident ducimus tempora harum facilis voluptatibus accusamus iusto iste nihil ratione fugit voluptatem quae, aperiam vero. Iure.         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam et rem impedit voluptates provident ducimus tempora harum facilis voluptatibus accusamus iusto iste nihil ratione fugit voluptatem quae, aperiam vero. Iure. test Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam et rem impedit voluptates',
          productName: 'test',
          rating: 3,
          isTruncated: true,
        },
        {
          id: 3,
          name: 'test',
          date: 'test',
          description: 'test Lorem ipsum dolor sit amet...',
          productName: 'test',
          rating: 1,
          isTruncated: true,
        }
      ];
      setNewItem(newItems);
      console.log(newItems);
    }
  }, [data]);
  useEffect(() => {
    const info = {
      ratingString: 'test',
      rating: 1.1,
      allReviews: 'test',
      Quality: 'test',
      Professionalism: 'test',
      Cost: 'test',
      Contactability: 'test',
      Timeline: 'test'
    }
    setNewInfo(info);
  }, []);

  const [allReviews, setAllReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);
  const [positiveReviews, setPositiveReviews] = useState([]);

  useEffect(() => {
    const filterAndSplitItems = () => {
      if (newItem) {
        const newItemArray = Object.values(newItem);
        setAllReviews(newItemArray);
        setNegativeReviews(newItemArray.filter(item => item.rating < 3));
        setPositiveReviews(newItemArray.filter(item => item.rating >= 3));
      }
    };
    filterAndSplitItems();
  }, [newItem]);
  const renderStars = rating => {
    if (rating != null) { 
      if (Number.isInteger(rating)) {
        const stars = [];
        const k = 5 - rating;
        for (let i = 0; i < rating; i++) {
          stars.push(<AiFillStar key={`filled_${i}`} className='star' />);
        }
        for (let i = 0; i < k; i++) {
          stars.push(<AiOutlineStar key={`empty_${i}`} className='star' />);
        }
        return stars;
      } else {
        const stars = [];
        var firstDigit = rating.toString().charAt(0);
        for (let i = 0; i < firstDigit; i++) {
          stars.push(<BsStarFill key={`filled_${i}`} className='star' />);
        }
        stars.push(<BsStarHalf className='star' />);
        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
          stars.push(<BsStar key={`empty_${i}`} className='star' />);
        }
        return stars;
      }
    } else {
      return null; // Обработайте случай, когда рейтинг не определен или равен null
    }
  };
  

  useEffect(() => {
    const selectReviewsBtn = document.querySelectorAll('.btn');
    const ReviewsItems = document.querySelectorAll('.Reviews__items');
    const handleBtnClick = (btn) => {
      const currentBtn = btn.getAttribute('data-btn-id');
      const mainSection = document.querySelector(currentBtn);
      selectReviewsBtn.forEach((btn) => {
        btn.classList.remove('active');
      });
      ReviewsItems.forEach((review) => {
        review.classList.remove('active');
      });
      btn.classList.add('active');
      mainSection.classList.add('active');
    };
    selectReviewsBtn.forEach((btn) => {
      btn.removeEventListener('click', handleBtnClick);
    });
    selectReviewsBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        handleBtnClick(btn);
      });
    });

  }, [])
  const toggleText = (id) => {
    setAllReviews((prevReviews) => {
      return prevReviews.map((newItem) => {
        if (newItem.id === id) {
          return {
            ...newItem,
            isTruncated: !newItem.isTruncated
          };
        }
        return newItem;
      });
    });
  };
  const toggleTextNegative = (id) => {
    setNegativeReviews((prevReviews) => {

      return prevReviews.map((newItem) => {
        if (newItem.id === id) {
          return {
            ...newItem,
            isTruncated: !newItem.isTruncated
          };
        }
        return newItem;
      });
    });
  };
  const toggleTextPositive = (id) => {
    setPositiveReviews((prevReviews) => {
      return prevReviews.map((newItem) => {
        if (newItem.id === id) {
          return {
            ...newItem,
            isTruncated: !newItem.isTruncated
          };
        }
        return newItem;
      });
    });
  };
  const truncateString = (text, maxLength) => {
    if (typeof text === 'string' && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };
  const theme = createTheme({
    palette: {
      neutral: {
        main: '#8378f5',
        contrastText: '#fff',
      },
    },
  });
  useEffect(() => {
    const resetScroll = () => {
      const historyItemsSection = document.querySelector('.Reviews__items');
      historyItemsSection.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    resetScroll();
  }, []);
  const handlePageChangeAll = async (event, page) => {
    try {
      setNewItem((await getReviewsAll(2, shopId, 1)))
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handlePageChangeAll();
  }, [])
  
  const handlePageChange = async (event, page) => {
    setCurrentPageAll(page)
    console.log(page)
    try {
      setNewItem((await getReviews(2, shopId, page)))
    } catch (error) {
      console.error(error);
    }
  }
  const handlePageChangeNegative = async (event, page) => {
    setCurrentPageNegative(page)
    console.log(page, currentPageNegative)
    try {
      setNewItem((await getReviews(0, shopId, page)))
    } catch (error) {
      console.error(error);
    }
  }
  const handlePageChangePositive = async (event, page) => {
    setCurrentPagePositive(page)
    console.log(page, currentPagePositive);
    try {
      setNewItem((await getReviews(1, shopId, page)))
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='Reviews__container'>
      <BackBtn />
      <div className='Reiews'>
        <h1>Reviews</h1>
      </div>
      {newInfo && (
        <div className='Reviews__info' key={newInfo.id}>
          <div className='Reviews__rating'>
            <h1 className='Rating'>{newInfo.ratingString}</h1>
            <div className='AllStar'>{renderStars(newInfo?.rating)}</div>
            <div className='AllReviews'>
              <span>{newInfo.allReviews}</span>
              <p>reviews</p>
            </div>
          </div>
          <div className='Reviews__fields'>
            <div className='Reviews__fiels-info'>
              <p>Quality</p>
              <LinearProgress variant='determinate' value={0} />
              <p className='Info__rating'>{newInfo.service}</p>
            </div>
            <div className='Reviews__fiels-info'>
              <p>Professionalism</p>
              <LinearProgress variant='determinate' value={0} />
              <p className='Info__rating'>{newInfo.organization}</p>
            </div>
            <div className='Reviews__fiels-info'>
              <p>Cost</p>
              <LinearProgress variant='determinate' value={0} />
              <p className='Info__rating'>{newInfo.kaka}</p>
            </div>
            <div className='Reviews__fiels-info'>
              <p>Contactability</p>
              <LinearProgress variant='determinate' value={0} />
              <p className='Info__rating'>{newInfo.lala}</p>
            </div>
            <div className='Reviews__fiels-info'>
              <p>Timeline</p>
              <LinearProgress variant='determinate' value={0} />
              <p className='Info__rating'>{newInfo.lala}</p>
            </div>
          </div>
        </div>
      )}
      <div className='Reviews__btn'>
        <button className='btn active' data-btn-id='#btn_1' onClick={(e) => handlePageChange(e, 1)}>
          All reviews
        </button>
        <button className='btn' data-btn-id='#btn_2' onClick={(e) => handlePageChangeNegative(e, 1)}>
          Negative reviews
        </button>
        <button className='btn' data-btn-id='#btn_3' onClick={(e) => handlePageChangePositive(e, 1)}>
          Positive reviews
        </button>
      </div>
      <section className='Reviews__items active' id='btn_1'>
        {allReviews.map((newItem, index) => (
          <div className='item' key={newItem.id}>
            <div className='item__subtitle'>
              <div className='item__subtitle-about'>
                <p className='AboutBuyer'>{newItem.name}</p>
                <p className='Date'>{newItem.date}</p>
              </div>
              <div className='item__subtitle-rating'>
                {renderStars(newItem?.rating)}
              </div>
            </div>
            <div className='item__title'>
              <div className='item__title-name'>
                <h1>" {newItem.productName} "</h1>
              </div>
              <div className='item__title-description'>
                {newItem.isTruncated
                  ? truncateString(newItem.description, 200)
                  : newItem.description}
              </div>
            </div>
            {newItem.description.length > 350 && (
              <button className='read-more-btn' onClick={() => toggleText(newItem.id)}>
                {newItem.isTruncated ? 'Read more' : 'Read less'}
              </button>
            )}
          </div>
        ))}
        <div className="history__pag-nav">
          <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Pagination
                count={2}
                color='neutral'
                shape="rounded"
                page={currentPageAll}
                onChange={handlePageChange}
              />
            </Stack>
          </ThemeProvider>
        </div>
      </section>
      <section className='Reviews__items' id='btn_2'>
        {negativeReviews.map((newItem) => (
          <div className='item' key={newItem.Id}>
            <div className='item__subtitle'>
              <div className='item__subtitle-about'>
                <p className='AboutBuyer'>{newItem.name}</p>
                <p className='Date'>{newItem.date}</p>
              </div>
              <div className='item__subtitle-rating'>
                {renderStars(newItem.rating)}
              </div>
            </div>
            <div className='item__title'>
              <div className='item__title-name'>
                <h1>" {newItem.productName} "</h1>
              </div>
              <div className='item__title-description'>
                {newItem.isTruncated
                  ? truncateString(newItem.description, 200)
                  : newItem.description}
              </div>
            </div>
            {newItem.description.length > 350 && (
              <button
                className='read-more-btn'
                onClick={() => toggleTextNegative(newItem.id)}
              >
                {newItem.isTruncated ? 'Read more' : 'Read less'}
              </button>
            )}
          </div>
        ))}
                <div className="history__pag-nav">
          <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Pagination
                count={2}
                color='neutral'
                shape="rounded"
                page={currentPageNegative}
                onChange={handlePageChangeNegative}
              />
            </Stack>
          </ThemeProvider>
        </div>
      </section>
      <section className='Reviews__items' id='btn_3'>
        {positiveReviews.map((newItem) => (
          <div className='item' key={newItem.id}>
            <div className='item__subtitle'>
              <div className='item__subtitle-about'>
                <p className='AboutBuyer'>{newItem.name}</p>
                <p className='Date'>{newItem.date}</p>
              </div>
              <div className='item__subtitle-rating'>
                {renderStars(newItem.rating)}
              </div>
            </div>
            <div className='item__title'>
              <div className='item__title-name'>
                <h1>" {newItem.productName} "</h1>
              </div>
              <div className='item__title-description'>
                {newItem.isTruncated
                  ? truncateString(newItem.description, 200)
                  : newItem.description}
              </div>
            </div>
            {newItem.description.length > 350 && (
              <button
                className='read-more-btn'
                onClick={() => toggleTextPositive(newItem.id)}
              >
                {newItem.isTruncated ? 'Read more' : 'Read less'}
              </button>
            )}
          </div>
        ))}
                <div className="history__pag-nav">
          <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Pagination
                count={2}
                color='neutral'
                shape="rounded"
                page={currentPagePositive}
                onChange={handlePageChangePositive}
              />
            </Stack>
          </ThemeProvider>
        </div>
      </section>
    </div>
  );
}