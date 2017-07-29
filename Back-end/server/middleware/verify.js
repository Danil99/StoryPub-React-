'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _store = require('../store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  _jsonwebtoken2.default.verify(req.body.token, _config2.default.jwtSecret, function (err, decoded) {
    if (err !== null) {
      res.send('The token is not verify');
    } else {
      var user = _store2.default.users.find(function (user) {
        return user.user_data.username === decoded.username && user.user_data.password === decoded.password;
      });
      var posts = user.posts;
      user.user_data.friends.forEach(function (friend) {
        _store2.default.users.forEach(function (user) {
          if (friend === user.user_data.username) {
            posts = posts.concat(user.posts);
          }
        });
      });
      posts.sort(function (a, b) {
        return b.date - a.date;
      });
      var user_data = {
        username: user.user_data.username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends,
        resolveAvatar: user.user_data.resolveAvatar
      };
      if (user) res.send({ user_data: user_data, posts: posts, likes: _store2.default.likes, commentsList: _store2.default.commentsList });
      if (!user) res.send('The token is not verify');
    }
  });
};