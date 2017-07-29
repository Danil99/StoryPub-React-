import React from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';

class Header extends React.Component {
  render() {
    let user = this.props.user;
    if(Boolean(user)) {
      return (
        <header>
          <div className="head">
            <h1><Link to="/">StoryPub</Link></h1>

            <Search />

            <div className="user-profile">
              <Link to={`/${user.username}`}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </header>
      )
    } else return null;
  }
}

export default Header;
