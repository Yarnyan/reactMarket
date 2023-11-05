import React, { useEffect, useState } from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoIcon from '@mui/icons-material/Photo';
import { addItem } from '../../../api/sellerReq'
import { getCategory } from '../../../api/shopReq'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Alert } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import LoadingModal from '../../../userView/components/ui/loadingModal'
import { Dropdown } from 'primereact/dropdown';
export default function ItemsAdd() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [itemDesciption, setItemDesciption] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [itemInstruction, setItemInstruction] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [allItems, setAllItems] = useState([])
    const [alertType, setAlertType] = useState(false)
    const [alertErrorType, setAlertErrorType] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null);
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
    const handleFileInput = (inputId) => {
        const input = document.createElement('input');
        input.type = 'file';
      
        input.onchange = (event) => {
          const file = event.target.files[0];
          if (inputId === 1) {
            setSelectedFile(file);
          } else if (inputId === 2) {
            setSelectedFile2(file);
          }
        };
        input.click();
      };
    const clearInput = () => {
        setItemName('');
        setSelectedFile(null);
        setItemDesciption('');
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
            if (itemName === '' || selectedFile === null || itemDesciption === '' || itemPrice === '' || itemInstruction === '') {
                showAndHideErrorAlert()
            } else {
                showAndHideAlert()
                formData.append('name', itemName);
                formData.append('image', selectedFile);
                formData.append('description', itemDesciption);
                formData.append('priceUSD', newPrice);
                formData.append('instruction', itemInstruction);
                formData.append('data', selectedFile2);
                const foundCategory = allItems.find((item) => item.name === selectedCategory);
                if (foundCategory) {
                    const categoryId = foundCategory.id;
                    formData.append('categoryId', categoryId);
                    clearInput();
                    console.log(formData, typeof(newPrice))
                    await addItem(formData);
                } else {
                    console.error('Category not found');
                }
            }
        } catch (error) {
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
    const handleItemPriceChange = (e) => {
        const inputValue = e.target.value;

        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(inputValue)) {
            setItemPrice(inputValue);
        }
    };
    return (
        <div className='setting__container' style={{ overflow: isTrueLoader ? 'scroll' : '' }}>
            <BackBtn />
            <div className='setting__subtitle'>
                <h1>Add item</h1>
            </div>
            <div className='setting__tools-body'>
                <div className='setting__container-tools'>
                    <div className='setting__tools-name ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter item name..." value={itemName} onChange={(e) => setItemName(e.target.value)} />
                            <div className="input__search">
                                <StorefrontIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-file ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Add a store photo..." readOnly value={selectedFile ? selectedFile.name : ''} onClick={() => handleFileInput(1)} />
                            <div className="input__search">
                                <PhotoIcon />
                            </div>
                        </div>
                    </div>

                    <div className='setting__tools-description ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter item name description..." value={itemDesciption} onChange={(e) => setItemDesciption(e.target.value)} />
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        <div className='input'>
                            <textarea type="number" placeholder="Enter the cost of the item..." value={itemPrice} onChange={handleItemPriceChange} />
                            <div className="input__search">
                                <AttachMoneyIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter the quantity..." readOnly value={selectedFile2 ? selectedFile2.name : ''} onClick={() => handleFileInput(2)} />
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-price ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter the instructions..." value={itemInstruction} onChange={(e) => setItemInstruction(e.target.value)} />
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
            <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
                <LoadingModal />
            </div>
        </div>
    )
}

