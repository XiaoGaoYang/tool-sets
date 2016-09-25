import {
  StyleSheet,
  Platform
} from 'react-native'

import { StatusBar } from 'react-native';

const ANDROID_NAV_BAR_HEIGHT = 50;
let ANDROID_STATUS_BAR_HEIGHT = StatusBar.currentHeight;
if (Platform.Version < 21) {
  ANDROID_STATUS_BAR_HEIGHT = 0
}

export default StyleSheet.create({
  navBarContainer: {},
  statusBarAndroid: {
    height: ANDROID_STATUS_BAR_HEIGHT,
    backgroundColor: '#f5f5f5',
  },
  navBar: {
    borderTopWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBarAndroid: {
    backgroundColor: '#f5f5f5',
    height: ANDROID_NAV_BAR_HEIGHT,
    padding: 12,
  },
  navBarButtonAndroid: {
    // marginLeft: 16,
  },
  navBarButtonText: {
    fontSize: 17,
    letterSpacing: 0.5,
    color: '#939393',
  },
  navBarTitleText: {
    fontSize: 17,
    letterSpacing: 0.5,
    color: '#626262',
    fontWeight: '500',
    textAlign: 'center',
  },
  navGroup: {
    flexDirection: 'row',
  },
})
