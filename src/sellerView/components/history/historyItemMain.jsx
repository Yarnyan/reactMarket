import React, { useEffect, useState } from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { AiOutlineUser } from 'react-icons/ai'
import { CiCalendarDate } from 'react-icons/ci'
import { useParams } from 'react-router-dom';
import {getItemsHistory} from '../../../api/sellerReq'
export default function HistoryItemMain() {
  let { shopId } = useParams();
  const [newItems, setNewItems] = useState([]);
  const [newItemsHistory, setNewItemsHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageStatus, setCurrentPageStatus] = useState(1)
  useEffect(() => {
    const selectHistoryBtn = document.querySelectorAll('.btn');
    const HistoryItems = document.querySelectorAll('.History__items');

    const handleBtnClick = (btn) => {
      const currentBtn = btn.getAttribute('data-btn-id');
      const mainSection = document.querySelector(currentBtn);
      selectHistoryBtn.forEach((btn) => {
        btn.classList.remove('active');
      });
      HistoryItems.forEach((review) => {
        review.classList.remove('active');
      });
      btn.classList.add('active');
      mainSection.classList.add('active');
    };
    selectHistoryBtn.forEach((btn) => {
      btn.removeEventListener('click', handleBtnClick);
    });
    selectHistoryBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        handleBtnClick(btn);
      });
    });
    handleBtnClick(document.querySelector('.btn.active'));
  }, [])
  useEffect(() => {
    const items = [
      {
        id: 1,
        name: 'StarCraft code',
        category: 'тапки',
        date: '12/06/22',
        status: 'Rejected'
      },
      {
        id: 2,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 3,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 4,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 5,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 6,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 7,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 8,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 9,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 10,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 11,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 12,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 13,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 14,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 15,
        name: ' StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 16,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 17,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 18,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 19,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 20,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 21,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
      {
        id: 22,
        name: 'StarCraft code',
        category: 'боты',
        date: '12/06/22',
        status: 'Added'
      },
    ]
    setNewItems(items)
  }, []);
  useEffect(() => {
    const historyItems = [
      {
        id: 1,
        name: 'Ключи для варкрафта',
        date: '12/06/22',
        count: 5,
        sum: 400,
        status: 'Confirmed',
        buyer: 'Oleg',
      },
      {
        id: 2,
        name: 'test',
        date: '12/06/22',
        count: 5,
        sum: 400,
        status: 'Conflict',
        buyer: 'test',
      },
      {
        id: 3,
        name: 'test',
        date: '12/06/22',
        count: 5,
        sum: 400,
        status: 'Wait accept',
        buyer: 'test',
      },
    ]
    setNewItemsHistory(historyItems)
  }, []);
  useEffect(() => {
    const resetScroll = () => {
      const historyItemsSection = document.querySelector('.History__items.active');
      historyItemsSection.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    resetScroll();
  }, [currentPage]);

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#8378f5',
        contrastText: '#fff',
      },
    },
  });
  const handlePageChangeHistory = async (type, page) => {
    setCurrentPage(page)
    try {
      await getItemsHistory(type, page, shopId)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
    handlePageChangeHistory('purchaseHistory', 1)
  }, []);
  const handlePageChangeStatus = async (type, page) => {
    setCurrentPageStatus(page)
    try {
      await getItemsHistory(type, page, shopId)
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <div>
      <div className="editItemMain__contaner">
        <BackBtn />
        <div className="editItemMain__container-content">
          <div className="editItemMain__content-subtitle">
            <h1>History</h1>
          </div>
          <div className='editItemMain__content-nav'>
            <button className='btn active' data-btn-id='#btn_1' onClick={() => handlePageChangeHistory('purchaseHistory', 1)}>Purchase History</button>
            <button className='btn' data-btn-id="#btn_2" onClick={() => handlePageChangeStatus('status', 1)}>Status</button>
          </div>
          <section className='History__items active' id='btn_1'>
            {newItemsHistory.map((item) => (
              <div className="history__items-item" key={item.id}>
                <div className="shopSeller__item-history">
                  <div>
                    <p><span style={{ color: '#8378f5' }}>#{item.id}</span> {item.name} <span style={{ color: 'gray' }}>x{item.count}</span></p>
                    <p style={{ color: 'gray' }}><span style={{ color: '#8378f5' }}>< CiCalendarDate /></span>{item.date}</p>
                    <p className={item.status === 'Confirmed' ? 'added' : 'reject'}>
                      {item.status}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'end' }}>
                    <p>${item.sum}</p>
                    <div style={{ display: 'flex' }}>
                      <span span style={{ marginRight: '5px', color: '#8378f5' }}><AiOutlineUser /></span>
                      <p>{item.buyer}</p>
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
                    page={currentPage}
                    color='neutral'
                    onChange={(event, page) => handlePageChangeHistory('purchaseHistory', page)}
                    shape="rounded"
                  />
                </Stack>
              </ThemeProvider>
            </div>
          </section>
          <section className='History__items' id='btn_2'>
            {newItems.map((item) => (
              <div className="history__items-item" key={item.id}>
                <div className="shopSeller__item-history">
                  <div>
                    <p><span style={{ color: '#8378f5' }}>#{item.id}</span> {item.name}</p>
                    <p className={item.status === 'Added' ? 'added' : 'reject'}>
                      {item.status}
                    </p>
                    <p style={{ color: 'gray' }}><span style={{ color: '#8378f5' }}>< CiCalendarDate /></span>{item.date}</p>
                  </div>
                  <div className="div">
                    <p>{item.category}</p>
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
                    page={currentPageStatus}
                    onChange={(event, page) => handlePageChangeStatus('status', page)}
                  />
                </Stack>
              </ThemeProvider>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
