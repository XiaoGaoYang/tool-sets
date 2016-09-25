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
  Alert
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'rn-splash-screen';
import { Router,Scene } from 'react-native-router-flux';

import Main from './component/Main';
import Chat from './component/Chat/Chat';

import Config from './component/Config';

class VoiceMachine extends Component {
  constructor(props){
    super(props);

    this.state = {};

    // 设备ID
    this.deviceId = DeviceInfo.getUniqueID();

    this.onBackAndroid = this.onBackAndroid.bind(this);
  }

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
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
    console.log('所有路由：',routers);
    
    try{
      nav.jumpBack();
      return true;
    }catch(err){
      if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()){
        // 返回false调用默认行为退出应用
        return false;
      }else{
        this.lastBackPressed = Date.now();
        // console.log(ToastAndroid.show);
        ToastAndroid.show('再按一次退出应用',1000);
        // Alert.alert('sss');
        return true;
      }
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
      // console.log(ToastAndroid.show);
      ToastAndroid.show('再按一次退出应用',1000);
      // Alert.alert('sss');
      return true;
    }
    */
  }

  // 配置场景动画
  configureScene(route){
    var BaseConfig = Navigator.SceneConfigs.PushFromRight;
    // console.log('BaseConfig:',BaseConfig);
    // BaseConfig.springTension = 100;
    // BaseConfig.springFriction = 100;
    return Navigator.SceneConfigs.PushFromRight;
  }

  // 渲染scene
  renderScene(route,navigator){
    let Scene = route.component;
    console.log('当前路由:',route);
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
      { name:'Chat',component:Chat },
      // { name:'Setting',component:Setting },
    ];
    return (
      /*
      <Chat
        deviceId={this.deviceId}
      />
      */
      /*
      tabs={true} hideNavBar={true}
      <View style={styles.container}>
        <CustomNavBar />
        <Chat />
      </View>
      */
      /*
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="Chat" component={Chat} title="语音机器人" initial={true}></Scene>
          <Scene key="Setting" component={Setting} title="设置"></Scene>
        </Scene>
      </Router>
      */
      
      <Navigator
        initialRoute={routers[0]}  // 启动app后的第一屏
        initialRouteStack={routers}
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

AppRegistry.registerComponent('VoiceMachine', () => VoiceMachine);