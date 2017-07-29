import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let user = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let posts = user.posts;
      user.user_data.friends.forEach(friend => {
        store.users.forEach(user => {
          if(friend === user.user_data.username) {
            posts = posts.concat(user.posts);
          }
        })
      })
      posts.sort((a, b) => b.date - a.date);
      let user_data = {
        username: user.user_data.username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends,
        resolveAvatar: user.user_data.resolveAvatar
      }
      if(user) res.send({user_data, posts, likes: store.likes, commentsList: store.commentsList});
      if(!user) res.send('The token is not verify')
    }
  })
}
