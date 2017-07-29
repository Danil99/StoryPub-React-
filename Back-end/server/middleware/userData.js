'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _store = require('../store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (req, res) {
  _jsonwebtoken2.default.verify(req.body.token, _config2.default.jwtSecret, function (err, decoded) {
    if (err !== null) {
      res.send('The token is not verify');
    } else {
      var ver = _store2.default.users.find(function (user) {
        return user.user_data.username === decoded.username && user.user_data.password === decoded.password;
      });
      var user = _store2.default.users.find(function (user) {
        return user.user_data.username === req.body.userName;
      });
      var subscribers = [];
      var settPage = {
        youFriends: false,
        youPage: false
      };
      _store2.default.users.forEach(function (user) {
        user.user_data.friends.forEach(function (friend) {
          if (friend === req.body.userName) {
            subscribers = [].concat(_toConsumableArray(subscribers), [friend]);
          }
        });
      });
      ver.user_data.friends.forEach(function (friend) {
        if (friend === req.body.userName) {
          settPage.youFriends = true;
        }
      });
      if (!Boolean(user)) {
        res.send('error');
      } else {
        if (ver.user_data.username === user.user_data.username) {
          settPage.youPage = true;
        }
        var user_data = {
          username: user.user_data.username,
          email: user.user_data.email,
          avatar: user.user_data.avatar,
          friends: user.user_data.friends,
          posts: user.posts.sort(function (a, b) {
            return b.date - a.date;
          }),
          subscribers: subscribers,
          resolveAvatar: user.user_data.resolveAvatar
        };
        if (ver) res.send({ user_data: user_data, settPage: settPage });
        if (!ver) res.send('The token is not verify');
      }
    }
  });
};