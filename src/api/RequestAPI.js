import axios from 'axios'
const requestmainUrlList = 'http://localhost:8080/paymentmanager/resources/requestmain/list/'
const paymentUrlList = 'http://localhost:8080/paymentmanager/resources/vwinvoicesummary/list/'
const itemsUrlList = 'http://localhost:8080/paymentmanager/resources/items/list'
const saveRequestMainUrl = 'http://localhost:8080/paymentmanager/resources/requestmain/create-update'
const subscriberUrlList = 'http://localhost:8080/paymentmanager/resources/subscriber/list/'
const accountUrlList = 'http://localhost:8080/paymentmanager/resources/account/list/'
const savePaymentheaderUrl = 'http://localhost:8080/paymentmanager/resources/paymentheader/create-update'
const requestdetailListbyRequestmainUrl  = 'http://localhost:8080/paymentmanager/resources/requestdetailbymainid/list/'
const deleteRequestMainUrl = 'http://localhost:8080/paymentmanager/resources/requestmain/delete/'
const deleteRequestDetailUrl = 'http://localhost:8080/paymentmanager/resources/requestdetail/delete/'




export const deleteRequestDetail = async (id) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.delete(deleteRequestDetailUrl + id)
        .then(response => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const requestdetailListbyRequestmain = async (id) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(requestdetailListbyRequestmainUrl + id)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }
  return await res()
}

export const deleteRequestmain = async (id) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.delete(deleteRequestMainUrl + id)
        .then(response => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const saveRequestMain = async (comment) => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.post(saveRequestMainUrl, comment)
        .then(response => { resolve(response) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

export const requestapi = async () => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(requestmainUrlList)
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

export const paymentapi = async () => {
  const res = () => {
    return new Promise((resolve, reject) => {
      axios.get(paymentdetailUrlList)
        .then((response) => { resolve(response.data) })
        .catch(e => { reject(e) })
    })
  }

  return await res()
}

// export const savePaymentheader = async () => {
//   const res = (data) => {
//     return new Promise((resolve, reject) => {
//       axios.post(savePaymentheaderUrl, {
//         body: data
//       })
//         .then((response) => { resolve(response.data) })
//         .catch(e => { reject(e) })
//     })
//   }
//
//   return await res()
// }
//
// export const saveRequestMain = async (data) => {
//   const res = (data) => {
//     return new Promise((resolve, reject) => {
//       axios.post(saveRequestMainUrl, {
//         body: data
//       })
//         .then((response) => { resolve(response.data) })
//         .catch(e => { reject(e) })
//     })
//   }
//
//   return await res()
// }

// export { requestapi }
