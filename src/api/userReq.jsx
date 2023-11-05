import axios from 'axios'

const apiLink = 'https://a15a-31-28-113-222.ngrok-free.app/api/Wallet/'
const b = sessionStorage.getItem('auth-token')
const POST = async (link, data) => {
    try {
        const response = await axios.post(apiLink + link, data, {
            headers: {
                'auth-token': b,
                'ngrok-skip-browser-warning': 'any',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.data;
    } catch (error) {
        return error
    }
}

async function GET(link, params) {
    let с = params === undefined ? '' : '?' + params;
    try {
        let a = await axios.get(apiLink + link + с, {
            headers: {
              'auth-token': b,
              'ngrok-skip-browser-warning': 'any',
              'Access-Control-Allow-Origin': '*'
            }
          })
        return a.data;
    } catch (error) {
        return error
    }
  }

export function getMainUser() {
    return GET('getWallets')
}

export function getWallet(currency) {
    return GET(`${currency}/getWallet`)
}

export function getTransactions(currency, page) {
    return GET(`${currency}/getTransactions`, "page=" + page)
}

export function Withdraw(currency, formData) {
    return POST(`${currency}/withdraw`, formData)
} 
