import React, { Component,PropTypes } from 'react';
import { View, Platform,Text,StatusBar } from 'react-native';

import StatusBarEnhanced from './component/StatusBarEnhanced';
import styles from './styles';

export default class NavigationBar extends Component {
  // 构造函数
  constructor(props){
    super(props);
  }

  // 渲染子节点
  renderChildren(){
    return this.props.children;
  }

  // 渲染当前组件
  render(){
    return (
      <View style={styles.navBarContainer}>
        <StatusBarEnhanced style={this.props.statusBarStyle} />
        <View style={[styles.navBar, styles.navBarAndroid,this.props.style]}>
          { this.renderChildren() }
        </View>
      </View>
    );
  }
}




/*
function NavigationBar({ style, children, statusBar }: Object): React.Element {
  let navBar = null
  if (Platform.OS === 'ios') {
    navBar = (
      <View style={[styles.navBar, styles.navBarIOS, style.navBar]}>
        {children}
      </View>
    )
  } else if (Platform.OS === 'android') {
    navBar = (
      <View style={[styles.navBar, styles.navBarAndroid, style.navBar]}>
        {children}
      </View>
    )
  }

  return (
    /*
    <View style={[styles.navBarContainer, style.navBarContainer]}>
      <StatusBarEnhanced style={style.statusBar}
        statusBar={statusBar}
      />
      {navBar}
    </View>
  )
}
*/

/*NavigationBar.propTypes = {
  statusBar: PropTypes.object,
  style: PropTypes.object,
  children: PropTypes.node,
}

NavigationBar.defaultProps = {
  style: {},
  statusBar: {},
}*/

// export default NavigationBar