const Post = require('../models/post');

module.exports = {
    async setLike(req, res) {
        const post = await Post.findById(req.params.id);

        post.set({likes: post.likes + 1});
        
        await post.save();

        req.io.emit('like', post);

        return res.json(post);
    }
}