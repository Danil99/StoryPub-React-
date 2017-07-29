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
        return user.user_data.username === req.body.username;
      });
      var youFriends = false;
      var subscribers = [];
      var arr = ver.user_data.friends;

      if (req.body.action === 'delete') {
        arr.splice(arr.indexOf(req.body.username), 1);
      } else if (req.body.action === 'add') {
        arr.push(req.body.username);
        youFriends = true;
      }

      _store2.default.users.forEach(function (user) {
        user.user_data.friends.forEach(function (friend) {
          if (friend === req.body.username) {
            subscribers = [].concat(_toConsumableArray(subscribers), [friend]);
          }
        });
      });

      if (ver) res.send({ youFriends: youFriends, subscribers: subscribers });
      if (!ver) res.send('The token is not verify');
    }
  });
};