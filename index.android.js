import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ListView
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'rn-splash-screen';
import Storage from 'react-native-storage';

import Chat from './component/Chat';
import Test from './component/Test';

import md5 from 'md5';

import Config from './component/Config';

class VoiceMachine extends Component {
  constructor(props){
    super(props);

    this.state = {};

    // 设备ID
    this.deviceId = DeviceInfo.getUniqueID();
  }

  componentWillMount(){

  }

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      <Chat
        deviceId={this.deviceId}
      />
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