/* @flow */
import React, { Component,PropTypes } from 'react';
import { Text } from 'react-native';
import styles from '../styles';

export default class NavTitle extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Text style={[styles.navBarTitleText,this.props.style]}>
        { this.props.children }
      </Text>
    );
  }
}

/*
function NavTitle({ style, children }: Object): React.Element {
  return (
    <Text style={[styles.navBarTitleText, style]}>
      {children}
    </Text>
  )
}

NavTitle.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node,
}

NavTitle.defaultProps = {
  style: {},
}

export default { NavTitle }
*/