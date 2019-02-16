const express = require('express');

const routes = express.Router();

const PostController = require('./controllers/post-controller');
const LikeController = require('./controllers/like-controller');

routes.get('/posts', PostController.getPosts);
routes.post('/posts', PostController.createPost);
routes.post('/likes/:id', LikeController.setLike);
module.exports = routes;