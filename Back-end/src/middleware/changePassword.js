import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let user = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);
      let password = user.user_data.password;

      if(password === req.body.oldPass && user && password !== req.body.newPass) {
        user.user_data.password = req.body.newPass;
        let token = jwt.sign({username: user.user_data.username, password: user.user_data.password}, config.jwtSecret);
        res.send(token);
      }
      if(password !== req.body.oldPass) {
        res.send('notPass')
      }
      if(password === req.body.newPass && user) {
        res.send('diffPass')
      }

      if(!user) res.send('The token is not verify')
    }
  })
}
