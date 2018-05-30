import axios from 'axios'
const paymentUrlList = 'http://localhost:8080/paymentmanager/resources/vwinvoicesummary/list/'
const itemsUrlList = 'http://localhost:8080/paymentmanager/resources/items/list'
const subscriberUrlList = 'http://localhost:8080/paymentmanager/resources/subscriber/list/'
const accountUrlList = 'http://localhost:8080/paymentmanager/resources/account/list/'
const savePaymentheaderUrl = 'http://localhost:8080/paymentmanager/resources/paymentheader/create-update'
const deletePaymentHeaderUrl = 'http://localhost:8080/paymentmanager/resources/paymentheader/delete/'
const paymentheaderReceiptUrl = 'http://localhost:8080/paymentmanager/resources/paymentheader/receipt/?id='
const paymentdetailUrlList = 'http://localhost:8080/paymentmanager/resources/paymentdetail/list/'
const paymentdetailListbyPaymentheaderUrlList = 'http://localhost:8080/paymentmanager/resources/paymentdetail/filter/?id='

export const paymentheaderReceipt = async (id) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(paymentheaderReceiptUrl + id)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const deletePaymentHeader = async (id) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.delete(deletePaymentHeaderUrl + id)
        .then(response => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }
  return await res()
}

export const savePaymentheader = async (comment) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.post(savePaymentheaderUrl, comment)
        .then(response => { resolve(response) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const accountList = async () => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(accountUrlList)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const paymentList = async () => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(paymentUrlList)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const subscriberList = async () => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(subscriberUrlList)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const itemlistapi = async () => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(itemsUrlList)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const paymentdetaillistapi = async (id) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(paymentdetailUrlList + id)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const paymentdetailListbyPaymentheader = async (id) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(paymentdetailListbyPaymentheaderUrlList + id)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}
