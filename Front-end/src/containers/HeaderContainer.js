import { connect } from 'react-redux';

import Header from '../components/Header';

function mapStateToProps(state) {
  return {
    user: state.user_data
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, null)(Header);
