
import axios from 'axios';
import { backEndAddress } from '../config';

const GET_ALL = 'GET_POSTS'
const CREATE_POST = 'CREATE_POST';
const UPDATE_POST = 'UPDATE_POST';
const DELETE_POST = 'DELETE_POST';

export const getPosts = (posts) => {
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
        return axios.get(backEndAddress + '/api/posts')
        .then(res => res.data)
        .then(posts => {
            return dispatch(getPosts(posts))
        })
        .catch(err => console.error('Fetching posts failed', err))
    }
}

export function addPost(post){
    return function thunk(dispatch){
        return axios.post(backEndAddress + '/api/posts', post)
        .then(res => res.data)
        .then(newPost => dispatch(createPost(newPost)))
        .catch(err => console.error(`Creating ${post} unsuccessful`, err))
    }
}

export function editPost(post, id){
    return function thunk(dispatch){
        return axios.put(backEndAddress + `/api/posts/${id}`, post)
        .then(res => res.data)
        .then(updatedPost => dispatch(updatePost(updatedPost)))
        .catch(err => console.error(`Updating Post ${post} unsuccessful`, err))
    }
}

export function removePost(id){
    return function thunk(dispatch){
        return axios.delete(backEndAddress + `/api/posts/${id}`)
        .then(() => {
            return dispatch(deletePost(id))
        })
        .catch(err => console.error(`Failed to delete Post ${id}`, err))
    }
}


export default function reducer(posts = [], action) {
    switch (action.type) {
      case GET_ALL:
        return action.posts;
      case CREATE_POST:
        return [...posts, action.post];
      case UPDATE_POST:
        return posts.map(post => {
          return post.id === action.post.id ? action.post : post
        });
      case DELETE_POST:
        return posts.filter(post => {
            return post.id !== action.id
        });
      default:
        return posts;
    }
  }
