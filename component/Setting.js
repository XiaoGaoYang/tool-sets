import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';

import Chat from './Chat';

export default class test extends Component {
  constructor(props){
    super(props);
    this.onReturn = this.onReturn.bind(this);
    console.log(this.props);
  }

  onReturn(){
    console.log('点击返回按钮');
    const { navigator } = this.props;
    if(navigator){
      navigator.pop();
    }else{
      console.log('错误，this.props需要一个navigator属性');
    }
  }

  render() {
    return (
      <NavBar style={styles}>

        <NavButton style={styles.navButtonLeft} onPress={this.onReturn}>
          <NavButtonText style={styles.buttonText}>
            {"返回"}
          </NavButtonText>
        </NavButton>

        <NavTitle style={styles.title}>
          {"语音机器人"}
        </NavTitle>

        <NavButton>
          <NavButtonText style={styles.buttonText}>
            {"设置"}
          </NavButtonText>
        </NavButton>

      </NavBar>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'red',
  },
  navBar: {
    backgroundColor: 'red',
  },
  title: {
    color: '#rgba(0, 0, 0, 0.65)',
  },
  buttonText: {
    color: '#rgba(0, 0, 0, 0.45)',
  },
  navButtonLeft: {
    marginLeft:0,
  },
});