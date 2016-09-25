import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Navigator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, List, ListItem, Text, Thumbnail } from 'native-base';

import NavBar from './NavBar/NavBar';
import Chat from './Chat/Chat';

export default class Main extends Component {
  constructor(props){
    super(props);
  }

  onNavLeftButtonPress(){
    alert('left');
  }

  onNavRightButtonPress(){
    alert('right');
  }

  componentWillMount(){
    console.log('main will mount');
  }

  onChat(){
    const navigator = this.props.navigator;
    if(navigator){
      const routes = navigator.getCurrentRoutes();
      navigator.jumpTo(routes[1]);
    }
  }

  // 快递查询
  onFastMail(){
    // const navigator = this.props.navigator;
    // if(navigator){
    //   navigator.push({
    //     name: 'Chat',
    //     component: Chat
    //   });
    // }
    alert('ss');
  }

  render(){
    return(
      <Container>
        <Content>
          <NavBar
            // leftText={"返回"}
            title={"功能选择"}
            // rightText={"设置"}
            // onLeftPress={ this.onNavLeftButtonPress.bind(this) }
            // onRightPress={ this.onNavRightButtonPress.bind(this) }
          />
          <List>
            <ListItem button onPress={this.onChat.bind(this)}>
              <Thumbnail source={require('./img/avatar.png')} />
              <Text>语音机器人</Text>
            </ListItem>
            <ListItem button onPress={this.onFastMail.bind(this)}>
              <Thumbnail source={require('./img/user_avatar.png')} />
              <Text>快递查询</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}