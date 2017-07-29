import { connect } from 'react-redux';

import { increment, addComment, deleteComment } from '../action';

import PersonalPage from '../components/PersonalPage';

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts,
    postId: ownProps.match.params.title,
    user: state.user_data,
    likes: state.likes,
    commentsList: state.commentsList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    incrementLike: id => dispatch(increment(id)),
    addComment: (comment, id) => dispatch(addComment(comment, id)),
    deleteComment: (id, i) => dispatch(deleteComment(id, i))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage);
