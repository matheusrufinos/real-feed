import React, { Component } from 'react';
import './Login.css';
import feedLogo from '../logo-text.svg';
export default class Login extends Component {
    state = {
        username: '',
    };

    inputChange = e => {
        this.setState({
            username: e.target.value
        });
    }

    submitForm = e => {
        e.preventDefault();

        const { username } = this.state;

        if(!username.length) return;

        localStorage.setItem('user', username);

        this.props.history.push('/feed');
    }

    render() {
        return (
            <div className="wrapper">
            <img className="logo" src={feedLogo} alt="Logo" />
            <form onSubmit={this.submitForm}>
                <input placeholder="Username" value={this.state.username} onChange={this.inputChange} />
                <button type="submit">Enter</button>
            </form>
        </div>
        )
    }
}