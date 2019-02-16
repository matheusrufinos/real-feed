import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import socket from 'socket.io-client';
import api from '../providers/api';
import Post from '../components/Post';

export default class Feed extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Feed',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('NewPost')}>
        <Icon style={{ marginRight: 20 }} name="add-circle-outline" size={24} color="#9ece61" />
      </TouchableOpacity>
    ),
  })

  state = {
    posts: [],
  }

  async componentDidMount() {
    this.subscribeEvents();
    const result = await api.get('posts');
    this.setState({ posts: result.data })
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

  render() {
    return (
      <View style={styles.container}>
      <FlatList 
        data={this.state.posts}
        keyExtractor={post => post._id}
        renderItem={({item}) => <Post post={item} />}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
