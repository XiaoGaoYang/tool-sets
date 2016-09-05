import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
} from 'react-native';

import SplashScreen from 'rn-splash-screen';
import Chat from './component/Chat';

import { Container, Content, Button } from 'native-base';

class VoiceMachine extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      <Chat />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

AppRegistry.registerComponent('VoiceMachine', () => VoiceMachine);