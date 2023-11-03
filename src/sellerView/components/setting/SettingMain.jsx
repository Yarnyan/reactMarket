import React, { useEffect, useState } from 'react'
import BackBtn from '../../../shopView/components/ui/Button/BackButton'
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoIcon from '@mui/icons-material/Photo';
import { updateSetting } from '../../../api/sellerReq'
import { Alert } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { getShop } from '../../../api/sellerReq'
import { useParams } from 'react-router-dom';
import LoadingModal from '../../../userView/components/ui/loadingModal';
export default function SettingMain() {
    let { shopId } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [storeName, setStoreName] = useState('');
    const [storeDescription, setStoreDescription] = useState('');
    const [isTrueLoader, setIsTrueLoader] = useState(false)
    const [alertType, setAlertType] = useState(false)
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
    const handleFileInput = () => {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
        };
        input.click();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getShop(shopId)
                setStoreName(res.name)
                setStoreDescription(res.description)
                setSelectedFile(res.imageURL)
                setIsTrueLoader(true)
            } catch (error) {
                return error
            }
        }
        fetchData()
    }, []);
    const handleSaveSettings = async () => {
        try {
            showAndHideAlert()
            const formData = new FormData();
            formData.append('name', storeName);
            formData.append('description', storeDescription);
            formData.append('image', selectedFile);
            await updateSetting(formData);
        } catch (error) {
            console.error(error);
        }
    };
    const showAndHideAlert = () => {
        setAlertType(true)
        setTimeout(() => {
            setAlertType(false)
        }, 2000);
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
    // useEffect(() => {
    //     const fetchSettings = async () => {
    //         try {
    //             await getSetting(shopId)
    //         } catch(e) {
    //             console.log(e)
    //         }
    //     }
    //     fetchSettings()
    // }, []);
    return (
        <div className='setting__container'>
            <BackBtn />
            <div className='setting__subtitle'>
                <h1>Settings</h1>
            </div>
            <div className='setting__tools-body'>
                <div className='setting__container-tools'>
                    <div className='setting__tools-name ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter store name..." value={storeName || ''} onChange={(e) => setStoreName(e.target.value)} />
                            <div className="input__search">
                                <StorefrontIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-description ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Enter a description for the store..." value={storeDescription || ''} onChange={(e) => setStoreDescription(e.target.value)} />
                            <div className="input__search">
                                <DescriptionIcon />
                            </div>
                        </div>
                    </div>
                    <div className='setting__tools-file ll'>
                        <div className='input'>
                            <textarea type="text" placeholder="Add a store photo..." value={selectedFile ? selectedFile.name : ''} onClick={handleFileInput} readOnly/>
                            <div className="input__search">
                                <PhotoIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='save__container'>
                <button onClick={handleSaveSettings}>Save settings</button>
                <ThemeProvider theme={theme}>
                    <Alert severity="success" color="info" className={`sendMain__alert-true ${alertType ? 'active' : ''}`}>
                        Settings successfully changed!
                    </Alert>
                </ThemeProvider>
            </div>
            <div className={isTrueLoader === false ? 'loadingModal__container active' : 'loadingModal__container'}>
                <LoadingModal />
            </div>
        </div>
    )
}
