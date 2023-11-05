import axios from 'axios'

const apiLink = 'https://a15a-31-28-113-222.ngrok-free.app/api'
const b = sessionStorage.getItem('auth-token')
const POST = async (link, params, data) => {
  let c = params === undefined ? ' ' : '?' + params;
  try {
    const response = await axios.post(apiLink + link + c, data, {
      headers: {
        'auth-token': b,
        'ngrok-skip-browser-warning': 'any',
        'Access-Control-Allow-Origin': '*'
      }
    });
    return response.data
  } catch (error) {
    return error
  }
}

const PUT = async (link, params, data) => {
  let c = params === undefined ? ' ' : '?' + params;
  try {
    const response = await axios.put(apiLink + link + c, data, {
      headers: {
        'auth-token': b,
        'ngrok-skip-browser-warning': 'any',
        'Access-Control-Allow-Origin': '*'
      }
    });
    return response.data
  } catch (error) {
    return error
  }
}

async function GET(link, params) {
  let c = params === undefined ? ' ' : '?' + params;
  try {
    let a = await axios.get(apiLink + link + '?' + params, {
      headers: {
        'auth-token': b,
        'ngrok-skip-browser-warning': 'any',
        'Access-Control-Allow-Origin': '*'
      }
    })
    console.log(a.data)
    return a.data;
  } catch (error) {
    return error
  }
}

async function DELETE(link, params) {
  let c = params === undefined ? ' ' : '?' + params;
  try {
    let a = await axios.delete(apiLink + link + '?' + params, {
      headers: {
        'auth-token': b,
        'ngrok-skip-browser-warning': 'any',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    return error
  }
}

export function updateSetting(formData) {
  return PUT('/Shop/updateShop', undefined, formData)
} //good

export function addItem(formData) {
  return POST('/Product/addProduct', undefined, formData)
} //good

export function deleteItem(productId) {
  return DELETE('/Product/removeProduct', 'productId=' + productId)
}

export async function getShop(shopId) {
  return await GET(`/Shop/getShopById`, "id=" + shopId)
} //good

export async function getProducts(shopId) {
  return await GET(`/Product/getProducts`, "shopId=" + shopId)
} //good

export async function updateItem(formData) {
  return await PUT('/Product/editProduct', undefined, formData)
}

// /ne testil
export function putSetting(formData, shopId) {
  return PUT('updateSetting', 'shopId=' + shopId, formData)
}  //good

export function getItemsHistory(type, page, shopId) {
  return GET('ItemsHistory', 'shopId=' + shopId + '&mode=' + type + '&page=' + page)
} //good

export function getSetting(shopId) {
  return GET('setting', 'shopId=' + shopId)
}  //good 

export function postNewItem(formData, shopId) {
  return POST('addNewItem', 'shopId=' + shopId, formData)
} //good 

export function putItem(formData, shopId) {
  return PUT('updateItem', 'shopId=' + shopId, formData)
}

export function getItems(shopId) {
  return GET('sellerItems', 'shopId=' + shopId)
} //good