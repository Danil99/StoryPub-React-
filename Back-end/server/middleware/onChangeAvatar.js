'use strict';

var _multiparty = require('multiparty');

var _multiparty2 = _interopRequireDefault(_multiparty);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _store = require('../store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  var form = new _multiparty2.default.Form();

  form.parse(req, function (err, fields, files) {
    _jsonwebtoken2.default.verify(fields.token[0], _config2.default.jwtSecret, function (err, decoded) {
      if (err !== null) {
        res.send('The token is not verify');
      } else {
        var user = _store2.default.users.find(function (user) {
          return user.user_data.username === decoded.username && user.user_data.password === decoded.password;
        });

        var s4 = function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };
        var randomID = s4() + s4();

        var img = files.avatar[0];
        var imgName = randomID + img.originalFilename;

        _fs2.default.readFile(img.path, function (err, data) {
          var pathImage = '../Front-end/public/images/avatar/' + imgName;
          _fs2.default.writeFile(pathImage, data, function (error) {
            if (error) console.log(error);
          });
          _fs2.default.unlink(user.user_data.serverAvatar, function (err) {
            user.user_data.serverAvatar = pathImage;
            if (err) console.log(err);
          });
        });

        if (fields.width[0] > fields.height[0]) {
          user.user_data.resolveAvatar = true;
        } else user.user_data.resolveAvatar = false;

        user.user_data.avatar = './images/avatar/' + imgName;

        user.posts.forEach(function (post) {
          post.author_post.avatar = './images/avatar/' + imgName;
        });

        var user_data = {
          username: user.user_data.username,
          email: user.user_data.email,
          avatar: user.user_data.avatar,
          friends: user.user_data.friends,
          resolveAvatar: user.user_data.resolveAvatar
        };

        if (user) res.send(user_data);
        if (!user) res.send('The token is not verify');
      }
    });
  });
};