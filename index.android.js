import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
  TouchableOpacity,
  ListView,
  Navigator,
  BackAndroid,
  Alert,
  CameraRoll,
  StatusBar
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'rn-splash-screen';

import Main from './component/Main';
import Chat from './component/Chat/Chat';
import FastMail from './component/FastMail/FastMail';
import Library from './component/Library/Library';
// import NavBar from './component/NavBar/NavBar';

import Config from './component/Config';

// import Setting from './component/Chat/Setting';

class toolSets extends Component {
  constructor(props){
    super(props);

    this.state = {};

    // 设备ID
    this.deviceId = DeviceInfo.getUniqueID();

    this.onBackAndroid = this.onBackAndroid.bind(this);
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);

    // CameraRoll.saveToCameraRoll('http://ico.ooopic.com/ajax/iconpng/?id=79794.png','photo');
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress',this.onBackAndroid);
  }

  // 按下Back键
  onBackAndroid(){
    const nav = this.refs.nav;
    const routers = nav.getCurrentRoutes();
    if(routers.length > 1){
      nav.pop();
      return true;
    }else if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()){
      // 返回false调用默认行为退出应用
      return false;
    }else{
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
      return true;
    }
    /*
    // 路由栈里路由数多余一个时弹出最后一个
    if(routers.length > 1){
      // nav.pop();
      nav.jumpBack();
      return true;
    }else if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()){
      // 返回false调用默认行为退出应用
      return false;
    }else{
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用',1000);
      // Alert.alert('sss');
      return true;
    }
    */
  }

  // 配置场景动画
  configureScene(route){
    var BaseConfig = Navigator.SceneConfigs.PushFromRight;
    // BaseConfig.springTension = 100;
    // BaseConfig.springFriction = 100;
    return Navigator.SceneConfigs.PushFromRight;
  }

  // 渲染scene
  renderScene(route,navigator){
    let Scene = route.component;
    return (
      <Scene {...route.params} navigator={navigator} />
    );
  }

  onDidFocus(route){
    console.log('切换完成');
  }

  render() {
    const routers = [
      { name:'Main',component:Main },
      { name:'Library',component:Library }
    ];
    return (
      <Navigator
        initialRoute={routers[0]}  // 启动app后的第一屏
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        onDidFocus={this.onDidFocus}
        ref='nav'
      />
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});

AppRegistry.registerComponent('toolSets', () => toolSets);