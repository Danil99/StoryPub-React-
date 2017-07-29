import jwt from 'jsonwebtoken';
import config from './config.js';
import fs from 'fs';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let user = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let subscribers = []

      let post = user.posts.find(post => post.id === req.body.id);
      // if(post) {
      //   fs.unlink(post.serverPath, function (err) {
      //     if(err) console.log(err);
      //   })
      // }
      user.posts = user.posts.filter(post => post.id !== req.body.id);

      store.commentsList = store.commentsList.filter(comm => comm.id !== req.body.id);
      store.likes = store.likes.filter(like => like.id !== req.body.id);

      store.users.forEach(user => {
        user.user_data.friends.forEach(friend => {
          if(friend === req.body.userName) {
            subscribers = [...subscribers, friend]
          }
        });
      });

      let user_data = {
        username: user.user_data.username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends,
        posts: user.posts.sort((a, b) => b.date - a.date),
        subscribers
      }

      if(user) res.send(user_data);
      if(!user) res.send('The token is not verify')
    }
  })
}
