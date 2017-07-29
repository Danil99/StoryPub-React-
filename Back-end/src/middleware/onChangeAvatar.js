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

        let img = files.avatar[0];
        let imgName = randomID + img.originalFilename;

        fs.readFile(img.path, function (err, data) {
          let pathImage = `../Front-end/public/images/avatar/${imgName}`;
          fs.writeFile(pathImage, data, function (error) {
            if(error) console.log(error);
          })
          fs.unlink(user.user_data.serverAvatar, function (err) {
            user.user_data.serverAvatar = pathImage;
            if (err) console.log(err);
          })
        })

        if(fields.width[0] > fields.height[0]) {
          user.user_data.resolveAvatar = true;
        } else user.user_data.resolveAvatar = false;

        user.user_data.avatar = `./images/avatar/${imgName}`;

        user.posts.forEach(post => {
          post.author_post.avatar = `./images/avatar/${imgName}`;
        })

        let user_data = {
          username: user.user_data.username,
          email: user.user_data.email,
          avatar: user.user_data.avatar,
          friends: user.user_data.friends,
          resolveAvatar: user.user_data.resolveAvatar
        }

        if(user) res.send(user_data);
        if(!user) res.send('The token is not verify')
      }
    })
  })
}
