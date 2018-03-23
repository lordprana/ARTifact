import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { backEndAddress } from '../config'

const setAxiosHeaders = uuid => {axios.defaults.headers.common.Authorization = `Bearer ${uuid}`}

const STOCK_UUID = 'STOCK_UUID'
const STOCK_USER_INFO = 'STOCK_USER_INFO'

const stockUuid = uuid => {
  setAxiosHeaders(uuid)
  return {
    type: STOCK_UUID,
    uuid,
  }
}

export const stockUserInfo = info => ({
  type: STOCK_USER_INFO,
  info,
})

export const getUuidFromStorage = () =>
  dispatch =>
    AsyncStorage.getItem('uuid')
    .then(uuid => {
      if (uuid) {
        return dispatch(stockUuid(uuid))
      } else {
        return null
      }
    })
    .catch(() => null)

export const setUuid = uuid =>
  dispatch => {
    AsyncStorage.setItem('uuid', uuid)
    .then(() => {
      dispatch(stockUuid(uuid))
    })
    .catch(err => console.log(`can't set AsyncStorage`, err))
  }

export const getUserInfo = () =>
  dispatch => {
    if (!axios.defaults.headers.common.Authorization.startsWith('Bearer')) {
      console.error('auth header not set')
    }
    return axios.get(`${backEndAddress}/api/users/me`)
    .then(res => res.data)
    .then(info => dispatch(stockUserInfo(info)))
  }

export const loginWithToken = token =>
  dispatch =>
    axios.post(`${backEndAddress}/auth/facebook`, { token })
    .then(res => res.data)
    .then(info => {
      dispatch(setUuid(info.uuid))
      dispatch(stockUserInfo(info))
    })


const initialState = {
  id: null,
  facebookId: null,
  uuid: null,
  name: null,
  email: null,
  pictureUrl: null,
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {

    case STOCK_UUID:
      return {
        ...state,
        uuid: action.uuid,
      }

    case STOCK_USER_INFO:
      return {
        ...state,
        id: action.info.id,
        name: action.info.userName,
        email: action.info.email,
        pictureUrl: action.info.facebookPicUrl,
        facebookId: action.info.facebookId,
      }

    default:
      return state
  }
}

export default userReducer
