import React, { Component } from 'react';
import { StyleSheet,View,Text } from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Setting extends Component {
  constructor(props){
    super(props);
    this.onReturn = this.onReturn.bind(this);
  }

  // 返回上一个场景
  onReturn(){
    const navigator = this.props.navigator;
    if(navigator){
      navigator.pop();
    }else{
      console.warn('错误，this.props需要一个navigator属性');
    }
  }

  render() {
    return (
      <View>
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

        <View style={styles.text}>
          <Text>Text</Text>
        </View>
        
      </View>
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
  text: {
    height: 600,
    backgroundColor: 'blue',
  }
});