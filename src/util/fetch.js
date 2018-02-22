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
  let { res, err } = result
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
    return new Promise((resolve, reject) => {
      return reject()
    })
  } else if (resCode === 200) {
    err = null
  } else if (resCode === 401) {
    emitter.emit('USER_IS_INVALID')
    err = message
  } else if (resCode === 403) {
    // 请勿重复登录
  }
  return new Promise((resolve) => {
    return resolve(resData)
  })
}

export default post
