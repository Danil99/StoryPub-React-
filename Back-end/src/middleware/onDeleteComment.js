import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let user = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let postFind = store.commentsList.find(post => post.id === req.body.id);

      postFind.comments.splice(req.body.i, 1);

      if(user) res.send({comment: store.commentsList});
      if(!user) res.send('The token is not verify')
    }
  })
}
