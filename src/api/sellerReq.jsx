import axios from 'axios'

const apiLink = 'https://ef50-31-28-113-222.ngrok-free.app/'

const POST = async (link, data) => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data, {
          headers: {
              'authKey': '',
              'ngrok-skip-browser-warning': '',
              'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(response.data);
      } catch (error) {
        // console.error(error);
      }
}

const PUT = async (link, params, data) => {
  try {
    const response = await axios.put('https://jsonplaceholder.typicode.com/posts' + link + '?' + params, data, {
      headers: {
          'authKey': '',
          'ngrok-skip-browser-warning': '',
          'Access-Control-Allow-Origin': '*'
        }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function GET(link, params) {
  let a = await axios.get(apiLink + link + '?' + params, {
      headers: {
        'authKey': '',
        'ngrok-skip-browser-warning': '',
        'Access-Control-Allow-Origin': '*'
      }
    })
  console.log(a.data)
  return a.data;
}

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

export function putItem (formData, shopId) {
  return PUT('updateItem', 'shopId=' + shopId, formData)
} 

export function getItems(shopId) {
  return GET('sellerItems', 'shopId=' + shopId)
} //good