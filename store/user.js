import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { backEndAddress } from '../config';

const setAxiosHeaders = uuid => {axios.defaults.headers.common.Authorization = `Bearer ${uuid}`};
const hasHeaders = () => axios.defaults.headers.common.Authorization.startsWith('Bearer');

const STOCK_UUID = 'STOCK_UUID';
const STOCK_USER_INFO = 'STOCK_USER_INFO';
// const STOCK_SAVED_PIECES = 'STOCK_SAVED_PIECES'
const ADD_PIECE = 'ADD_PIECE';
const REMOVE_PIECE = 'REMOVE_PIECE';

const stockUuid = uuid => {
  setAxiosHeaders(uuid);
  return {
    type: STOCK_UUID,
    uuid,
  };
};

export const stockUserInfo = info => ({
  type: STOCK_USER_INFO,
  info,
});

// const stockSavedPieces = pieces => ({
//   type: STOCK_SAVED_PIECES,
//   pieces,
// })

const addPiece = piece => ({
  type: ADD_PIECE,
  piece,
})

const removePiece = piece => ({
  type: REMOVE_PIECE,
  piece,
})

// export const getSavedPieces = () =>
//   dispatch => {
//   if (!hasHeaders()) return console.error('auth header not set')
//   axios.get(`${backEndAddress}/api/users/my-pieces`)
//   .then(res => res.data)
//   .then(pieces => {
//     console.log('pieces are:', pieces)
//     dispatch(stockSavedPieces(pieces))
//   })
// }

export const postSavedPiece = piece =>
  dispatch => {
    if (!hasHeaders()) return console.error('auth header not set')
    axios.get(`${backEndAddress}/api/users/add-piece`, piece)
  .then(res => res.data)
  .then(pieceInDb => dispatch(addPiece(pieceInDb)))
  }

export const getUuidFromStorage = () =>
  dispatch =>
    AsyncStorage.getItem('uuid')
    .then(uuid => {
      if (uuid) {
        return dispatch(stockUuid(uuid));
      } else {
        return null;
      }
    })
    .catch(() => null);

export const setUuid = uuid =>
  dispatch => {
    AsyncStorage.setItem('uuid', uuid)
    .then(() => {
      dispatch(stockUuid(uuid));
    })
    .catch(err => console.log(`can't set AsyncStorage`, err));
  };

export const getUserInfo = () =>
  dispatch => {
    if (!hasHeaders()) return console.error('auth header not set');
    return axios.get(`${backEndAddress}/api/users/me`)
    .then(res => res.data)
    .then(info => dispatch(stockUserInfo(info)))
    .catch(() => dispatch(setUuid('')));
  };

export const loginWithToken = token =>
  dispatch =>
    axios.post(`${backEndAddress}/auth/facebook`, { token })
    .then(res => res.data)
    .then(info => {
      dispatch(setUuid(info.uuid));
      dispatch(stockUserInfo(info));
    });


const initialState = {
  id: null,
  facebookId: null,
  uuid: null,
  name: null,
  email: null,
  pictureUrl: null,
  pieces: [],
};

const userReducer = (state = initialState, action) => {

  switch (action.type) {

    case STOCK_UUID:
      return {
        ...state,
        uuid: action.uuid,
      };

    case STOCK_USER_INFO:
      return {
        ...state,
        id: action.info.id,
        name: action.info.userName,
        email: action.info.email,
        pictureUrl: action.info.facebookPicUrl,
        facebookId: action.info.facebookId,
        pieces: action.info.pieces
      };

    // case STOCK_SAVED_PIECES:
    //   return {
    //     ...state,
    //     pieces: action.pieces,
    //   }

    case ADD_PIECE:
    return {
      ...state,
      pieces: [...state.pieces, action.piece],
    }

    default:
      return state;
  }
};

export default userReducer;
