import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  BackAndroid,
  ToastAndroid,
} from 'react-native';
import App from './app/app';

export default class BookManagement extends Component {
  componentDidMount() {
    var count = 1;
    BackAndroid.addEventListener('hardwareBackPress', function () {
      count--;
      if (count >= 0) {
        ToastAndroid.show('再按一次返回键退出应用！', ToastAndroid.SHORT);
        return true;
      } else {
        return false;
      }
    });
  }
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('BookManagement', () => BookManagement);
