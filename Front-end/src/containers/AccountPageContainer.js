import { connect } from 'react-redux';

import AccountPage from '../components/AccountPage';
import { getPosts, deletePost } from '../action';

function mapStateToProps(state, ownProps) {
  return {
    user: ownProps.match.params.user,
    likes: state.likes,
    commentsList: state.commentsList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
