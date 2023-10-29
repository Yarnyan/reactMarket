export const setNewItem = (newItem) => {
    return {
        type: 'SET_NEW_ITEM',
        payload: newItem
    };
};

export const setNewItemTrans = (newItemTrans) => {
    return {
        type: 'SET_NEW_ITEM_TRANS',
        payload: newItemTrans
    };
};

export const setNewItemHistoryTrans = (newItemHistory) => {
    return {
        type: 'SET_NEW_ITEM_HISTORY',
        payload: newItemHistory
    }
}

export const setNewItemUser = (newItemUser) => {
    return {
        type: 'SET_NEW_ITEM_USER',
        payload: newItemUser
    }
}

export const setNewModal = (isOpen) => {
    return {
        type: 'SET_MODAL',
        payload: isOpen
    }
}

export const setNewValue = (value) => {
    return {
        type: 'SET_NEW_MAX_VALUE',
        payload: value
    }
}

export const setNewInputValue = (value) => {
    return {
        type: 'SET_NEW_ADDRESS_VALUE',
        paylod: value,
    }
}

export const setNewCurryncy = (value) => {
    return {
        type: 'SET_CURRENCY',
        payload: value
    }
}

export const setNewQrCode = (value) => {
    return {
        type: 'SET_QR_CODE_VALUE',
        payload: value
    }
}

export const setCurrentPageHistory = (items) => {
    return {
        type: 'SET_NEW_ITEM_HISTORY',
        payload: items,
    };
};

export const setCurrentPage = (page) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: page,
    };
};

export const setCurrentPageCurrency = (page) => {
    return {
        type: 'SET__CURRENT_PAGE_CURRENCY',
        payload: page,
    }
}

export const setAlertType = (type) => {
    return {
        type: 'SET_ALERT_TYPE',
        payload: type,
    }
}

export const setAlertErrorType = (type) => {
    return {
        type: 'SET_ALERT_ERROR_TYPE',
        payload: type
    }
}

export const setNewArbitrationItems = (items) => {
    return {
        type: 'SET_NEW_ARBITRATION_ITEMS',
        payload: items
    }
}

export const setNewCurrentHistoryPage = (page) => {
    return {
        type: 'SET_NEW_CURRENY_HISTORY_PAGE',
        payload: page
    }
}

export const setNewOrderItem = (items) => {
    return {
        type: 'SET_NEW_ORDER_ITEMS',
        payload: items
    }
}

export const setNewPageOrder = (page) => {
    return {
        type: 'SET_NEW_PAGE_ORDER',
        payload: page
    }
}

export const setNewShops = (items) => {
    return {
        type: 'SET_NEW_SHOPS',
        payload: items
    }
}
export const setNewPageShops = (page) => {
    return {
        type: 'SET_NEW_PAGE_SHOPS',
        payload: page
    }
}

export const setNewWallet = (wallet) => {
    return {
        type: 'SET_NEW_WALLET',
        payload: wallet
    }
}