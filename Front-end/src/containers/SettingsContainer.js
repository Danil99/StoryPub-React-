import { connect } from 'react-redux';

import Settings from '../components/Settings';
import { editSettings, changeAvatar } from '../action';

function mapStateToProps(state) {
  return {
    user: state.user_data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editSettings: (username, email) => dispatch(editSettings(username, email)),
    changeAvatar: formData => dispatch(changeAvatar(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
