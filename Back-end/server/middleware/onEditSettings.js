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
      var token = '';
      var username = user.user_data.username;

      if (username !== req.body.username) {
        _store2.default.likes.map(function (like) {
          var index = like.users.indexOf(username);
          if (index !== -1) like.users.push(req.body.username);
          like.users = like.users.filter(function (likeUser) {
            return likeUser !== username;
          });
        });

        _store2.default.commentsList.forEach(function (post) {
          post.comments.forEach(function (comm) {
            if (comm.author === username) {
              comm.author = req.body.username;
            }
          });
        });

        _store2.default.users.map(function (fr) {
          if (fr.user_data.username !== username) {
            var index = fr.user_data.friends.indexOf(username);
            if (index !== -1) fr.user_data.friends.push(req.body.username);
            fr.user_data.friends = fr.user_data.friends.filter(function (friend) {
              return friend !== username;
            });
          }
        });

        user.posts.forEach(function (post) {
          post.author_post.username = req.body.username;
        });

        user.user_data.username = req.body.username;
        token = _jsonwebtoken2.default.sign({ username: user.user_data.username, password: user.user_data.password }, _config2.default.jwtSecret);
      }

      if (user.user_data.email !== req.body.email) {
        user.user_data.email = req.body.email;
      }

      var user_data = {
        username: user.user_data.username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends
      };
      if (user) res.send({ user_data: user_data, token: token });
      if (!user) res.send('The token is not verify');
    }
  });
};