import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  StatusBar,
  Image,
  Clipboard,
  TouchableOpacity,
  AsyncStorage,
  Navigator
} from 'react-native';

import { GiftedChat,Actions,Bubble,InputToolbar } from 'react-native-gifted-chat';
import Storage from 'react-native-storage';

import Config from '../Config';
import NetUtil from '../NetUtil';
import NavBar from '../NavBar/NavBar';

import Setting from './Setting';
import CustomActions from './CustomActions';
import CustomMessage from './CustomMessage';

export default class Chat extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages:[],
      isAnimated:true,
      typingText:null,
    };

    this._isMounted = false;
    
    // 事件处理函数
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.onLongPress = this.onLongPress.bind(this);

    this.onReturn = this.onReturn.bind(this);
    this.onSetting = this.onSetting.bind(this);
    this.onClean = this.onClean.bind(this);
    
    // 渲染函数
    this.renderFooter = this.renderFooter.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);

    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderCustomMessage = this.renderCustomMessage.bind(this);

    this._isAlright = null;

    // 聊天记录的数量
    this.countRecord = 0;

  }

  componentWillMount() {
    this._isMounted = true;
    this.onLoadEarlier();
  }

  componentDidMount(){
    console.log('Chat did mount');
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  onLoadEarlier(){
    // 全局变量storage，用来存储信息
    global.storage = new Storage({
      size: 1000,
      storageBackend:AsyncStorage,
      defaultExpires: null,
      enableCache: true,
    });

    // 清除数据
    // storage.clearMap();

    storage.getAllDataForKey('oldMessages').then(messages => {
      // console.log(messages);
      if(messages.length === 0){
        // console.log('没读到历史数据');
        this.countRecord = 0;
        this.initialRecord();
      }else{
        // console.log('读到历史数据');
        this.countRecord = messages.length;
        this.setState({
          messages: messages
        });
      }
    });
  }

  // 保存初始数据
  initialRecord(){
    // 初始数据
    let iData = {
      key:'oldMessages',
      id: this.countRecord++,
      rawData:{
        _id: Math.round(Math.random() * 1000000),
        text: Config.robot.default,
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
          _id: Config.robot.id,
          name: Config.robot.name,
          avatar: Config.robot.avatar
        }
      },
      expires:null
    };

    storage.save(iData);
    this.setState({
      messages:[iData.rawData]
    });
  }

  // 语音机器人调用图灵机器人的API获得返回数据
  answerDemo(messages) {
    var _this = this;
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: Config.robot.name+'正在输入...'
          };
        });
      }
    }

    let data = {
      key:'03b0215fcafb484080d70ee61d35997c',
      info:messages[0].text,
      userid:this.props.deviceId
    };
    let url = 'http://www.tuling123.com/openapi/api';

    NetUtil.postJson(url,data,(response) => {
      this.onReceive(response.text);
      this.setState(()=>{
        return {
          typingText: null,
        };
      });
    });
  }

  // 发送事件
  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(messages,previousState.messages),
      };
    });
  
    this.onSave(messages[0]);
    this.answerDemo(messages);
  }

  // 保存聊天记录
  onSave(messages) {
    storage.save({
      key: 'oldMessages',
      id: this.countRecord++,
      rawData: messages,
    });
  }

  // 接收事件
  onReceive(text) {
    let newMessage = [{
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: Config.robot.name,
        avatar: Config.robot.avatar
      },
    }];

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(newMessage,previousState.messages),
      };
    });

    this.onSave(newMessage[0]);
  }

  // 长按气泡
  onLongPress(context) {
    // console.log(this.state.messages[0].text);
    let text = this.state.messages[0].text;
    if (text) {
      const options = [
        '复制文字',
        '取消',
      ];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(text);
              break;
          }
        }
      );
    }
  }

  // 导航栏返回按钮点击
  onReturn(){
    const navigator = this.props.navigator;
    if(navigator){
      navigator.pop();
    }
  }

  // 导航栏设置按钮点击
  onSetting(){
    const navigator = this.props.navigator;
    if(navigator){
      navigator.push({
        name: 'Setting',
        component: Setting,
        params: {
          onClean: this.onClean, 
        }
      });
    }
  }

  // 清除历史记录
  onClean(){
    storage.clearMapForKey('oldMessages');
    this.initialRecord();
    ToastAndroid.show('对话记录清除成功',500);
  }

  // 在底部渲染文字
  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  // 渲染对话气泡
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    );
  }

  // 渲染输入框
  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        // composerHeight={30}
        label="发送"
        textInputProps={{
          // autoFocus:true 
        }}
        textInputStyle={{
          textAlign: "left",
          textAlignVertical: "center",
        }}
      />
    );
  }

  // 渲染自定义活动按钮
  renderCustomActions(props) {
    return (
      <CustomActions
        {...props}
      />
    );
  }

  // 渲染对话消息
  renderCustomMessage(props){
    return (
      <CustomMessage
        {...props}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          leftText={"返回"}
          rightText={"设置"}
          title={Config.robot.name}
          onLeftPress={this.onReturn}
          onRightPress={this.onSetting}
        />
        <GiftedChat
          messages={this.state.messages}
          locale={"zh-cn"}
          placeholder={"输入信息..."}
          
          onSend={this.onSend}
          onLongPress={this.onLongPress}

          user={{
            _id:this.props.deviceId,
            name:Config.user.name,
            avatar: Config.user.avatar
          }}

          renderFooter={this.renderFooter}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          
          renderActions={this.renderCustomActions}
          renderMessage={this.renderCustomMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#ffffff'
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
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  inputToolBarContainer: {
    justifyContent:'center',
  },
  inputToolBarPrimary: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});