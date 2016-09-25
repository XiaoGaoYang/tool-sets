/* @flow */
import React, { Component,PropTypes } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import styles from '../styles';

export default class NavButton extends Component {
  constructor(props){
    super(props);
    this.navButtonStyles = [styles.navBarButtonAndroid,this.props.style]
  }
  renderChildren(){
    return this.props.children;
  }
  render(){
    return(
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={this.navButtonStyles}>
          { this.renderChildren() }
        </View>
      </TouchableOpacity>   
    );
  }
}

/*
function NavButton({ style, onPress, children, disabled, disabledStyle }: Object): React.Element {
  let navButtonStyles = []
  if (Platform.OS === 'ios') {
    navButtonStyles = [styles.navBarButtonIOS]
  } else if (Platform.OS === 'android') {
    navButtonStyles = [styles.navBarButtonAndroid]
  }
  if (disabled) {
    navButtonStyles.push(disabledStyle)
  } else {
    navButtonStyles.push(style)
  }

  const getTouchable = (): React.Element => {
    if (disabled) {
      return (
        <TouchableOpacity>
          <View style={navButtonStyles}>
            {children}
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={navButtonStyles}>
          {children}
        </View>
      </TouchableOpacity>
    )
  }

  return getTouchable()
}

NavButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: View.propTypes.style,
  disabled: PropTypes.bool,
  disabledStyle: View.propTypes.style,
}

NavButton.defaultProps = {
  style: {},
  disabledStyle: {},
  disabled: false,
}

export default { NavButton }
*/