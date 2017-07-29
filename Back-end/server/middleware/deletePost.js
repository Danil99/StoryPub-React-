'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _store = require('../store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (req, res) {
  _jsonwebtoken2.default.verify(req.body.token, _config2.default.jwtSecret, function (err, decoded) {
    if (err !== null) {
      res.send('The token is not verify');
    } else {
      var user = _store2.default.users.find(function (user) {
        return user.user_data.username === decoded.username && user.user_data.password === decoded.password;
      });
      var subscribers = [];

      var post = user.posts.find(function (post) {
        return post.id === req.body.id;
      });
      // if(post) {
      //   fs.unlink(post.serverPath, function (err) {
      //     if(err) console.log(err);
      //   })
      // }
      user.posts = user.posts.filter(function (post) {
        return post.id !== req.body.id;
      });

      _store2.default.commentsList = _store2.default.commentsList.filter(function (comm) {
        return comm.id !== req.body.id;
      });
      _store2.default.likes = _store2.default.likes.filter(function (like) {
        return like.id !== req.body.id;
      });

      _store2.default.users.forEach(function (user) {
        user.user_data.friends.forEach(function (friend) {
          if (friend === req.body.userName) {
            subscribers = [].concat(_toConsumableArray(subscribers), [friend]);
          }
        });
      });

      var user_data = {
        username: user.user_data.username,
        email: user.user_data.email,
        avatar: user.user_data.avatar,
        friends: user.user_data.friends,
        posts: user.posts.sort(function (a, b) {
          return b.date - a.date;
        }),
        subscribers: subscribers
      };

      if (user) res.send(user_data);
      if (!user) res.send('The token is not verify');
    }
  });
};