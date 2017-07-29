import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let ver = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let user = store.users.find(user => user.user_data.username === req.body.username);
      let youFriends = false;
      let subscribers = [];
      let arr = ver.user_data.friends;

      if(req.body.action === 'delete') {
        arr.splice(arr.indexOf(req.body.username), 1);
      } else if(req.body.action === 'add') {
        arr.push(req.body.username);
        youFriends = true;
      }

      store.users.forEach(user => {
        user.user_data.friends.forEach(friend => {
          if(friend === req.body.username) {
            subscribers = [...subscribers, friend]
          }
        });
      });

      if(ver) res.send({youFriends, subscribers});
      if(!ver) res.send('The token is not verify')
    }
  })
}
