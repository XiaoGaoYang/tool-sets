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
import FastMail from './FastMail/FastMail';

import Config from './Config';

export default class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('Main did mount');
  }

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

  render(){
    return(
      <Container>
        <Content>
          <NavBar title={"功能选择"} />
          <List>
            <ListItem button onPress={this.onChat.bind(this)}>
              <Thumbnail source={require('./img/avatar.png')} />
              <Text>{ Config.robot.name }</Text>
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