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
      var contactSearch = _store2.default.users.filter(function (el) {
        return el.user_data.username.toLowerCase().indexOf(req.body.searchValue) !== -1;
      });
      var searchName = [];
      contactSearch.forEach(function (user) {
        var username = user.user_data.username;
        var avatar = user.user_data.avatar;
        var userSearch = { username: username, avatar: avatar };
        searchName = [].concat(_toConsumableArray(searchName), [userSearch]);
      });
      res.send(searchName);
    }
  });
};