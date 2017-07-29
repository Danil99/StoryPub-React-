import express from 'express';
import bodyParser from 'body-parser';

import headers from './middleware/headers.js';
import login from './middleware/login.js';
import verify from './middleware/verify.js';
import searchQuery from './middleware/searchQuery.js';
import userData from './middleware/userData.js';
import deleteOrAddFriends from './middleware/deleteOrAddFriends.js';
import incrementLike from './middleware/incrementLike.js';
import onAddComment from './middleware/onAddComment.js';
import onDeleteComment from './middleware/onDeleteComment.js';
import addPost from './middleware/addPost.js';
import registration from './middleware/registration.js';
import deletePost from './middleware/deletePost.js';
import onEditSettings from './middleware/onEditSettings.js';
import changePassword from './middleware/changePassword.js';
import onChangeAvatar from './middleware/onChangeAvatar.js';

let app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(headers);

app.post('/login', login)
app.post('/verify', verify)
app.post('/searchQuery', searchQuery)
app.post('/userData', userData)
app.post('/addPost', addPost)
app.post('/registration', registration)
app.post('/deletePost', deletePost)
app.post('/onEditSettings', onEditSettings)
app.post('/onChangeAvatar', onChangeAvatar)

app.patch('/deleteOrAddFriends', deleteOrAddFriends)
app.patch('/incrementLike', incrementLike)

app.put('/onAddComment', onAddComment)
app.put('/onDeleteComment', onDeleteComment)
app.put('/changePassword', changePassword)

app.listen(8080, () => {
  console.log('Server is started');
})
