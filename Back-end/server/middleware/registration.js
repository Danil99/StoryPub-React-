'use strict';

var _store = require('../store.js');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  var result = _store2.default.users.find(function (user) {
    return user.user_data.username === req.body.username;
  });
  if (Boolean(result)) res.send('Repeat name');
  if (!Boolean(result)) {
    var user = {
      user_data: {
        username: req.body.username,
        password: req.body.password,
        email: '',
        avatar: 'https://s-media-cache-ak0.pinimg.com/236x/71/f3/51/71f3519243d136361d81df71724c60a0--avatar-icons.jpg',
        friends: []
      },
      posts: []
    };
    _store2.default.users.push(user);
    res.send('OK');
  }
};