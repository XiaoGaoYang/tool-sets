import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Test extends Component {
  constructor(props){
    super(props);

    console.log(this.props.testProp);

    this.state = {
      hhh: this.props.testProp
    };

  }

  onTestPress() {
    console.log(this.props.testProp)
  }

  render(){
    return (
      <View>
        <Text>这是子组件</Text>
        <Text>{this.props.testProp}</Text>
        <TouchableOpacity onPress={this.onTestPress.bind(this)}>
          <Text>子组件点击按钮</Text>
        </TouchableOpacity>
      </View>
    );
  }
} 