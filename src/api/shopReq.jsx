import axios from 'axios'

const apiLink = 'https://d7eb-31-28-113-222.ngrok-free.app/api/'
const b = sessionStorage.getItem('auth-token')

async function GET(link, params) {
  let c = params === undefined ? ' ' : '?' + params;
  try {
    let a = await axios.get(apiLink + link + c, {
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
const POST = async (link, data) => {
  try {
      const response = await axios.post(apiLink + link, data, {
          headers: {
              'auth-token': b,
              'ngrok-skip-browser-warning': 'any',
              'Access-Control-Allow-Origin': '*'
          }
      });
      console.log(response)
      return response;
  } catch (error) {
      return error;
  }
}

export function AddShop(formData, shopName, shopDescription) {
  return POST(`create`, "name=" + shopName + "&description=" + shopDescription, formData)
} //good

export async function buyProducts(currency, formData) {
  return await POST(`Product/buyProducts`, formData)
} //good

export function getCategory() {
  return GET('Category/getCategories')
} //good

export async function getShop(shopId) {
  return await GET(`shop/getById`, "id=" + shopId)
} //good

export async function getProducts(shopId, category) {
  return await GET(`Product/getProducts`, "shopId=" + shopId + "&categoryId=" + category)
}

export function GetItems(category, shopId) {
  return GET('Items', 'category=' + category + '&shopId=' + shopId)
}

export function getHome(shopId) {
  return GET('Home', '&shopId=' + shopId)
}
export function getReviews(name, shopId, page) {
  return GET('Reviews',  'mode=' + name + '&shopId=' + shopId + '&page=' + page)
} 

export function getReviewsAll(name, shopId, page) {
  return GET('ReviewsStatistics',  'mode=' + name + '&shopId=' + shopId + '&page=' + page)
} 

export function postBasket(shopId, formData) {
  return POST('createOrder', 'shopId=' + shopId, formData)
}

