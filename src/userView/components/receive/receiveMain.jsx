import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import BackBtn from '../../../shopView/components/ui/Button/BackButton';
import QRCode from "react-qr-code";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useClipboard } from 'use-clipboard-copy'
import LoadingModal from '../ui/loadingModal'
import { getWallet } from '../../../api/userReq'
export default function ReceiveMain() {
  const dispatch = useDispatch()
  const currency = useSelector((state) => state.currency)
  const qrValue = useSelector((state) => state.qrValue)
  const wallet = useSelector((state) => state.newItemWallet)
  const [isTrueLoader, setIsTrueLoader] = useState(false)
  const clipboard = useClipboard();
  const currencyNameInfo = JSON.parse(sessionStorage.getItem('itemCurrency'));
  const currencyName = currencyNameInfo.currency;
  useEffect(() => {
    const getSessionItem = () => {
      const itemSession = JSON.parse(sessionStorage.getItem('itemCurrency'));
      return itemSession ? itemSession.name : null;
    };

    const itemName = getSessionItem();
    dispatch({ type: 'SET_CURRENCY', payload: itemName });
  }, [dispatch]);
  const formatName = (currency) => {
    const spaceIndex = currency.indexOf(' ');
    const wordBeforeSpace = currency.slice(0, spaceIndex);
    const wordAfterSpace = currency.slice(spaceIndex + 1);
    return wordBeforeSpace + ' ' + `(${wordAfterSpace})`;
  };
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let a = await getWallet(currencyName)
        dispatch({ type: 'SET_NEW_WALLET', payload: a });
        dispatch({ type: 'SET_QR_CODE_VALUE', payload: a.publicKey });
        setIsTrueLoader(true)
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [dispatch]);
  return (
    <div>
      <BackBtn />
      <div className="depositMain__container">
        <div className="sendMain__subtitle">
          <h1>Deposit</h1>
        </div>
        <div className="depositMain__container-content">
          <div className="container__qr">
            <QRCode value={qrValue} style={{ width: '90%', height: '90%' }} />
            {clipboard.target && <p className='qr__title' ref={clipboard.target}>{qrValue}</p>}
          </div>
          <div className="depostinMain__warning">
            <div>
              <ErrorOutlineIcon />
            </div>
            <div className='warning__title'>
              Отправляйте только <strong>{formatName(currency)}</strong> на этот адрес, иначе вы можете потерять свои средства.
            </div>
          </div>
          <div className="depositMain__container-tools user__container-tools">
            <div className="user__tools-Replenish user__tools-btn">
              <button className='Send' onClick={() => clipboard.copy(qrValue)}><ContentCopyIcon /></button>
              <p>Copy</p>
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
