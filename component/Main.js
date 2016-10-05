import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  StatusBar
} from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, List, ListItem, Text, Thumbnail,Header,Title,Button,Icon } from 'native-base';

import Chat from './Chat/Chat';
import FastMail from './FastMail/FastMail';
import Library from './Library/Library';

import Config from './Config';
import NetUtil from './NetUtil';

import Theme from './NativeBaseTheme';

export default class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('Main did mount');
  }

  // 语音机器人
  onChat(){
    const navigator = this.props.navigator;
    if(navigator){
      navigator.push({
        name: 'Chat',
        component: Chat
      });
    }
  }

  // 快递查询
  onFastMail(){
    const navigator = this.props.navigator;
    if(navigator){
      navigator.push({
        name: 'FastMail',
        component: FastMail
      });
    }
  }

  // 图书馆书籍查询
  onLibrary(){
    const navigator = this.props.navigator;
    if(navigator){
      navigator.push({
        name: 'Library',
        component: Library
      });
    }
  }

  // postJson(url, data, callback)
  onTestPress(){
    let qs = {
      keyword:'html',
    };
    NetUtil.postJson('http://192.168.1.110:3000/library',qs,function(data){
      console.log(data);
    });
  }

  render(){
    return(
      <View>
        <StatusBar backgroundColor="#039BE5" />
        <Header theme={Theme}>
          <Title>功能选择</Title>
        </Header>
        <Content>
          <List>
            <ListItem button onPress={this.onChat.bind(this)}>
              <Thumbnail source={require('./img/robot-icon.png')} />
              <Text>{ Config.robot.name }</Text>
            </ListItem>
            <ListItem button onPress={this.onFastMail.bind(this)}>
              <Thumbnail source={require('./img/fastmail-icon.png')} />
              <Text>快递查询</Text>
            </ListItem>
            <ListItem button onPress={this.onLibrary.bind(this)}>
              <Thumbnail source={require('./img/book-icon.jpg')} />
              <Text>图书馆书籍查询</Text>
            </ListItem>
          </List>
        </Content>
      </View>
    );
  }
}