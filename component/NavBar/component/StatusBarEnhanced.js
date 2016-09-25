import React, { Component,PropTypes } from 'react';
import { Platform, View, StatusBar } from 'react-native';
import styles from '../styles';

export default class StatusBarEnhanced extends Component {
  constructor(props){
    super(props);

    this.statusBarConfig = {
      animated: true,
      hidden: false,
      showHideTransition: 'fade',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      translucent: true,
    };

  }
  render(){
    return(
      <View style={[styles.statusBarAndroid,this.props.style]}>
        <StatusBar {...this.statusBarConfig} />
      </View>
    );
  }
}

/*
function StatusBarEnhanced({ statusBar, style }: Object): React.Element {
  let statusBarConfig = {}
  if (Platform.OS === 'ios') {
    statusBarConfig = {
      animated: true,
      hidden: false,
      barStyle: 'default',
      networkActivityIndicatorVisible: false,
      showHideTransition: 'fade',
    }
  } else if (Platform.OS === 'android') {
    statusBarConfig = {
      animated: true,
      hidden: false,
      showHideTransition: 'fade',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      translucent: true,
    }
  }
  const config = Object.assign({}, statusBarConfig, statusBar)

  let statusBarStyles = []
  if (Platform.OS === 'ios') {
    statusBarStyles = [
      styles.statusBarIOS,
      style,
    ]
  } else if (Platform.OS === 'android') {
    statusBarStyles = [
      styles.statusBarAndroid,
      style,
    ]
  }

  return (
    <View style={statusBarStyles}>
      <StatusBar {...config} />
    </View>
  )
}

StatusBarEnhanced.propTypes = {
  statusBar: PropTypes.object,
  style: View.propTypes.style,
}

StatusBarEnhanced.defaultProps = {
  style: {},
  statusBar: {},
}

export default { StatusBarEnhanced }
*/