import React from 'react';
import { Link } from 'react-router-dom';

import { searchQuery } from '../components/request';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchName: [],
      searchVal: false
    }
  }

  handleChange(event) {
    this.setState({searchName: []});
    if(event.target.value !== '') {
      this.setState({searchVal: true});
      searchQuery(event.target.value.toLowerCase())
        .then(res => {
        if(res !== 'The token is not verify') {
          this.setState({searchName: res});
        } else {
          localStorage.removeItem('jwtToken');
          window.location.href = "/";
        }
      })
    } else this.setState({searchVal: false});
  }

  searchUser() {
    return (
      <div className="search-user">
        {
          this.state.searchName.map((user, i) => {
            return (
              <Link to={`/${user.username}`} key={i} className="user-item">
                <div className="user-info">
                  <img src={user.avatar} alt="Alt" />
                  <div className="text">
                    <span>{user.username}</span>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className="search">
        <input type="text" className={this.state.searchVal ? "search" : ""} onChange={this.handleChange.bind(this)} placeholder="Search" />
        {
          this.state.searchName.length < 1 ?
            false
              : this.searchUser()
        }
      </div>
    )
  }
}

export default Search;
