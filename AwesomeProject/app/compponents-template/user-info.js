import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ListView,
  AsyncStorage
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux';
import FormButton from './../components-cell/form-button'
import { accountLogin, editUserName, editPassword,clearPermission } from '../actions/account.action';
import Styles from './style/user-info'
import FormCustomButton from './../components-cell/form-custom-botton'

@connect((store) => {
  return {
    permission: store.accountReducer.permission
  }
})

export default class UserDeatil extends Component {
  _logout = () => {
    this.props.dispatch(clearPermission());
    this.props.dispatch(editUserName(''));
    this.props.dispatch(editPassword(''));
  }
  render() {
    return (
      <ScrollView contentContainerStyle={Styles.contentContainer}>
        <FormCustomButton
          activeOpacity={.5}
          text='退出'
          styleView={Styles.button}
          styleText={Styles.buttonText}
          onPress={this._logout} />
      </ScrollView>
    );
  }
}




