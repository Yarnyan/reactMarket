import React, { useEffect, useState } from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineUser } from 'react-icons/ai'
import { CiCalendarDate } from 'react-icons/ci'
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { useParams } from 'react-router-dom';
import LoadingModal from '../ui/loadingModal'
export default function ArbitHistoryMain() {
  const dispatch = useDispatch();
  let { userId } = useParams();
  const arbitrationItems = useSelector((state) => state.arbitrationItems)
  const currentPageHistory = useSelector((state) => state.currentPageHistory)
  const [isTrueLoader, setIsTrueLoader] = useState(false)
  useEffect(() => {
    const items = [
      {
        "id": 1,
        "username": "user1",
        "sellername": "seller1",
        "status": "completed",
        winner: 'user',
        "date": "2023-07-01"
      },
      {
        "id": 2,
        "username": "user2",
        "sellername": "seller2",
        "status": "pending",
        winner: 'user',
        "date": "2023-07-05"
      },
      {
        "id": 3,
        "username": "user3",
        "sellername": "seller3",
        "status": "shipped",
        winner: 'seller',
        "date": "2023-07-10"
      },
      {
        "id": 4,
        "username": "user4",
        "sellername": "seller4",
        "status": "cancelled",
        winner: 'seller',
        "date": "2023-07-15"
      },
      {
        "id": 5,
        "username": "user5",
        "sellername": "seller5",
        "status": "processing",
        "date": "2023-07-20",
        winner: 'user',
      }
    ]
    dispatch({ type: 'SET_NEW_ARBITRATION_ITEMS', payload: items })
  }, []);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     setIsTrueLoader(false)
  //     try {
  //       await getHistoryTrans(userId, currentPageHistory)
  //       setIsTrueLoader(true)
  //     } catch (error) {
  //       console.error('Error fetching items:', error);
  //     }
  //   };
  //   fetchItems();
  // }, [currentPageHistory, dispatch]);
  useEffect(() => {
    const resetScroll = () => {
      const historyItemsSection = document.querySelector('.arbitration__container-items');
      historyItemsSection.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    resetScroll();
  }, []);

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#8378f5',
        contrastText: '#fff',
      },
    },
  });
  const handlePageChange = (event, page) => {
    dispatch({ type: 'SET_NEW_CURRENY_HISTORY_PAGE', payload: page })
  };
  return (
    <div className='arbitration__body-container'>
      <BackBtn />
      <div className="arbitration__container-content">
        <div className="arbitration__content-subtitle">
          <h1>Arbitration history</h1>
        </div>
        <div className="arbitration__container-items">
          {arbitrationItems.map((item, index) => (
            <div className="arbitration__item" key={index}>
              <div className="item__content">
                <div className="arbitration__item-info">
                  <div className="item__info-username">
                    <AiOutlineUser />
                    <p className={item.winner === 'user' ? 'added' : ''}>
                      {item.username}
                    </p>
                  </div>
                  <div className="item__info-sellername">
                    <AiOutlineUser />
                    <p className={item.winner === 'seller' ? 'added' : ''}>
                      {item.sellername}
                    </p>
                  </div>
                </div>
                <div className="arbitration__item-status">
                  <div className="item__date">
                    <CiCalendarDate />
                    <p>
                      {item.date}
                    </p>
                  </div>
                  <div className="item__status">
                    <p className={item.status === 'completed' ? 'added' : 'reject'}>
                      {item.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="history__pag-nav">
            <ThemeProvider theme={theme}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Pagination
                  count={2}
                  color='neutral'
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </Stack>
            </ThemeProvider>
          </div>
        </div>
      </div>
      <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
        <LoadingModal />
      </div>
    </div>
  )
}
