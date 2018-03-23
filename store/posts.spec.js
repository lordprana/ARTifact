/* global describe beforeEach afterEach it */
import {expect} from 'chai';
import {fetchPosts, addPost, editPost, removePost} from './posts';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import backEndAddress from './index';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Thunk creators:', () => {
  let store;
  let mockAxios;

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('fetchPosts', () => {
    it('fetches all Posts data', () => {
      const fakePosts = [{
        subjectLine: 'Fake Post',
        content: 'Whats good fam!',
        votes: 5
      }, {
        subjectLine: 'Another Post',
        content: 'Squad Squad',
        votes: 12
      }];
      mockAxios.onGet(backEndAddress + '/api/posts').replyOnce(200, fakePosts);
      return store.dispatch(fetchPosts())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_POSTS');
          expect(actions[0].posts).to.be.deep.equal(fakePosts);
        });
    });
  });

  describe('addPost', () => {
    it('adds a Post to the store', () => {
      const fakePost = {
        subjectLine: 'NewFake Post',
        content: 'BLAHHHH',
        votes: 9
      };
      mockAxios.onPost(backEndAddress + '/api/posts').replyOnce(200, fakePost);
      return store.dispatch(addPost())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('CREATE_POST');
          expect(actions[0].post).to.be.deep.equal(fakePost);
        });
    });
  });

  describe('updatePost', () => {
    it('updates a Post in store', () => {
      const fakePost = {
        subjectLine: 'NewFake Cat',
        content: 'KITTY!',
        votes: 2000
      };
      mockAxios.onPut(backEndAddress + '/api/posts/1').replyOnce(200, fakePost);
      return store.dispatch(editPost(fakePost, 1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('UPDATE_POST');
          expect(actions[0].post).to.be.deep.equal(fakePost);
        });
    });
  });

  describe('removePost', () => {
    it('deletes a Post from store', () => {
      mockAxios.onDelete(backEndAddress + '/api/posts/1').replyOnce(200);
      return store.dispatch(removePost(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('DELETE_POST');
        });
    });
  });
});
