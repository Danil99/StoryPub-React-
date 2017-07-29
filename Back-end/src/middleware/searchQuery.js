import jwt from 'jsonwebtoken';
import config from './config.js';

import store from '../store.js';

module.exports = function (req, res) {
  jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
    if(err !== null) {
      res.send('The token is not verify')
    } else {
      let contactSearch = store.users.filter(el => {
      	return el.user_data.username.toLowerCase().indexOf(req.body.searchValue) !== -1;
      })
      let searchName = [];
      contactSearch.forEach(user => {
        let username = user.user_data.username;
        let avatar = user.user_data.avatar;
        let userSearch = {username, avatar};
        searchName = [...searchName, userSearch];
      })
      res.send(searchName);
    }
  })
}
