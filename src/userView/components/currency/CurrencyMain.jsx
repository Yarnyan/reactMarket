import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import BackBtn from '../../../shopView/components/ui/Button/BackButton';
import { setNewItem, setNewItemTrans } from '../../../redux/actions/actions'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { getTransactions } from '../../../api/userReq'
import LoadingModal from '../ui/loadingModal'
export default function CurrencyMain() {
    let { userId } = useParams();
    const newItem = useSelector((state) => state.newItem);
    const newItemTrans = useSelector((state) => state.newItemTrans);
    const dispatch = useDispatch();
    const [isTrueLoader, setIsTrueLoader] = useState(false)
    const currentPage = useSelector((state) => state.currentPageCurrency);
    const currencyNameInfo = JSON.parse(sessionStorage.getItem('itemCurrency'));
    const currencyName = currencyNameInfo.currency;
    const currencyActual = currencyNameInfo.actualPrice;
    const currencyBalance = currencyNameInfo.count;
    const [page, setPage] = useState(0);
    let result;
    if (currencyName === 'USDT') {
        result = 0;
    } else {
        result = 1;
    }
    useEffect(() => {
        const getSessionItem = () => {
            const a = JSON.parse(sessionStorage.getItem('itemCurrency'));
            dispatch(setNewItem(a));
        };
        getSessionItem();
    }, [dispatch]);

    const formatCount = (count) => {
        if (Array.isArray(count)) {
            const totalCount = count.reduce((total, value) => total + parseFloat(value), 0);
            return totalCount.toFixed(6);
        } else {
            return parseFloat(count).toFixed(4);
        }
    };

    const formatWallet = (wallet) => {
        const firstSevenChars = wallet.slice(0, 7);
        const lastSevenChars = wallet.slice(-7);
        const formattedWallet = firstSevenChars + '...' + lastSevenChars;
        return formattedWallet;
    };
    const theme = createTheme({
        palette: {
            neutral: {
                main: '#8378f5',
                contrastText: '#fff',
            },
        },
    });
    const formatDate = (date) => {
        const a = date.replace('T', ' ')
        const b = a.slice(0, 16)
        return b
    }
    const handlePageChange = async (event, page) => {
        dispatch({ type: 'SET__CURRENT_PAGE_CURRENCY', payload: page })
        setIsTrueLoader(false)
        try {
            let b = await getTransactions(currencyName, page)
            let f = b.pageInfo.totalPages
            setPage(f)
            dispatch(setNewItemTrans(b))
            setIsTrueLoader(true)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        handlePageChange(null, 1)
        setIsTrueLoader(true)
    }, []);
    const formatName = (name) => {
        const spaceIndex = name?.indexOf(' ') || 0;
        const wordBeforeSpace = name?.slice(0, spaceIndex) || "";
        return wordBeforeSpace;
    };
    useEffect(() => {
        const resetScroll = () => {
            const historyItemsSection = document.querySelector('.currency__info-date');
            historyItemsSection.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };
        resetScroll();
    }, [currentPage]);
    const currencyBl = (actualPrice, balance) => {
        return (actualPrice * balance).toFixed(2)
    }
    return (
        <div>
            <BackBtn />
            <div className="currency__container">
                <div className="currency__subtitle">
                    <p>COIN</p>
                    {newItem && newItem.actualPrice ? <p>${newItem.actualPrice}</p> : <p>Loading...</p>}
                </div>
                <div className="currency__info">
                    {newItem && newItem.img && <img src={newItem.img} alt="" />}
                    {newItem && newItem.count && (
                        <div className="currency__info-count">
                            <h1>{currencyBalance}</h1>
                            <p>≈ {currencyBl(currencyActual, currencyBalance)} USD</p>
                        </div>
                    )}
                </div>
                <div className="currency__info-tools user__container-tools">
                    <div className="user__tools-Replenish user__tools-btn">
                        <Link className='Send' to={`/user/${userId}/profileUser/${formatName(newItem && newItem.name)}/send`}><NorthIcon /></Link>
                        <p>Withdraw</p>
                    </div>
                    <div className="user__tools-Withdraw user__tools-btn">
                        <Link className='Receive' to={`/user/${userId}/profileUser/${formatName(newItem && newItem.name)}/receive`}><SouthIcon /></Link>
                        <p>Deposit</p>
                    </div>
                </div>
                <div className="currency__info-date">
                    {newItemTrans.items && newItemTrans.items.map((item, index) => (
                        <div className="info__date-item" key={item.id + index}>
                            <div className="currency__date">
                                <p>{formatDate(item.dateTime)}</p>
                            </div>
                            <div className="currency__info-trans" key={index}>
                                <div className="info__trans">
                                    {item.operation === 'Withdraw' ? (
                                        <NorthIcon style={{ color: 'gray' }} />
                                    ) : (
                                        <SouthIcon style={{ color: 'gray' }} />
                                    )}
                                    <div className="info__address">
                                        <div className="info__addres-type">Transfer</div>
                                        <div className="address" style={{ color: 'gray' }}>
                                            To: {formatWallet(item.toAddress)}
                                        </div>
                                    </div>
                                </div>
                                <div className={`info__count ${item.operation === 'Withdraw' ? 'Withdraw' : 'Replenish'}`}>
                                    {item.operation === 'Withdraw' ? '-' : '+'} {item.count}
                                </div>
                            </div>
                        </div>
                        ))}
                    <div className="history__pag-nav">
                        <ThemeProvider theme={theme}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Pagination
                                    count={page}
                                    page={currentPage}
                                    color='neutral'
                                    onChange={handlePageChange}
                                    shape="rounded"
                                    key={currentPage}
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
    );
}
