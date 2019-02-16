import React, { Component } from 'react';
import api from '../providers/api';

import like from '../like.svg';
import './Post.css';

export default class Post extends Component {
    newLike = async () => {
        const { _id } = this.props.post;

        await api.post(`likes/${_id}`);
    }
    render() {
        const { post } = this.props;
        return (
            <li className="post">
                <strong>{post.author}</strong>
                <p>{post.content}</p>
                <button type="button" onClick={this.newLike}>
                <img src={like} alt="Like" />
                {post.likes}
                </button>
                
            </li>
        )
    }
}