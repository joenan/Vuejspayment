import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `http://localhost:8585/paymentmanager/resources/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})
