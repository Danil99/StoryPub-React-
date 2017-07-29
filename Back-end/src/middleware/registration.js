import store from '../store.js';

module.exports = function (req, res) {
  let result = store.users.find(user => user.user_data.username === req.body.username);
  if(Boolean(result)) res.send('Repeat name');
  if(!Boolean(result)) {
    let user = {
      user_data: {
        username: req.body.username,
        password: req.body.password,
        email: '',
        avatar: 'https://s-media-cache-ak0.pinimg.com/236x/71/f3/51/71f3519243d136361d81df71724c60a0--avatar-icons.jpg',
        friends: []
      },
      posts: []
    };
    store.users.push(user);
    res.send('OK')
  }
}
