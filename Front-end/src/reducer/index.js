import { CHANGE_AVATAR, GET_POSTS, INCREMENT, ADD_COMMENT, DELETE_COMMENT, EDIT_SETTINGS } from '../action'

function reducer(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.state

    case INCREMENT:
      return {...state, likes: action.likes}

    case ADD_COMMENT:
      return {...state, commentsList: action.comment}

    case DELETE_COMMENT:
      return {...state, commentsList: action.comment}

    case EDIT_SETTINGS:
      return {...state, user_data: action.user_data}

    case CHANGE_AVATAR:
      return {...state, user_data: action.user_data}

    default:
      return state;
  }
}

export default reducer;
