import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let user = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let token = '';
      let username = user.user_data.username;

      if(username !== req.body.username) {
        store.likes.map(like => {
          let index = like.users.indexOf(username);
          if(index !== -1) like.users.push(req.body.username);
          like.users = like.users.filter(likeUser => likeUser !== username);
        })

        store.commentsList.forEach(post => {
          post.comments.forEach(comm => {
            if(comm.author === username) {
              comm.author = req.body.username;
            }
          })
        })

        store.users.map(fr => {
          if(fr.user_data.username !== username) {
            let index = fr.user_data.friends.indexOf(username)
            if(index !== -1) fr.user_data.friends.push(req.body.username);
            fr.user_data.friends = fr.user_data.friends.filter(friend => friend !== username);
          }
        })

        user.posts.forEach(post => {
          post.author_post.username = req.body.username;
        })

        user.user_data.username = req.body.username;
        token = jwt.sign({username: user.user_data.username, password: user.user_data.password}, config.jwtSecret);
      }

      if(user.user_data.email !== req.body.email) {
        user.user_data.email = req.body.email;
      }

      let user_data = {
        username: user.user_data.username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends
      }
      if(user) res.send({user_data, token});
      if(!user) res.send('The token is not verify')
    }
  })
}
