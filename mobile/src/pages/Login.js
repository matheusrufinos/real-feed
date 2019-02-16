import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, Image, View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  state = {
    username: '',
  };

  getInputUsername = (username) => {
    this.setState({ username });
  };

  makeLogin = async () => {
    const { username } = this.state;

    if (!username.length) return;

    await AsyncStorage.setItem('user', username);

    this.props.navigation.navigate('App');

  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('user');

    if (username) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <View>
            <Image source={{ uri: 'https://i.imgur.com/lmCdzTh.png' }}
              style={{ width: 130, height: 130 }} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={this.state.username}
            onChangeText={this.getInputUsername}
            onSubmitEditing={this.makeLogin}
            returnKeyType="send" />

          <TouchableOpacity
            onPress={this.makeLogin}
            style={styles.button}>
            <Text
              style={styles.buttonText}>
              Enter
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#9ece61",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
