'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _store = require('../store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  var user = _store2.default.users.find(function (user) {
    return user.user_data.username === req.body.username && user.user_data.password === req.body.password;
  });
  if (user) {
    var token = _jsonwebtoken2.default.sign({ username: req.body.username, password: req.body.password }, _config2.default.jwtSecret);
    res.send(token);
  } else res.send('error');
};