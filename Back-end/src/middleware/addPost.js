import multiparty from 'multiparty';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import config from './config.js';
import store from '../store.js';

module.exports = function (req, res) {
  let form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    jwt.verify(fields.token[0], config.jwtSecret, function (err, decoded) {
      if(err !== null) {
        res.send('The token is not verify')
      } else {
        let user = store.users.find(user => user.user_data.username === decoded.username && user.user_data.password === decoded.password);

        let s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        let randomID = s4() + s4();

        let img = files.image[0];
        let title = fields.text[0];
        let imgName = randomID + img.originalFilename;
        let pathImage = `../Front-end/public/images/${user.user_data.username}/${imgName}`;
        fs.readFile(img.path, function (err, data) {
          fs.writeFile(pathImage, data, function (error) {
            if(error) console.log(error);
          })
        })

        let post = {
          id: randomID,
          image: `./images/${user.user_data.username}/${imgName}`,
          serverPath: pathImage,
          title,
          author_post: {
            username: user.user_data.username,
            avatar: user.user_data.avatar
          },
          date: Date.now()
        }

        let comment = {
          id: randomID,
          comments: []
        }

        let like = {
          id: randomID,
          users: []
        }

        user.posts.push(post);
        store.commentsList.push(comment);
        store.likes.push(like);

        let subscribers = [];

        store.users.forEach(user => {
          user.user_data.friends.forEach(friend => {
            if(friend === req.body.userName) {
              subscribers = [...subscribers, friend]
            }
          });
        });

        let user_data = {
          username: user.user_data.username,
          email: user.user_data.email,
          avatar: user.user_data.avatar,
          friends: user.user_data.friends,
          posts: user.posts.sort((a, b) => b.date - a.date),
          subscribers
        }

        if(user) res.send(user_data);
        if(!user) res.send('The token is not verify')
      }
    })
  })
}
