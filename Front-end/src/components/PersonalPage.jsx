import React from 'react';

import { Link } from 'react-router-dom';

class PersonalPage extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const comment = this.refs.comment.value;
    const id = this.props.postId;
    if(comment !== '') {
      this.props.addComment(comment, id);
      this.refs.commentForm.reset();
    }
  }

  renderComment(comm, i) {
    return (
      <div className="comment" key={i}>
        <span><Link to={`/${comm.author}`}>{comm.author}</Link>{comm.comment}</span>
        <i onClick={() => this.props.deleteComment(this.props.postId, i)} className={`fa fa-times${this.props.user.username === comm.author ? '' : 'hidd'}`} aria-hidden="true"></i>
      </div>
    )
  }

  render() {
    let post = this.props.post;
    if(!post) {
      return null;
    } else {
      post = post.find(post => post.id === this.props.postId);
      let likes = this.props.likes.find(like => like.id === post.id);
      let commentFind = this.props.commentsList.find(comm => comm.id === post.id);
      if(Boolean(post)) {
        return (
          <section className="personalPage">
            <div className="photo-item" key={post.id}>
              <div className="author-post">
                <a className="image" href="/">
                  <img src={post.author_post.avatar} />
                </a>
                <Link to={`/${post.author_post.username}`}>{post.author_post.username}</Link>
              </div>
              <div className="images">
                <img src={post.image} alt="Alt" />
              </div>
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="active-wrap">
                <div className="likes">
                  <i onClick={() => this.props.incrementLike(post.id)}
                    className={likes.users.indexOf(this.props.user.username) !== -1 ? "fa fa-heart" : "fa fa-heart-o"} aria-hidden="true">
                  </i>
                  <span>{likes.users.length}</span>
                </div>
                <div className="comment">
                  <i className="fa fa-comment-o" aria-hidden="true"></i>
                  <span>{commentFind.comments.length}</span>
                </div>
              </div>
            </div>
            <div className="comments">
              {
                commentFind.comments.map((comm, i) => this.renderComment(comm, i))
              }
              <form ref="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <input ref="comment" type="text" placeholder="comment" />
                <input type="submit" hidden></input>
              </form>
            </div>
          </section>
        )
      } else window.location.href = "/";
    }
  }
}

export default PersonalPage;
