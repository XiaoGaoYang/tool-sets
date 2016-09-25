import React, { Component } from 'react';
import { StyleSheet,Alert,Text,View,Navigator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavigationBar from './NavigationBar';
import NavGroup from './component/NavGroup';
import NavButton from './component/NavButton';
import NavButtonText from './component/NavButtonText';
import NavTitle from './component/NavTitle';

export default class NavBar extends Component {
  constructor(props){
    super(props);

    // this.onPressSetting = this.onPressSetting.bind(this);
  }

  /*
  onPressSetting(){
    const navigator = this.props.navigator;
    if(navigator){
      navigator.push({
        name: 'Setting',
        component: Setting
      });
    }
  }
  */

  renderIcon(){
    if(this.props.leftText){
      return <Icon name="chevron-left" style={[styles.iconText,this.props.iconTextStyle]} />
    }
  }

  render() {
    return (
      <NavigationBar style={styles.navBar} statusBarStyle={styles.statusBar}>

        <NavButton onPress={this.props.onLeftPress}>
          <NavButtonText style={styles.buttonText}>
            { this.renderIcon() }
            { this.props.leftText }
          </NavButtonText>
        </NavButton>

        <NavTitle style={styles.title}>{this.props.title}</NavTitle>

        <NavButton onPress={this.props.onRightPress}>
          <NavButtonText style={styles.buttonText}>
            {this.props.rightText}
          </NavButtonText>
        </NavButton>

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
});