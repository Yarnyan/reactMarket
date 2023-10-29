import React, { useEffect, useState } from 'react'
import { AddShop } from '../../../api/shopReq'
import { Alert } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
export default function CreateShop() {
  const [shopName, setShopName] = useState('')
  const [shopDescription, setShopDescription] = useState('')
  const [shopImage, setShopImage] = useState('')
  const [isTrueLoader, setIsTrueLoader] = useState(false)
  const [errorMessage, setErrorMesage] = useState('')
  const [shopMessage, setShopMessage] = useState('')
  const [alertType, setAlertType] = useState(false)
  const [alertErrorType, setAlertErrorType] = useState(false)
  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      });
    });
  }, []);
  const handleFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (event) => {
      const file = event.target.files[0];
      setShopImage(file);
    };
    input.click();
  };
  const showAndHideAlert = () => {
  setAlertType(true)
  setTimeout(() => {
    setAlertType(false)
  }, 3000)
  };
const showErrorAlert = () => {
  setAlertErrorType(true)
  setTimeout(() => {
    setAlertErrorType(false)
  }, 3000)
}
  const CreateNewshop = async () => {
    const formData = new FormData();
    formData.append('shopImage', shopImage);
    
    try {
      const res = await AddShop(formData, shopName, shopDescription);
      setShopName('')
      setShopDescription('')
      setShopImage('')
      if(res === 400) {
        setErrorMesage("Магазин уже существует")
        showErrorAlert()
      } else {
        setShopMessage("Магазин успешно создан")
        showAndHideAlert()
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  const theme = createTheme({
    palette: {
        neutral: {
            main: '#8378f5',
        },
    },
});
  return (
    <div className='create__container'>
      <div className='create__tools-body'>
      <div className="sendMain__subtitle">
                    <h1>Create shop</h1>
                </div>
        <div className='setting__container-tools'>
          <div className='setting__tools-name ll'>
            <div className='input'>
              <textarea type="text" placeholder="Enter item name..." required style={{ borderRadius: 12 }} value={shopName} onChange={(e) => setShopName(e.target.value)} />
            </div>
          </div>
          <div className='setting__tools-file ll'>
            <div className='input'>
              <textarea type="text" placeholder="Add a store photo..." required style={{ borderRadius: 12 }} value={shopImage ? shopImage.name : ''} onClick={handleFileInput} />
            </div>
          </div>
          <div className='setting__tools-description ll'>
            <div className='input'>
              <textarea type="text" placeholder="Enter item name description..." required style={{ borderRadius: 12 }} value={shopDescription} onChange={(e) => setShopDescription(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="btn__container">
        <button className='create__shop-btn' onClick={(() => CreateNewshop())}>
          Create
        </button>
        <ThemeProvider theme={theme}>
        <Alert severity="success" color="info" className={`sendMain__alert-true ${alertType ? 'active' : ''}`}>
          {shopMessage}
        </Alert>
        <Alert severity="error" color="info" className={`sendMain__alert-false ${alertErrorType ? 'active' : ''}`}>
          {errorMessage}
        </Alert>
      </ThemeProvider>
      </div>
    </div>
  )
}
