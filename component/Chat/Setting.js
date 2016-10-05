import React, { Component } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { Container, Content, Button,Header,Title,Icon } from 'native-base';
import Theme from '../NativeBaseTheme';

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
      <Container style={styles.container}>
        <Header theme={Theme}>
          <Button transparent onPress={this.onReturn}>
            <Icon name="arrow-left" style={{fontSize:21}} />
          </Button>
          <Title>设置</Title>
        </Header>
        <Content>
          <Button block danger
            style={[styles.button,styles.buttonMarginTop]}
            onPress={this.props.onClean}>
            删除对话记录
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#ffffff'
  },
  buttonMarginTop: {
    marginTop:10,
  },
  button: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 8,
    marginRight: 8
  }
});