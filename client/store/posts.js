import axios from 'axios';
import backEndAddress from './index'

const GET_ALL = 'GET_POSTS'
const CREATE_POST = 'CREATE_POST';
const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';

const getPosts = (posts) => {
    return {
        type: GET_ALL,
        posts
    }
}

const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
}

const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}

export function fetchPosts() {
    return function thunk(dispatch){
        return axios.get('/api/categories')
        .then(res => res.data)
        .then(categories => {
            return dispatch(getCategories(categories))
        })
        .catch(err => console.error('Fetching categories failed', err))
    }
}