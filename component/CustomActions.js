import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { BaiduVoise,SpeechRecognizer } from 'react-native-voise';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this.onActionsPress = this.onActionsPress.bind(this);

    this.state = {
      result:''
    };
  }

  // Action按钮点击
  onActionsPress() {
    const options = ['Choose From Library', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.setModalVisible(true);
          break;
        case 1:
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.props.onSend({
                location: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
          break;
        default:
      }
    });
  }

  // 处理百度语音返回的消息
  onReceive(results){
    let result = results[0].trim();
    this.setState((state)=>{
      state.result = result;
    });
    this.props.onSend({text: result, false});
  }

  // 渲染microphone图标
  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View style={[styles.wrapper,this.props.wrapperStyle]}>
        <BaiduVoise
          ref={'BaiduVoise'}
          api_key={'gocTy0VMdYshLnMayM2Unsd8'} 
          secret_key={'211c92cded34df67bc67da288b8e9deb'}
          onReceive={this.onReceive.bind(this)}>
          <Icon name="microphone" style={[styles.iconText,this.props.iconTextStyle]} />
        </BaiduVoise>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}>
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    fontSize: 18,
    height:22,
    color: '#b2b2b2',
    backgroundColor: 'transparent',
    textAlign: 'center',
    textAlignVertical:'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: React.PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: React.PropTypes.func,
  options: React.PropTypes.object,
  icon: React.PropTypes.func,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  iconTextStyle: Text.propTypes.style,
};