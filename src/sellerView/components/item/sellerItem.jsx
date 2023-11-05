import React, {useEffect, useState} from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoIcon from '@mui/icons-material/Photo';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { updateItem } from '../../../api/sellerReq'
import {deleteItem} from '../../../api/sellerReq'
import { Alert } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { getCategory } from '../../../api/shopReq'
import LoadingModal from '../../../userView/components/ui/loadingModal'
export default function SellerItem() {
    let { shopId} = useParams()
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDesciption, setItemDesciption] = useState('');
    const [itemInstruction, setItemInstruction] = useState('');
    const [itemCategory, setItemCategory] = useState('');   
    const [itemId, setItemId] = useState('');
    const [alertType, setAlertType] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allItems, setAllItems] = useState([])
    const [isTrueLoader, setIsTrueLoader] = useState(false)
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
      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategory()
                const categoryNames = response.map((category) => category.name);
                setCategoryData(categoryNames);
                setAllItems(response)
                setIsTrueLoader(true)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, []);
      const handleFileInput = (inputId) => {
        const input = document.createElement('input');
        input.type = 'file';
      
        input.onchange = (event) => {
          const file = event.target.files[0];
          setSelectedFile(file);
        };
        input.click();
      };
    const handleSaveSettings = async () => {
        try {
            showAndHideAlert()
            const formData = new FormData();
            const newPrice = parseFloat(itemPrice)
            formData.append('productId', parseFloat(itemId))
            formData.append('name', itemName);
            formData.append('image', selectedFile);
            formData.append('description', itemDesciption);
            formData.append('data', selectedFile2);
            formData.append('priceUSD', newPrice);
            formData.append('instructions', itemInstruction)
            const foundCategory = allItems.find((item) => item.name === selectedCategory);
            if (foundCategory) {
                const categoryId = foundCategory.id;
                formData.append('categoryId', categoryId);
                console.log(formData, typeof(newPrice))
                await updateItem(formData);
            } else {
                console.error('Category not found');
            }
        } catch(error) {
            console.error(error);
        }
    };
    const removeItem = async () => {
        try {
            await deleteItem(itemId)
            showAndHideAlertDelete()
        } catch(error) {
            console.error(error);
        }
    }
    const showAndHideAlert = () => {
        setAlertMessage('Change successfully applied!')
        setAlertType(true)
        setTimeout(() => {
            setAlertType(false)
        }, 2000);
    };
    const showAndHideAlertDelete = () => {
        setAlertMessage('Item successfully deleted')
        setAlertType(true)
        setTimeout(() => {
            setAlertType(false)
        }, 2000);
    };
    useEffect(() => {
        let a = sessionStorage.getItem('itemData');
        if (a) {
          a = JSON.parse(a);
          setItemId(a.id)
          setItemName(a.name);
          setItemPrice(a.priceUSD);
        }
      }, []);
      
    const theme = createTheme({
        palette: {
            neutral: {
                main: '#8378f5',
                contrastText: '#fff',
                type: '#fff'
            },
        },
    });
    return (
        <div className='setting__container' style={{ overflow: isTrueLoader ? 'scroll' : '' }}>
            <BackBtn />
            <div className='setting__subtitle'>
                <h1>Edit an item</h1>
            </div>
            <div className='setting__tools-body'>
                <div className='setting__container-tools'>
                    <div className='setting__tools-name ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter item name..." value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                            <div className="input__search">
                                <StorefrontIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-file ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Add a store photo..."  value={selectedFile ? selectedFile.name : ''} onClick={() => handleFileInput(1)}/>
                            <div className="input__search">
                                <PhotoIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-description ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter item name description..." value={itemDesciption} onChange={(e) => setItemDesciption(e.target.value)}/>
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter the cost of the item..." value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>
                            <div className="input__search">
                                <AttachMoneyIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter the instructions..." value={itemInstruction} onChange={(e) => setItemInstruction(e.target.value)}/>
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        <div className='input'>
                            <Dropdown
                                value={selectedCategory}
                                options={categoryData}
                                placeholder="Select a category"
                                onChange={(e) => {
                                    setSelectedCategory(e.value);
                                  }}
                                className="w-full"
                            />
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='save__container'>
                <button onClick={(() => handleSaveSettings())} style={{width: '40%'}}>Save change</button>
                <button onClick={(() => removeItem())} style={{width: '40%'}}>Delete item</button>
                <ThemeProvider theme={theme}>
                    <Alert severity="success" color="info" className={`sendMain__alert-true ${alertType ? 'active' : ''}`}>
                        {alertMessage}
                    </Alert>
                </ThemeProvider>
            </div>    
            <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
                <LoadingModal />
            </div>
        </div>
    )
}
