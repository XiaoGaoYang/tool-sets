/* @flow */
import React, { Component,PropTypes } from 'react';
import { Text } from 'react-native';
import styles from '../styles';

export default class NavButtonText extends Component {
  constructor(props){
    super(props);
  }
  renderChildren(){
    return this.props.children;
  }
  render(){
    return(
      <Text style={[styles.navBarButtonText,this.props.style]}>
        { this.renderChildren() }
      </Text>
    );
  }
}


/*
function NavButtonText({ style, children }: Object): React.Element {
  return (
    <Text style={[styles.navBarButtonText, style]}>
      {children}
    </Text>
  )
}

NavButtonText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node,
}

NavButtonText.defaultProps = {
  style: {},
}

export default { NavButtonText }
*/
