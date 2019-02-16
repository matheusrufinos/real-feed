const Post = require('../models/post');

module.exports = {
    async getPosts(req, res) {
        const posts = await Post.find({}).sort('-createdAt');

        return res.json(posts);
    },

    async createPost(req, res) {
        const post = await Post.create(req.body);

        req.io.emit('post', post);
        return res.json(post);
    }
}