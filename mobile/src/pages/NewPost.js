import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../providers/api';

export default class NewPost extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newPost: '',
  }

  backPage = () => {
    this.props.navigation.pop();
  };

  inputChange = (newPost) => {
    this.setState({ newPost });
  };

  sendPost = async (newPost) => {
    const content = this.state.newPost;
    const author = await AsyncStorage.getItem('user');
    await api.post('posts', {author, content});

    this.backPage();
  };

  render() {
    return (
      <SafeAreaView
        style={styles.container}>
        <View
          style={styles.header}>
          <TouchableOpacity
            onPress={this.backPage}>
            <Icon name="close" size={24} color="#9ece61" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.sendPost}>
            <Text
              style={styles.buttonText}>
              Share
      </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Share your ideias with your friends..."
          placeholderTextColor="#3a3a3a"
          value={this.state.newPost}
          onChangeText={this.inputChange}
          returnKeyType="send"
          onSubmitEditing={this.sendPost}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#9ece61",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});
