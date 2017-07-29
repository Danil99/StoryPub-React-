import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let user = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let username = user.user_data.username;
      let posts = user.posts;

      let postLike = store.likes.find(like => like.id === req.body.id);
      let likeUsers = postLike.users;
      let index = likeUsers.indexOf(username);
      if(index !== -1) likeUsers.splice(likeUsers.indexOf(username), 1);
      if(index === -1) likeUsers.push(username);

      user.user_data.friends.forEach(friend => {
        store.users.forEach(user => {
          if(friend === username) {
            posts = posts.concat(user.posts);
          }
        })
      })
      posts.sort((a, b) => a.date - b.date);

      let user_data = {
        username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends
      }

      if(user) res.send({likes: store.likes});
      if(!user) res.send('The token is not verify')
    }
  })
}
