/* @flow */
import React, { Component,PropTypes } from 'react'
import { View } from 'react-native';
import styles from '../styles';

export default class NavGroup extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={styles.navGroup,this.props.style}>
        { this.props.children }
      </View>
    );
  }
}

NavGroup.propTypes = {
  style: View.propTypes.style,
  children: PropTypes.node,
}

NavGroup.defaultProps = {
  style: {},
}


/*
function NavGroup({ style, children }: Object): React.Element {
  return (
    <View style={[styles.navGroup, style]}>
      {children}
    </View>
  )
}
export default { NavGroup }
*/
