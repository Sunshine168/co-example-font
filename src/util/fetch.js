import Cookies from 'js-cookie'
import { notification } from 'antd'
import { emitter } from './'

const csrftoken = Cookies.get('csrfToken')

const HOST = '/'

function myFetch(url, data) {
  const header = {
    'Content-Type': 'application/json',
    'x-csrf-token': csrftoken,
  }
  const bodyData = {
    timestamp: new Date().getTime(),
    data,
  }
  return fetch(`${url}`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(bodyData),
    credentials: 'same-origin',
  })
    .then((res) => {
      if (res && res.status === 200) {
        return res.text()
      }
      throw new Error('NETWORK_ERROR')
    })
    .then((text) => {
      const res = JSON.parse(text)
      return { res }
    })
    .catch((err) => {
      return { err }
    })
}

function postErrorHandler(err) {
  // error handle
  let config = {}
  if (typeof err === 'string') {
    config.message = err
  }
  if (typeof err === 'object') {
    config = err
  }
  notification.error(config)
}

async function post(url, data) {
  const result = await myFetch(url, data)
  console.log(result)
  let { res, err } = result
  console.log(err)
  if (err) {
    postErrorHandler('网络错误')
    return new Promise((resolve, reject) => {
      return reject(err)
    })
  }
  // 预留处理外层code错误
  const { resCode, message, data: resData } = res
  if (resCode === 500) {
    postErrorHandler(message)
    err = null
  } else if (resCode === 200) {
    err = null
  } else if (resCode === 401) {
    // toast('身份角色错误，需要重新登录', TOAST_ERROR)
    emitter.emit('NAVIGATION_NAVIGATE_TO', 'Login')
    err = message
  }
  return new Promise((resolve) => {
    return resolve(resData)
  })
}

export default post
