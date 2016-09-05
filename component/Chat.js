import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  StatusBar,
  Image,
  Clipboard
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { GiftedChat,Actions,Bubble,InputToolbar } from 'react-native-gifted-chat';

import NetUtil from './NetUtil';
import Setting from './Setting';

import CustomActions from './CustomActions';
import CustomNavBar from './CustomNavBar';
import CustomMessage from './CustomMessage';

export default class testfetch extends Component {
  constructor(props){
    super(props);

    this.state = {
      message:[],
      isAnimated:true,
      typingText:null,
      // loadEarlier: true,
      // isLoadingEarlier: false,
    };

    this._isMounted = false;
    
    // 事件处理函数
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    // this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    
    // 渲染函数
    this.renderFooter = this.renderFooter.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);

    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderCustomMessage = this.renderCustomMessage.bind(this);

    this._isAlright = null;

    // 设备ID
    this.deviceId = DeviceInfo.getUniqueID();

    // 机器人名字
    this.machineName = '语音机器人';
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        // messages: require('../data/messages.js'),
      };
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  // 加载聊天记录
  /*
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }
  */

  // 语音机器人调用图灵机器人的API获得返回数据
  answerDemo(messages) {
    var _this = this;
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: this.machineName+'正在输入...'
          };
        });
      }
    }

    let data = {
      key:'03b0215fcafb484080d70ee61d35997c',
      info:messages[0].text,
      userid:this.deviceId
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
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    this.answerDemo(messages);
  }

  // 接收事件
  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 3,
            name: this.machineName,
            avatar: function(){
              return (
                <Image
                  source={require('./img/avatar.png')}
                  style={styles.avatarStyle}
                />
              );
            }
          },
        }),
      };
    });
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
          autoFocus:true 
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
        <CustomNavBar { ...this.props } />
        <GiftedChat
          messages={this.state.messages}
          locale={"zh-cn"}
          placeholder={"输入信息..."}
          
          onSend={this.onSend}
          onLongPress={this.onLongPress}

          user={{
            _id:this.deviceId,
            name:'test',
            avatar: function(){
              return (
                <Image
                  source={require('./img/user_avatar.png')}
                  style={styles.avatarStyle}
                />
              );
            }
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