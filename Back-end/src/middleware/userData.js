import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let ver = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let user = store.users.find(user => user.user_data.username === req.body.userName);
      let subscribers = [];
      let settPage = {
        youFriends: false,
        youPage: false
      };
      store.users.forEach(user => {
        user.user_data.friends.forEach(friend => {
          if(friend === req.body.userName) {
            subscribers = [...subscribers, friend]
          }
        });
      });
      ver.user_data.friends.forEach(friend => {
        if (friend === req.body.userName) {
          settPage.youFriends = true
        }
      })
      if(!Boolean(user)) {
        res.send('error');
      } else {
        if(ver.user_data.username === user.user_data.username) {
          settPage.youPage = true;
        }
        let user_data = {
          username: user.user_data.username,
          email: user.user_data.email,
          avatar: user.user_data.avatar,
          friends: user.user_data.friends,
          posts: user.posts.sort((a, b) => b.date - a.date),
          subscribers,
          resolveAvatar: user.user_data.resolveAvatar
        }
        if(ver) res.send({user_data, settPage});
        if(!ver) res.send('The token is not verify')
      }
    }
  })
}
