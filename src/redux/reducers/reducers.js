const initialState = {
  newItem: null,
  newItemTrans: {
    items: [

    ]
  },
  newItemHistory: [],
  newItemUser: [],
  newItemWallet: [],
  isOpen: false,
  currency: '',
  qrValue: '',
  addressInput: '',
  newMaxValue: null,
  currentPage: 1,
  currentPageCurrency: 1,
  alertType: false,
  alertErrorType: false,
  arbitrationItems: [],
  currentPageHistory: 1,
  orderItems: [],
  currentPageOrder: 1,
  shopsItems: [],
  currentPageShops: 1,
};



const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEW_ITEM':
      return {
        ...state,
        newItem: action.payload
      };
    case 'SET_NEW_ITEM_TRANS':
      return {
        ...state,
        newItemTrans: action.payload
      };
    case 'SET_NEW_ITEM_HISTORY':
      return {
        ...state,
        newItemHistory: action.payload
      }
    case 'SET_NEW_ITEM_USER':
      return {
        ...state,
        newItemUser: action.payload
      }
    case 'SET_MODAL':
      return {
        ...state,
        isOpen: action.payload
      }
    case 'SET_NEW_MAX_VALUE':
      return {
        ...state,
        newMaxValue: action.payload
      }
    case 'SET_NEW_ADDRESS_VALUE':
      return {
        ...state,
        addressInput: action.payload
      }
    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload
      }
    case 'SET_QR_CODE_VALUE':
      return {
        ...state,
        qrValue: action.payload
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_CURRENT_PAGE_HISTORY':
      return {
        ...state,
        currentPageHistory: action.payload
      }
    case 'SET_ALERT_TYPE':
      return {
        ...state,
        alertType: action.payload
      }
    case 'SET_ALERT_ERROR_TYPE':
      return {
        ...state,
        alertErrorType: action.payload
      }
    case 'SET_NEW_ARBITRATION_ITEMS':
      return {
        ...state,
        arbitrationItems: action.payload
      }
    case 'SET_NEW_CURRENY_HISTORY_PAGE':
      return {
        ...state,
        currentPageHistory: action.payload
      }
    case 'SET__CURRENT_PAGE_CURRENCY':
      return {
        ...state,
        currentPageCurrency: action.payload
      }
    case 'SET_NEW_ORDER_ITEMS':
      return {
        ...state,
        orderItems: action.payload
      }
    case "SET_NEW_PAGE_ORDER":
      return {
        ...state,
        currentPageOrder: action.payload
      }
    case "SET_NEW_SHOPS":
      return {
        ...state,
        shopsItems: action.payload
      }
    case "SET_NEW_PAGE_SHOPS":
      return {
        ...state,
        currentPageShops: action.payload
      }
    case "SET_NEW_WALLET":
      return {
        ...state,
        newItemWallet: action.payload
      }
    default:
      return state;
  }
};

export default currencyReducer;
