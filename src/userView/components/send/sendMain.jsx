import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BackBtn from '../../../shopView/components/ui/Button/BackButton';
import { TfiWallet } from 'react-icons/tfi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Withdraw } from '../../../api/userReq'
import { Alert } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { getWallet } from '../../../api/userReq'
import { createTheme } from '@mui/material/styles';
import LoadingModal from '../ui/loadingModal'
export default function SendMain() {
    const addressInput = useSelector((state) => state.addressInput)
    const maxValue = useSelector((state) => state.newMaxValue)
    const alertType = useSelector((state) => state.alertType)
    const alertErrorType = useSelector((state) => state.alertErrorType)
    const [item, SetItem] = useState({})
    const dispatch = useDispatch();
    const itemCurrency = JSON.parse(sessionStorage.getItem('itemCurrency'));
    const availableCount = parseFloat(itemCurrency?.count);
    const actualPrice = itemCurrency?.actualPrice;
    const currency = itemCurrency.currency
    const [isTrueLoader, setIsTrueLoader] = useState(false)
    const [errorMessage, setErrorMesage] = useState('')
    const [transactionMessage, setTransactionMessage] = useState('')
    const handleMaxClick = () => {
        const inputElement = document.querySelector('.input__max');
        const itemCurrency = JSON.parse(sessionStorage.getItem('itemCurrency'));
        const count = itemCurrency.count;
        dispatch({ type: 'SET_NEW_MAX_VALUE', payload: count.toString() });
        inputElement.value = count.toString();
    };
    const a = (1 - item.feeUSD/100)
    const handleGetClipboardText = async () => {
        const inputElement = document.querySelector('.input__address');
        try {
            const text = await navigator.clipboard.readText();
            inputElement.value = text;
            dispatch({ type: 'SET_NEW_ADDRESS_VALUE', payload: inputElement.value });
        } catch (error) {
            console.log(error);
        }
    };
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        dispatch({ type: 'SET_NEW_MAX_VALUE', payload: inputValue });
    };
    const handleInputWalletChange = (event) => {
        const inputValue = event.target.value;
        dispatch({ type: 'SET_NEW_ADDRESS_VALUE', payload: inputValue });
    };
    const showAndHideAlert = () => {
        dispatch({ type: 'SET_ALERT_TYPE', payload: true });
        setTimeout(() => {
            dispatch({ type: 'SET_ALERT_TYPE', payload: false });
        }, 5000);
    };
    const showErrorAlert = () => {
        dispatch({ type: 'SET_ALERT_ERROR_TYPE', payload: true });
        setTimeout(() => {
            dispatch({ type: 'SET_ALERT_ERROR_TYPE', payload: false });
        }, 5000);
    }
    const sendCrypto = async () => {
        const addressInputElement = document.querySelector('.input__address');
        const maxInputElement = document.querySelector('.input__max');
        if (maxValue > 0 && addressInput != '') {
            dispatch({ type: 'SET_NEW_ADDRESS_VALUE', payload: '' });
            dispatch({ type: 'SET_NEW_MAX_VALUE', payload: null });
            const item = {
                to: addressInput,
                count: parseFloat(maxValue)
            };
            let a = await Withdraw(currency, item);
            let b = a.split('|')
            let c = b[0];
            let f = b[1];
            if(c === 'error') {
                setErrorMesage(f)
                showErrorAlert();
            } else {
                setTransactionMessage('Withdrawal request successfully created!')
                showAndHideAlert()
            }
            addressInputElement.value = '';
            maxInputElement.value = '';
        } else {
            setErrorMesage('Please fill in all fields!')
            showErrorAlert();
        }
    };
    const theme = createTheme({
        palette: {
            neutral: {
                main: '#8378f5',
            },
        },
    });
    useEffect(() => {
        const fetchItems = async () => {
            try {
                let a = await getWallet(currency)
                SetItem(a)
                setIsTrueLoader(true)
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [dispatch, currency]);
    const isSendDisabled = (parseFloat(actualPrice) * parseFloat(maxValue)) < (parseInt(item.minimalUSD)) ||
        parseFloat(maxValue) > availableCount;
    const ogryglenie = currency === 'USDT' ? 2 : 5;
    return (
        <div>
            <BackBtn />
            <div className="sendMain__container">
                <div className="sendMain__subtitle">
                    <h1>Withdraw</h1>
                </div>
                <div className="sendMain__container-tools setting__container-tools">
                    <div className="ll">
                        <div className="input">
                            <div className="input__button" onClick={() => handleGetClipboardText()}>
                                <button>Insert</button>
                            </div>
                            <input
                                type="text"
                                placeholder="Wallet address"
                                className="input__address"
                                onChange={handleInputWalletChange}
                            />
                            <div className="input__search" style={{ padding: '0 10px' }}>
                                <TfiWallet />
                            </div>
                        </div>
                    </div>
                    <div className="ll">
                        <div className="input">
                            <div className="input__button">
                                <button onClick={() => handleMaxClick()}>Max</button>
                            </div>
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="input__max"
                                onChange={handleInputChange}
                            />
                            <div className="input__search" style={{ padding: '0 10px' }}>
                                <BsCurrencyDollar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sendMain__btn">
                <button className={isSendDisabled ? 'disabled' : ''} disabled={isSendDisabled} onClick={() => sendCrypto()}>
                    {maxValue !== null && parseFloat(maxValue) > 0
                        ? `Withdraw ${(parseFloat(maxValue) * a).toFixed(ogryglenie)} ${currency}`
                        : 'Withdraw'}
                </button>
                <ThemeProvider theme={theme}>
                    <Alert severity="success" color="info" className={`sendMain__alert-true ${alertType ? 'active' : ''}`}>
                        {transactionMessage}
                    </Alert>
                    <Alert severity="error" color="info" className={`sendMain__alert-false ${alertErrorType ? 'active' : ''}`}>
                        {errorMessage}
                    </Alert>
                </ThemeProvider>
            </div>
            <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
                <LoadingModal />
            </div>
        </div>
    );
}
