import React, { Component } from 'react';
import { StyleSheet,Alert,Text } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';

import Settting from './Setting';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomNavBar extends Component {
  constructor(props){
    super(props);

    this.onPressSetting = this.onPressSetting.bind(this);
  }

  onPressSetting(){
    Alert.alert('提示','此功能正在实现中...',[{text:'确定'}]);
    /*console.log('点击设置按钮');
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name:'test',
        component:test,
        // params:{

        // }
      });
    }else{
      console.log('错误，this.props需要有navigator属性');
    }*/
  }

  render() {
    return (
      <NavBar style={styles}>

        <NavButton onPress={this.onPressSetting} style={styles.navButtonLeft}>
          <NavButtonText style={styles.buttonText}>
            <Icon name="chevron-left" style={[styles.iconText,this.props.iconTextStyle]} />
            <Text>{"返回"}</Text>
          </NavButtonText>
        </NavButton>

        <NavTitle style={styles.title}>
          {"语音机器人"}
        </NavTitle>

        <NavButton onPress={this.onPressSetting}>
          <NavButtonText
            style={styles.buttonText}>
            {"设置"}
          </NavButtonText>
        </NavButton>

      </NavBar>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#68efad',
  },
  navBar: {
    backgroundColor: '#68efad',
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
  iconText: {
    fontSize: 17,
    color: '#rgba(0, 0, 0, 0.45)',
  },
});