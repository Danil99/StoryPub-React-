import React from 'react';

import { Link } from 'react-router-dom';

class PhotoGrid extends React.Component {
  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    if(!this.props.photoList) {
      return null;
    } else return (
      <section className="image-grid">
        {
          this.props.photoList.map(post => {
            let likes = this.props.likes.find(like => like.id === post.id);
            let commentFind = this.props.commentsList.find(comm => comm.id === post.id);
            return (
              <div className="photo-item" key={post.id}>
                <div className="author-post">
                  <Link to={`/${post.author_post.username}`}>
                    <div className="image">
                      <img className={this.props.user.resolveAvatar ? 'res' : ''} src={post.author_post.avatar} />
                    </div>
                    {post.author_post.username}
                  </Link>
                </div>
                <div className="images">
                  <img src={post.image} alt="Alt" />
                </div>
                <div className="title">
                  <h1><Link to={`/view/${post.id}`}>{post.title}</Link></h1>
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
            )
          })
        }
      </section>
    )
  }
}

export default PhotoGrid;
