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
      var password = user.user_data.password;

      if (password === req.body.oldPass && user && password !== req.body.newPass) {
        user.user_data.password = req.body.newPass;
        var token = _jsonwebtoken2.default.sign({ username: user.user_data.username, password: user.user_data.password }, _config2.default.jwtSecret);
        res.send(token);
      }
      if (password !== req.body.oldPass) {
        res.send('notPass');
      }
      if (password === req.body.newPass && user) {
        res.send('diffPass');
      }

      if (!user) res.send('The token is not verify');
    }
  });
};