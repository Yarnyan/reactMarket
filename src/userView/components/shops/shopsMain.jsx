import React, { useState, useEffect } from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import { BsPatchCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import {getMainUser} from '../../../api/userReq'
import LoadingModal from '../ui/loadingModal'
export default function ShopsMain() {
    const dispatch = useDispatch()
    const shopsItems = useSelector((state) => state.shopsItems)
    const [isTrueLoader, setIsTrueLoader] = useState(false) 
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const items = [
            {
                id: 1,
                name: 'shopAntoha',
                status: 'active',
                date: '16/02/2015'
            },
            {
                id: 2,
                name: 'shopNikita',
                status: 'noActive',
                date: '16/02/2015'
            },
        ]
        dispatch({ type: 'SET_NEW_SHOPS', payload: items })
        console.log(shopsItems)
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await getMainUser();
            setIsTrueLoader(true);
        } catch (error) {
            console.error('Error fetching items:', error);
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
            const historyItemsSection = document.querySelector('.searchShop__items');
            historyItemsSection.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };
        resetScroll();
    }, []);
    useEffect(() => {
        const fetchItems = async () => {
            try {
            //   await getOrderHistory(userId, currentPageOrder)
                await getMainUser()
              setIsTrueLoader(true);
            } catch (error) {
              console.error('Error fetching items:', error);
            }
          };
          fetchItems();
    }, []);
    const handlePageChange = async (event, page) => {
        dispatch({ type: 'SET_NEW_PAGE_SHOPS', payload: page })
        setIsTrueLoader(false)
        try {
            // await getOrderHistory(userId, page)
            await getMainUser()
            setIsTrueLoader(true);
          } catch (error) {
            console.error('Error fetching items:', error);
          }
    };
    return (
        <div className='arbitration__body-container' style={{height: '100%', minHeight: '100vh'}}>
            <BackBtn />
            <div className="arbitration__container-content">
                <div className="arbitration__content-subtitle">
                    <h1>Search shop</h1>
                </div>
                <div className="searchShop__container">
                    <div className="searchShop__input">
                        <form onSubmit={handleSubmit}>
                            <div className="input__search">
                                <FiSearch />
                            </div>
                            <input type="text" className="inputSearch" placeholder="Search for a product..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </form>
                    </div>
                </div>
                <div className="searchShop__items">
                    <div className="searchShop__items-item">
                        {shopsItems
                            .map((item, index) => {
                                return (
                                    <div className='shops__item' key={index}>
                                        <div className='shops__item-info'>
                                            <div className='shops__item-name'>
                                                <p>{item.name}</p>
                                                {item.status === 'active' ? <BsPatchCheckFill /> : null}
                                            </div>
                                            <div className='shops__item-date'>{item.date}</div>
                                        </div>
                                        <div className='shops__item-button'>
                                            <button>
                                                <Link to={`/shop/${item.id}/home`}>Open</Link>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="history__pag-nav" style={{marginTop: '15px'}}>
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
            </div>
            <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
                <LoadingModal />
            </div>
        </div>
    )
}
