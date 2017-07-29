import { connect } from 'react-redux';

import PhotoGrid from '../components/PhotoGrid';
import { increment, getPosts } from '../action';

function mapStateToProps(state) {
  return {
    photoList: state.posts,
    user: state.user_data,
    likes: state.likes,
    commentsList: state.commentsList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    incrementLike: id => dispatch(increment(id)),
    getPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGrid);
