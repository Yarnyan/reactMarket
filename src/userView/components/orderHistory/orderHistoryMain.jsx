import React, { useEffect, useState } from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import { useSelector, useDispatch } from 'react-redux'
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { useParams } from 'react-router-dom';
import {getMainUser} from '../../../api/userReq'
import {getOrderHistory} from '../../../api/userReq'
import LoadingModal from '../ui/loadingModal'
import { Link } from 'react-router-dom';
export default function OrderHistoryMain() {
    const dispatch = useDispatch()
    const orderItems = useSelector((state) => state.orderItems)
    const [isTrueLoader, setIsTrueLoader] = useState(false)
    const currentPageOrder = useSelector((state) => state.currentPageOrder)
    let { userId } = useParams();
    useEffect(() => {
        const items = [
            {
                id: 1,
                numberOrder: 2121212121,
                date: '12/06/23',
                totalPrice: 22.00,
                quantity: 1,
                productName: 'test',
                status: '1'
            },
            {
                id: 2,
                numberOrder: 2121212121,
                date: '12/06/23',
                totalPrice: 22.05,
                quantity: 2,
                productName: 'test',
                status: '0'
            }
        ]
        dispatch({ type: 'SET_NEW_ORDER_ITEMS', payload: items })
        console.log(orderItems)
    }, []);
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
        dispatch({ type: 'SET_NEW_PAGE_ORDER', payload: page })
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
        <div className='arbitration__body-container'>
            <BackBtn />
            <div className="arbitration__container-content">
                <div className="arbitration__content-subtitle">
                    <h1>Order history</h1>
                </div>
                <div className="arbitration__container-items">
                    {orderItems.map((item) => (
                        <Link className="order__container-item" to={item.status === '1' ? `/user/123/profileUser/orderHistory/${item.numberOrder}` : null}>
                            <div className="order__item-info">
                                <div className="order__info-title">
                                    <div className="order__title-numberOrder">
                                        <p style={{ color: 'white' }}>#{item.numberOrder}</p>
                                        <p style={{ marginTop: '2px', color: 'gray' }}>{item.date}</p>
                                    </div>
                                    <div className="order__title-count">
                                        <p style={{ color: 'white' }}>{item.quantity} {item.quantity > 1 ? 'items' : 'item'}</p>
                                        <p style={{ marginTop: '2px', color: 'gray' }}>{item.productName}</p>
                                    </div>
                                </div>
                                <div className="order__info-totalPrice" style={{ color: 'white' }}>${item.totalPrice}</div>
                            </div>
                            <div className={item.status === '1' ? 'added' : 'reject'}>{item.status === '1' ? 'Confirm' : 'Reject'}</div>
                        </Link>
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
