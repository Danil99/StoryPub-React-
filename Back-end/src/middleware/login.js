import jwt from 'jsonwebtoken';

import config from './config.js';
import store from '../store.js';

module.exports = function (req, res) {
  let user = store.users.find(user => (user.user_data.username === req.body.username) && user.user_data.password === req.body.password);
  if(user) {
    let token = jwt.sign({username: req.body.username, password: req.body.password}, config.jwtSecret);
    res.send(token);
  } else res.send('error');
}
