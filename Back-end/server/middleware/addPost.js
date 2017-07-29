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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

        var img = files.image[0];
        var title = fields.text[0];
        var imgName = randomID + img.originalFilename;
        var pathImage = '../Front-end/public/images/' + user.user_data.username + '/' + imgName;
        _fs2.default.readFile(img.path, function (err, data) {
          _fs2.default.writeFile(pathImage, data, function (error) {
            if (error) console.log(error);
          });
        });

        var post = {
          id: randomID,
          image: './images/' + user.user_data.username + '/' + imgName,
          serverPath: pathImage,
          title: title,
          author_post: {
            username: user.user_data.username,
            avatar: user.user_data.avatar
          },
          date: Date.now()
        };

        var comment = {
          id: randomID,
          comments: []
        };

        var like = {
          id: randomID,
          users: []
        };

        user.posts.push(post);
        _store2.default.commentsList.push(comment);
        _store2.default.likes.push(like);

        var subscribers = [];

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
  });
};