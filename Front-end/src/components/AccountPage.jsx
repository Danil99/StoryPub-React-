import React from 'react';
import { Link } from 'react-router-dom';

import { userData, deleteOrAddFriends, onAddPost, onDeletePost } from './request';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      myPage: {},
      youFriends: false,
      addPost: false,
      image: false,
      deleteId: '',
      onDelete: false
    }
  }

  componentWillUnmount() {
    this.setState({user: {}})
  }

  onDeleteOrAddFriends(action) {
    deleteOrAddFriends(action, this.props.user)
    .then(res => {
      if(res !== 'The token is not verify') {
        this.setState({youFriends: res.youFriends, user: {...this.state.user, subscribers: res.subscribers}})
      } else {
        localStorage.removeItem('jwtToken');
        window.location.href = "/";
      }
    })
  }

  renderFriends() {
    if(this.state.youFriends) {
      return (
        <button onClick={() => this.onDeleteOrAddFriends('delete')}>Удалить из друзей</button>
      )
    } else {
      return (
        <button onClick={() => this.onDeleteOrAddFriends('add')}>Добавить в друзья</button>
      )
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let img = this.refs.fileInput.files[0];
    let text = this.refs.descr.value;
    if(Boolean(img) && text !== '') {
      let formData = new FormData();
      formData.append('image', img);
      formData.append('text', text);
      formData.append('token', localStorage.jwtToken);

      onAddPost(formData)
        .then(res =>  {
          this.setState({addPost: false});
          userData(this.props.user)
            .then(res => {
              if(res === 'The token is not verify') {
                localStorage.removeItem('jwtToken');
                window.location.href = "/";
              } else if(res === 'error') {
                window.location.href = "/";
              } else {
                this.props.getPosts();
                this.setState({user: res.user_data})
              }
            })
        })
    }
  }

  handleChangeInput(event) {
    let file = event.target.files[0];
    let img = document.getElementById('image');
    let reader = new FileReader();
    reader.onload = e => img.src = e.target.result;
    reader.readAsDataURL(file);
    this.setState({image: true})
  }

  addPost() {
    return (
      <div className="add-post-card">
        <div className="close">
          <i onClick={() => this.setState({addPost: false})} className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="add-post-form">
          <div className="post">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label className={this.state.image ? "" : "noshow-i"}>
                <span className={this.state.image ? "" : "add-text"}>Add image</span>
                <img className={this.state.image ? "images show" : "images"} id="image" src="" alt="Alt" />
                <input
                  type="file"
                  ref="fileInput"
                  accept='image/png, image/jpeg'
                  onChange={this.handleChangeInput.bind(this)}
                />
              </label>
              <div className="text-input">
                <textarea ref="descr" type="text" placeholder="Descr..." />
              </div>
              <div className="button">
                <input type="submit" value="Добавить публикацию" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  deletePost() {
    onDeletePost(this.state.deleteId)
      .then(res => {
        this.setState({user: res, onDelete: false, deleteId: ''});
      })
  }

  render() {
    userData(this.props.user)
      .then(res => {
        if(res === 'The token is not verify') {
          localStorage.removeItem('jwtToken');
          window.location.href = "/";
        } else if(res === 'error') {
          window.location.href = "/";
        } else {
          if(this.state.user.username !== res.user_data.username) {
            this.setState({user: res.user_data, myPage: res.settPage.youPage, youFriends: res.settPage.youFriends})
          }
        }
      })
    if(this.state.user.username !== undefined) {
      let user = this.state.user;
      return (
        <section className="account">
          <div className={`mid-layer ${this.state.addPost || this.state.onDelete ? 'show' : ''}`}></div>
          {
            this.state.addPost ?
              this.addPost()
                :
                  false
          }
          <div className="header">
            {
              this.state.myPage ?
                <div className={`delete-post ${this.state.onDelete ? 'show' : ''}`}>
                  <span>Вы действительно хотите удалить данную публикацию?</span>
                  <button onClick={this.deletePost.bind(this)}>Да</button>
                  <button onClick={() => this.setState({onDelete: false, deleteId: ''})}>Нет</button>
                </div>
                  :
                    false
            }
            <div className="user-image">
              <img className={user.resolveAvatar ? 'res' : ''} src={user.avatar} alt="Alt" />
            </div>
            <div className="user-info">
              <div className="user-name">
                <span>{user.username}</span>
                {
                  this.state.myPage ?
                    <div>
                      <Link to="/settings">Редактировать профиль</Link>
                      <a onClick={() => localStorage.removeItem('jwtToken')} href="/">Выйти</a>
                    </div>
                    :
                      this.renderFriends()
                }
              </div>
              <div className="user-number">
                <ul>
                  <li><span>{user.posts.length}</span> {user.posts.length === 0 ? 'публикаций' : user.posts.length === 1 ? 'публикация' : user.posts.length <= 4 ? 'публикации' : 'публикаций' }</li>
                  <li><span>{user.subscribers.length}</span> {user.subscribers.length === 0 ? 'подписчиков' : user.subscribers.length === 1 ? 'подписчик' : user.subscribers.length <= 4 ? 'подписчика' : 'подписчиков' }</li>
                  <li>Друзья: <span>{user.friends.length}</span></li>
                </ul>
              </div>
              <div className="soc">
                <span>The random text</span>
              </div>
            </div>
          </div>
          {
            this.state.myPage ?
              <div className="add-post">
                <div onClick={() => this.setState({addPost: true})}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  <span>Добавить публикацию</span>
                </div>
              </div>
                :
                  false
          }
          <div className="post-list">
            {
              user.posts.map((post, i) => {
                if(Boolean(this.props.commentsList) && Boolean(this.props.likes)) {
                  let commentFind = this.props.commentsList.find(comm => comm.id === post.id);
                  let likes = this.props.likes.find(like => like.id === post.id);
                  if(Boolean(likes) && Boolean(commentFind)) {
                    return (
                      <div className="post" key={i}>
                        <img src={post.image} alt="Alt" />
                        {
                          this.state.myPage ?
                            <div className="delete" onClick={() => this.setState({onDelete: true, deleteId: post.id})}>
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </div>
                              :
                                false
                        }
                        <Link to={`/view/${post.id}`} className="up-layer">
                          <div className="active-wrap">
                            <div className="likes">
                              <i className="fa fa-heart" aria-hidden="true"></i>
                              <span>{likes.users.length}</span>
                            </div>
                            <div className="comment">
                              <i className="fa fa-comment" aria-hidden="true"></i>
                              <span>{commentFind.comments.length}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  } else return null;
                } else return null;
              })
            }
          </div>
        </section>
      )
    } else return null;
  }
}

export default AccountPage;
