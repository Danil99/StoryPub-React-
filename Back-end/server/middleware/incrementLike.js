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
      var username = user.user_data.username;
      var posts = user.posts;

      var postLike = _store2.default.likes.find(function (like) {
        return like.id === req.body.id;
      });
      var likeUsers = postLike.users;
      var index = likeUsers.indexOf(username);
      if (index !== -1) likeUsers.splice(likeUsers.indexOf(username), 1);
      if (index === -1) likeUsers.push(username);

      user.user_data.friends.forEach(function (friend) {
        _store2.default.users.forEach(function (user) {
          if (friend === username) {
            posts = posts.concat(user.posts);
          }
        });
      });
      posts.sort(function (a, b) {
        return a.date - b.date;
      });

      var user_data = {
        username: username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends
      };

      if (user) res.send({ likes: _store2.default.likes });
      if (!user) res.send('The token is not verify');
    }
  });
};