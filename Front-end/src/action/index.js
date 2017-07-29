export const GET_POSTS = 'GET_POSTS';
export const INCREMENT = 'INCREMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_SETTINGS = 'EDIT_SETTINGS';
export const CHANGE_AVATAR = 'CHANGE_AVATAR';

import { onChangeAvatar, verify, incrementLike, onAddComment, onDeleteComment, onEditSettings } from '../components/request';

export function getPosts() {
  return verify().then(res => {
      if(res !== 'The token is not verify') {
        return ({
          type: GET_POSTS,
          state: res
        })
      } else {
        localStorage.removeItem('jwtToken');
        window.location.href = "/";
      }
    })
}

export function editSettings(username, email) {
  return onEditSettings(username, email)
    .then(res => {
      if(res !== 'The token is not verify') {
        if(res.token !== '') {
          localStorage.setItem('jwtToken', res.token);
          location.reload();
        }
        return ({
          type: EDIT_SETTINGS,
          user_data: res.user_data
        })
      } else {
        localStorage.removeItem('jwtToken');
        window.location.href = "/";
      }
    })
}

export function changeAvatar(formData) {
  return onChangeAvatar(formData)
    .then(res => {
      if(res !== 'The token is not verify') {
        return ({
          type: CHANGE_AVATAR,
          user_data: res
        })
      } else {
        localStorage.removeItem('jwtToken');
        window.location.href = "/";
      }
    })
}

export function increment(id) {
  return incrementLike(id)
    .then(res => {
      if(res !== 'The token is not verify') {
        return ({
          type: INCREMENT,
          likes: res.likes
        })
      } else {
        localStorage.removeItem('jwtToken');
        window.location.href = "/";
      }
    })
}

export function addComment(comment, id) {
  return onAddComment(comment, id)
    .then(res => {
      if(res !== 'The token is not verify') {
        return ({
          type: ADD_COMMENT,
          comment: res.comment
        })
      } else {
        localStorage.removeItem('jwtToken');
        window.location.href = "/";
      }
    })
}

export function deleteComment(id, i) {
  return onDeleteComment(id, i)
  .then(res => {
    if(res !== 'The token is not verify') {
      return ({
        type: DELETE_COMMENT,
        comment: res.comment
      })
    } else {
      localStorage.removeItem('jwtToken');
      window.location.href = "/";
    }
  })
}
