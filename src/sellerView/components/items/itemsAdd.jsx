import React, {useEffect, useState} from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoIcon from '@mui/icons-material/Photo';
import {postNewItem} from '../../../api/sellerReq'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Alert } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
export default function ItemsAdd() {
    let { shopId} = useParams()
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemInstruction, setItemInstruction] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [alertType, setAlertType] = useState(false)
    const [alertErrorType, setAlertErrorType] = useState(false)
    useEffect(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
          textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
    
            const inputSearch = textarea.nextElementSibling;
            inputSearch.style.height = `${textarea.scrollHeight}px`;
          });
        });
      }, []);
      const handleFileInput = (id) => {
        const input = document.createElement('input');
        input.type = 'file';
      
        input.onchange = (event) => {
          const file = event.target.files[0];
          if(id === 1) {
            setSelectedFile(file);
          } else {
            setSelectedFile2(file);
          }
        };
        input.click();
      };
    const clearInput = () => {
        setItemName('');
        setSelectedFile(null);
        setSelectedFile2(null);
        setItemPrice('')
        setItemInstruction('');
        setItemCategory('');
    }
    const showAndHideErrorAlert = () => {
        setAlertErrorType(true)
        setTimeout(() => {
            setAlertErrorType(false)
        }, 2000);
    };
    const handleSaveSettings = async () => {
        try {
            const formData = new FormData();
            const newPrice = parseFloat(itemPrice)
            if(itemName === '' || selectedFile === null || selectedFile2 === null || itemPrice === '' || itemInstruction === '') {
                showAndHideErrorAlert()
            } else {
                showAndHideAlert()
                formData.append('name', itemName);
                formData.append('image', selectedFile);
                formData.append('description', selectedFile2);
                formData.append('price', itemPrice);
                formData.append('instructions', itemInstruction);
                formData.append('category', itemCategory);
                console.log(itemName, selectedFile, selectedFile2, itemPrice, itemInstruction, itemCategory);
                clearInput()
                await postNewItem(formData, shopId)
            }
        } catch(error) {
            console.error(error);
        }
    };
    const theme = createTheme({
        palette: {
            neutral: {
                main: '#8378f5',
                contrastText: '#fff',
                type: '#fff'
            },
        },
    });
    const showAndHideAlert = () => {
        setAlertType(true)
        setTimeout(() => {
            setAlertType(false)
        }, 2000);
    };
    return (
        <div className='setting__container'>
            <BackBtn />
            <div className='setting__subtitle'>
                <h1>Add item</h1>
            </div>
            <div className='setting__tools-body'>
                <div className='setting__container-tools'>
                    <div className='setting__tools-name ll'>
                        {/* <p>Name</p> */}
                        <div className='input'>
                            <textarea type="text" placeholder="Enter item name..." value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                            <div className="input__search">
                                <StorefrontIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-file ll'>
                        {/* <p>Name</p> */}
                        <div className='input'>
                            <textarea type="text" placeholder="Add a store photo..."  value={selectedFile ? selectedFile.name : ''} onClick={() => handleFileInput(1)}/>
                            <div className="input__search">
                                <PhotoIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-description ll'>
                        {/* <p>Name</p> */}
                        <div className='input'>
                            <textarea type="text" placeholder="Enter item name description..." value={selectedFile2 ? selectedFile2.name : ''} onClick={() => handleFileInput(2)}/>
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        {/* <p>Name</p> */}
                        <div className='input'>
                            <textarea type="text" placeholder="Enter the cost of the item..." value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>
                            <div className="input__search">
                                <AttachMoneyIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        {/* <p>Name</p> */}
                        <div className='input'>
                            <textarea type="text" placeholder="Enter the instructions..." value={itemInstruction} onChange={(e) => setItemInstruction(e.target.value)}/>
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        {/* <p>Name</p> */}
                        <div className='input'>
                            <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
                                <option>213</option>
                                <option>123</option>
                                <option>321</option>
                            </select>
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='save__container'>
                <button onClick={handleSaveSettings}>Add an item</button>
                <ThemeProvider theme={theme}>
                    <Alert severity="success" color="info" className={`sendMain__alert-true ${alertType ? 'active' : ''}`}>
                        Product has been successfully added!
                    </Alert>
                    <Alert severity="error" color="info" className={`sendMain__alert-false ${alertErrorType ? 'active' : ''}`}>
                        Please fill in all fields!
                    </Alert>
                </ThemeProvider>
            </div>    
        </div>
    )
}

