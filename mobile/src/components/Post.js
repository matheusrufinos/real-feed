import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../providers/api';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Post extends Component {
  setLike = () => {
    const { _id } = this.props.post;

    api.post(`likes/${_id}`);
  };

  render() {
    const { post } = this.props;

    return (
      <View style={styles.container}>
      <Text style={styles.author}>{post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>

      <TouchableOpacity onPress={this.setLike} style={styles.likeButton}>
      <Icon name="ios-heart-empty" size={20} color="#9ece61" />
      <Text style={styles.likeText}>{post.likes}</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C2022"
  },

  content: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1C2022",
    marginVertical: 10
  },

  likeButton: {
    flexDirection: "row",
    alignItems: "center"
  },

  likeText: {
    color: "#999",
    marginLeft: 5
  }
});
