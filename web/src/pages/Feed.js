import React, { Component } from 'react';
import api from '../providers/api';
import socket from 'socket.io-client';

import feedLogo from '../logo.svg';
import './Feed.css';

import Post from '../components/Post';

export default class Feed extends Component {
    state = {
        posts: [],
        newPost: '',
    }

    async componentDidMount() {
        this.subscribeEvents();
        const result = await api.get('posts');
        this.setState({ posts: result.data });
    }

    subscribeEvents = () => {
        const io = socket('http://localhost:3000');

        io.on('post', data => {
            this.setState({posts: [data, ...this.state.posts]})
        });
        io.on('like', data => {
            this.setState({posts: this.state.posts.map(post => (
                post._id === data._id ? data : post
            ))})
        })
    }

    sendPost = async e => {
        if (e.keyCode !== 13) return;

        const content = this.state.newPost;
        const author = localStorage.getItem('user');

        await api.post('posts', { content, author });

        this.setState({ newPost: '' });
    }

    inputChange = e => {
        this.setState({ newPost: e.target.value });
    }
    
    render() {
        return (
            <div className="wrapper-feed">
                <img className="logoFeed" src={feedLogo} alt="Logo" />
                <form>
                    <textarea value={this.state.newTweet} onChange={this.inputChange} onKeyDown={this.sendPost} placeholder="Share your ideas with your friends..."></textarea>
                    <button className="button-post">Share</button>
                </form>

                <ul className="post-list">
                    {this.state.posts.map(post => (
                        <Post key={post._id} post={post} />
                    )
                    )}
                </ul>
            </div>
        )
    }
}