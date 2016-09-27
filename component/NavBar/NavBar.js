import React, { Component } from 'react';
import { StyleSheet,Alert,Text,View,Navigator,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationBar from './NavigationBar';
import NavGroup from './component/NavGroup';
import NavButton from './component/NavButton';
import NavButtonText from './component/NavButtonText';
import NavTitle from './component/NavTitle';

import {
  Container,
  Header,
  Title,
  Button
} from 'native-base';

export default class NavBar extends Component {
  constructor(props){
    super(props);
  }

  renderLeft(){
    if(!this.props.leftText){
      return;
    }
    return (
      <NavButton onPress={this.props.onLeftPress}>
        <NavButtonText style={styles.buttonText}>
          <Icon name="chevron-left" style={styles.iconText} />
          { this.props.leftText }
        </NavButtonText>
      </NavButton>
    );
  }

  renderTitle(){
    if(!this.props.title){
      return;
    }
    let titleStyle = [styles.title];
    if(this.props.leftText && !this.props.rightText){
      titleStyle.push(styles.marginLeft);
    }
    return <NavTitle style={titleStyle}>{this.props.title}</NavTitle>;
  }

  renderRight(){
    if(!this.props.rightText){
      return;
    }
    return (
      <NavButton onPress={this.props.onRightPress}>
        <NavButtonText style={styles.buttonText}>
          {this.props.rightText}
        </NavButtonText>
      </NavButton>
    );
  }

  render() {
    let navBarStyle = [styles.navBar];
    if(!this.props.rightText){
      // 只有中间
      if(!this.props.leftText){
        navBarStyle.push(styles.makeCenter);
      // 有左边和中间
      }else{
        navBarStyle.push(styles.makeStart);
      }
    }
    return (
      <NavigationBar style={navBarStyle} statusBarStyle={styles.statusBar}>
        { this.renderLeft() }
        { this.renderTitle() }
        { this.renderRight() }
      </NavigationBar>
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
  iconText: {
    fontSize: 17,
    color: '#rgba(0, 0, 0, 0.45)',
  },
  makeCenter: {
    justifyContent: 'center'
  },
  makeStart: {
    justifyContent: 'flex-start',
  },
  marginLeft: {
    marginLeft: 20
  }
});